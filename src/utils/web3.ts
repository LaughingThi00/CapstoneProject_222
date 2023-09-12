import web3 from 'web3';
import { RPC } from "src/constants/rpc";
import { WS } from "src/constants/wsProvider";
export class Web3 {
    static httpProvider(chainId: number) {
        return new web3(new web3.providers.HttpProvider(RPC[chainId]));
    }

    static wsProvider(chainId: number) {
        const options = {
            timeout: 30000,
            clientConfig: {
                // Useful to keep a connection alive
                keepalive: true,
                keepaliveInterval: 60000, // ms
            },

            // Enable auto reconnection
            reconnect: {
                auto: true,
                delay: 5000, // ms
                maxAttempts: 5,
                onTimeout: false,
            },
        };

        return new web3(
            new web3.providers.WebsocketProvider(
                WS[chainId],
                options
            )
        );
    }

    static async getTransactionReceipt(txHash: string, chainId: number) {
        const web3 = Web3.httpProvider(chainId);

        try {
            return await web3.eth.getTransactionReceipt(txHash);
        } catch (error) {
            console.log('Error getTransactionReceipt:', error);
            return null;
        }
    }

    static async getTransaction(txHash: string, chainId: number) {
        try {
            const web3 = Web3.httpProvider(chainId);
            return await web3.eth.getTransaction(txHash);
        } catch (error) {
            console.log('Error getTransaction:', error);
            return null;
        }
    }

    static async getBlock(blockNumber: number, chainId: number) {
        try {
            const web3 = Web3.httpProvider(chainId);
            return await web3.eth.getBlock(blockNumber);
        } catch (error) {
            console.log('Error getBlock:', error);
            return null;
        }
    }

    static fromWei(weiNumber: string) {
        return +web3.utils.fromWei(weiNumber);
    }
}
