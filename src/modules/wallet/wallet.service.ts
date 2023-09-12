import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { createWalletEther, createWalletBitcoin } from 'src/utils/wallet';


@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private walletRep: Repository<Wallet>
    ) { }
    public async findAll() {
        const users = await this.walletRep.find()
        return users
    }
    public async findUser(params: CreateWalletDto) {
        const { userId, merchant } = params;
        const users = await this.walletRep.find({
            where: {
                userId: userId,
                merchant: merchant
            }
        })
        return users
    }
    public async createWallet(params: CreateWalletDto) {
        const { userId, merchant } = params;
        const users = await this.walletRep.find({
            where: {
                userId: userId,
                merchant: merchant
            }
        })
        if (!users || users.length == 0) {
            const walletEther = createWalletEther();
            const bitcoinWallet = createWalletBitcoin()
            const userWallet = {
                userId: userId,
                merchant: merchant,
                key: {
                    bitcoin: {
                        networkId: 1,
                        networkName: "Bitcoin",
                        address: bitcoinWallet.address.toLowerCase(),
                        publicKey: bitcoinWallet.publicKey,
                        privateKey: bitcoinWallet.privateKey,
                        mnemonic: bitcoinWallet.mnemonic
                    },
                    evm: {
                        networkId: 2,
                        networkName: "EVM",
                        address: walletEther.address.toLowerCase(),
                        publicKey: walletEther.publicKey,
                        privateKey: walletEther.privateKey,
                        mnemonic: walletEther.mnemonic
                    }

                },
            }
            const saveUser = this.walletRep.create(userWallet)
            await this.walletRep.save(saveUser)
            // console.log('userWallet:', userWallet)

            return {
                addressBitcoin: bitcoinWallet.address.toLowerCase(),
                addressEther: walletEther.address.toLowerCase()
            }
        }
        else {
            console.log("User has been created wallet!")
            return {
                message: "User has been created wallet!",
            }
        }

    }

}