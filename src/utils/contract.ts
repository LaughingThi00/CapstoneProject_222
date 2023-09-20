import { AbiItem } from 'web3-utils';
import { Web3 } from './web3';
import ERC20 from '../constants/abis/ERC20.json';
import routerABI from '../constants/abis/routerContract.json';

interface GetContractParams {
  abi?: AbiItem[];
  address?: string;
  chainId: number;
}

export class Contract {
  public static getContract({ abi, chainId, address }: GetContractParams) {
    const web3 = Web3.httpProvider(chainId);

    const contract = new web3.eth.Contract(abi, address);

    return contract;
  }

  public static getTokenContract({ chainId, address }) {
    const contract = Contract.getContract({
      abi: ERC20 as AbiItem[],
      chainId,
      address,
    });

    return contract;
  }

  public static getRouterContract({ chainId, address }) {
    const contract = Contract.getContract({
      abi: routerABI as AbiItem[],
      chainId,
      address,
    });

    return contract;
  }
}
