import { Injectable } from "@nestjs/common";
import { Cron, Timeout } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { BlockchainScan } from "src/utils/blockchainscan";
import { Repository } from "typeorm";
import { ConfigurationsService } from "../configurations/configurations.service";
import { ConfigurationKeys } from "../configurations/entities/configuration.entity";
import { WalletService } from "../wallet/wallet.service";
import { Deposit } from "./entities/deposit.entity";
import { Web3 } from "src/utils/web3";
import { NATIVECOINS, TOKENS } from "src/constants/address";

@Injectable()
export class DepositService {
    constructor(
        @InjectRepository(Deposit)
        private depositRep: Repository<Deposit>,
        private readonly walletService: WalletService,
        private readonly configurationService: ConfigurationsService
    ) { }

    // Schedule every 1 minute at the 10th second
    @Cron('10 * * * * *')
    // @Timeout(0)
    public async fetchEventDeposit() {

        try {
            const listChainId = [97]
            const users = await this.walletService.findAll()
            const listUserAddress = users.map(item => item.key.evm.address)
            for (let i = 0; i < listChainId.length; i++) {
                // get lastBlock
                const lastBlock = await this.configurationService.getConfig({
                    key: ConfigurationKeys.LastBlockFetchNativeDeposit,
                    chainId: listChainId[i],
                    defaultValue: 0,
                });
                // console.log('lastBlock:', lastBlock)
                const currentBlockNumber = await Web3.getBlockNumber(listChainId[i])
                for (let j = 0; j < listUserAddress.length; j++) {
                    await this.fetchNativeDeposit({
                        chainId: listChainId[i],
                        userAddress: listUserAddress[j],
                        fromBlock: lastBlock,
                        toBlock: currentBlockNumber.toString()
                    })
                    await this.fetchTokenDeposit({
                        chainId: listChainId[i],
                        userAddress: listUserAddress[j],
                        fromBlock: lastBlock,
                        toBlock: currentBlockNumber.toString()
                    })
                }
                // Update lastBlock 
                this.configurationService.updateConfig({
                    key: ConfigurationKeys.LastBlockFetchNativeDeposit,
                    value: currentBlockNumber,
                    chainId: listChainId[i],
                });
            }

        }
        catch (error) {
            console.log('error:', error);
        }
    }
    public async fetchNativeDeposit({
        chainId,
        userAddress,
        fromBlock,
        toBlock }: {
            chainId: number,
            userAddress: string,
            fromBlock: string,
            toBlock: string
        }) {

        const transactions = await BlockchainScan.fetchNativeTransactions({
            chainId: chainId,
            address: userAddress,
            startBlock: fromBlock,
            toBlock: toBlock
        })
        // console.log('transactions:', transactions)
        if (!transactions || !transactions.length) {
            return;
        }
        for (let index = 0; index < transactions.length; index++) {
            const transaction = transactions[index];
            if (!transaction || transaction.to.toLowerCase() !== userAddress.toLowerCase()) continue;
            if (!transaction.methodId || transaction.methodId !== '0x') continue;
            const amount = transaction.value / 10 ** 18;
            const tx = await this.depositRep.findOne({
                where: {
                    transactionHash: transaction.hash
                }
            });
            if (tx) return;
            const userInfo = await this.walletService.findFromAdress(userAddress)
            console.log(`${userInfo.userId} has 1 transaction native deposit! `)
            await this.saveDB({
                userId: userInfo.userId,
                merchant: userInfo.merchant,
                chainId: chainId,
                transaction,
                userAddress
            })
        }
    }
    public async fetchTokenDeposit({
        chainId,
        userAddress,
        fromBlock,
        toBlock }: {
            chainId: number,
            userAddress: string,
            fromBlock: string,
            toBlock: string
        }) {
        const transactions = await BlockchainScan.fetTokenTransactions({
            chainId: chainId,
            address: userAddress,
            startBlock: fromBlock,
            toBlock: toBlock
        })
        // console.log('transactions:', transactions)
        if (!transactions || !transactions.length) {
            return;
        }
        for (let index = 0; index < transactions.length; index++) {
            const transaction = transactions[index];
            if (!transaction || transaction.to.toLowerCase() !== userAddress.toLowerCase()) continue;
            // convert object to array
            const listToken = Object.values(TOKENS)
            const tokenAddr = listToken.find(item => item[chainId].toLowerCase() === transaction.contractAddress.toLowerCase())
            if (!tokenAddr) continue;
            // if (!transaction.methodId || transaction.methodId !== '0x') continue;
            const amount = transaction.value / 10 ** 18;
            const tx = await this.depositRep.findOne({
                where: {
                    transactionHash: transaction.hash
                }
            });
            if (tx) return;
            const userInfo = await this.walletService.findFromAdress(userAddress)
            console.log(`${userInfo.userId} has 1 transaction token deposit! `)
            await this.saveDB({
                userId: userInfo.userId,
                merchant: userInfo.merchant,
                chainId: chainId,
                transaction,
                userAddress
            })
        }
    }

    public async findHistory({
        userId,
        merchant
    }: {
        userId: string,
        merchant: string
    }) {
        const transactions = await this.depositRep.find({
            where: {
                userId: userId,
                merchant: merchant
            }
        })
        return transactions
    }

    public async saveDB({
        userId,
        merchant,
        chainId,
        transaction,
        userAddress
    }: {
        userId: string,
        merchant: string,
        chainId: number,
        transaction: any,
        userAddress: string
    }) {
        const txDeposit = {
            userId,
            merchant,
            chainId: chainId,
            userAddress: userAddress.toLowerCase(),
            blockNumber: transaction.blockNumber,
            timeStamp: transaction.timeStamp,
            transactionHash: transaction.hash,
            symbol: transaction.tokenSymbol ? transaction.tokenSymbol : NATIVECOINS[chainId],
            amount: transaction.value / 10 ** 18,
            fromAddress: transaction.from,
            toAddress: transaction.to,
            tokenAddress: transaction.contractAddress,
            methodId: transaction.methodId,
            functionName: transaction.functionName,
        }
        const saveTx = this.depositRep.create(txDeposit)
        await this.depositRep.save(saveTx)
    }
}