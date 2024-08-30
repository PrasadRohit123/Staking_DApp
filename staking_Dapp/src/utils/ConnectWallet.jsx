import {Contract, ethers} from "ethers";

import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";


export const connectWallet = async() =>{
    try{
      let [signer,provider,stakingContract,stakeTokenContract,chainId] = [null];

      if(window.ethereum==null){
        throw new Error("Metamask is not installed");
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      let chainIdHex = await window.ethereum.request({
        method: 'eth_chainId'
      })
      chainId = parseInt(chainIdHex,16)

      let selectedAccount =  accounts[0];
      if(!selectedAccount){
        throw new Error("No ethereum accounts available")
      }

      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();

      const stakingContractAddress = "0xfa363960465abc4df2ba318df21fd3778443ae3c";
      const stakeTokenContractAddress = "0x2da3146adec5f49cbe92380d6ed14b1312d08639";

      stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
      stakeTokenContract = new Contract(stakeTokenContractAddress,stakeTokenAbi,signer );

      return {provider,selectedAccount, stakeTokenContract,stakingContract,chainId }

    }catch(error){
        console.error(error);
        throw error
    }
}