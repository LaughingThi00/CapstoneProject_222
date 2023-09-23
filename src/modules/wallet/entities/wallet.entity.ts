import { AbstractEntity } from "src/common/entities/abstract-entity";
import { BeforeInsert, Column, Entity } from "typeorm";

// interface keyWallet {
//     evm: {
//         networkId: number,
//         networkName: string,
//         address: string,
//         publicKey: string,
//         privateKey: string,
//         mnemonic: string,
//     },
//     bitcoin: {
//         networkId: number,
//         networkName: string,
//         address: string,
//         publicKey: string,
//         privateKey: string,
//         mnemonic: string,
//     }
// }
@Entity('wallets')
export class Wallet extends AbstractEntity {
    @Column({ default: '' })
    userId: string

    @Column({ default: '' })
    merchant: string

    @Column({ default: '' })
    address: string

    @Column({ default: 0 })
    userIndex: number
}