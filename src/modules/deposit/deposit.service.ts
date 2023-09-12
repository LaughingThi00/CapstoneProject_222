import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { BlockchainScan } from "src/utils/blockchainscan";
import { Repository } from "typeorm";
import { ConfigurationsService } from "../configurations/configurations.service";
import { ConfigurationKeys } from "../configurations/entities/configuration.entity";
import { WalletService } from "../wallet/wallet.service";
import { Deposit } from "./entities/deposit.entity";

@Injectable()
export class DepositService {
    constructor(
        @InjectRepository(Deposit)
        private depositRep: Repository<Deposit>,
        private readonly walletService: WalletService,
        private readonly configurationService: ConfigurationsService
    ) { }

    // @Cron('10 * * * * *')
    public async fetchEventDeposit() {
        const listChainId = [97]
        const users = await this.walletService.findAll()
        const listUserAddress = users.map(item => item.key.evm.address)
        for (let i = 0; i < listUserAddress.length; i++) {
            for (let j = 0; j < listChainId.length; j++) {
                await this.fetchNativeDeposit({ chainId: listChainId[i], userAddress: listUserAddress[i] })
                await this.fetchTokenDeposit({ chainId: listChainId[i], userAddress: listUserAddress[i] })
            }
        }
    }
    public async fetchNativeDeposit({
        chainId,
        userAddress }: {
            chainId: number,
            userAddress: string
        }) {
        const lastBlock = await this.configurationService.getConfig({
            key: ConfigurationKeys.LastBlockFetchNativeDeposit,
            chainId,
            defaultValue: 0,
        });
        const transactions = await BlockchainScan.fetchNativeTransactions({
            chainId: chainId,
            address: userAddress,
            startBlock: lastBlock
        })
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
        }
    }
    public async fetchTokenDeposit({
        chainId,
        userAddress }: {
            chainId: number,
            userAddress: string
        }) {
        return
    }
}