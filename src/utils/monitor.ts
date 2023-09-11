const Web3 = require('./web3')

export class MonitorEth {
    public web3 = null;
    public lastSyncedBlock = null;
    constructor(chainId: number) {
        this.web3 = Web3.httpProvider(chainId)
        this.lastSyncedBlock = null;
    }

    async initializeLastSyncedBlock() {
        this.lastSyncedBlock = await this.getLastBlockNumber();
    }

    async setLastSyncedBlock(lastBlock: any) {
        this.lastSyncedBlock = lastBlock;
    }

    async getBlock(blockNumber: any) {
        return this.web3.eth.getBlock(blockNumber, true);
    }

    async getLastBlockNumber() {
        return this.web3.eth.getBlockNumber();
    }

    async searchTransaction(to: any) {
        // const lastBlock = await this.getLastBlockNumber();
        const lastBlock = 0;
        console.log(`Searching blocks: ${this.lastSyncedBlock + 1} - ${lastBlock}`);

        for (
            let blockNumber = this.lastSyncedBlock + 1;
            blockNumber < lastBlock;
            blockNumber++
        ) {
            const block = await this.getBlock(blockNumber);

            if (!block?.transactions) {
                continue;
            }
            for (const tx of block.transactions) {
                if (!tx?.to) {
                    continue;
                }
                if (tx.to.toLowerCase() === to.toLowerCase()) {
                    console.log(tx);
                }
            }
        }
        this.lastSyncedBlock = lastBlock;
        console.log(
            `Finished searching blocks: ${this.lastSyncedBlock + 1} - ${lastBlock}`
        );
    }
}