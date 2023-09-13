import axios from "axios";
import { API_KEY_SCAN } from "src/constants/blockchain_scan";
import { BSC_API_KEY } from "src/constants/network";

interface FetchTransactionParams {
    chainId: number;
    address: string;
    startBlock: string;
    toBlock: string;
}
export class BlockchainScan {
    static async fetchNativeTransactions({
        chainId,
        address,
        startBlock,
        toBlock
    }: FetchTransactionParams) {
        const url = API_KEY_SCAN[chainId].url;
        try {
            const response = await axios.get(url, {
                params: {
                    module: 'account',
                    address,
                    apikey: BSC_API_KEY,
                    action: 'txlist',
                    sort: 'asc',
                    startblock: startBlock,
                    toBlock: toBlock,
                },
            });

            if (response.data.status == 1) {
                return response.data.result;
            } else {
                // console.log('Error fetchTransactions:', response.data)
                return [];
            }
        } catch (error) {
            console.log('Request error:', error);
            return [];
        }
    }

    static async fetTokenTransactions({
        chainId,
        address,
        startBlock,
        toBlock
    }) {
        const url = API_KEY_SCAN[chainId].url;
        try {
            const response = await axios.get(url, {
                params: {
                    module: 'account',
                    action: 'tokentx',
                    address,
                    apikey: API_KEY_SCAN[chainId].key,
                    sort: 'asc',
                    startblock: startBlock,
                    toBlock: toBlock,
                },
            });

            if (response.data.status == 1) {
                return response.data.result;
            } else {
                // console.log('Error fetchTransactions:', response.data)
                return [];
            }
        } catch (error) {
            console.log('Request error:', error);
            return [];
        }
    }
}