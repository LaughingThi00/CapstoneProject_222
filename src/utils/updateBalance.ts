import axios from "axios";
import { URL } from "../constants/urlAPI";
export async function updateBalance({
    userId,
    merchant,
    transactionHash,
    asset,
    type,
    amount }: {
        userId: string,
        merchant: string,
        transactionHash: string,
        asset: string,
        type: string,
        amount: number
    }) {
    console.log("call updateBalance")
    const assetRes = await axios.put(`${URL.apiBackEndUrl}/user`,
        {
            id: userId,
            merchant: merchant,
            transactionHash: transactionHash,
            transaction_type: "OnChain",
            token: asset,
            type,
            amount
        });
}