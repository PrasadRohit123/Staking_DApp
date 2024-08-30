import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import StakingContext from "../../context/StakingContext";


const StakedAmount = ()=>{
    const {stakingContract, selectedAccount} = useContext(Web3Context);
    const {isReload} = useContext(StakingContext)
    const [StakedAmount, setStakeAmount]= useState("0");
    
    useEffect(()=>{
        const fetchStakedBalance = async() =>{
            try{
                 const amountStakedInWei = await stakingContract.stakedBalance(selectedAccount);
                 const amountStakedInEth = ethers.formatUnits(amountStakedInWei.toString(),18);
                 console.log("amountStaked->", typeof amountStakedInEth);
                 setStakeAmount(amountStakedInEth);
            }catch(error){
                console.error("Error fetching data:",error.message)
            }
        }
        stakingContract && fetchStakedBalance() // calling fetchStakedBalance when stakingContract instance is ready
    },[selectedAccount,stakingContract,isReload]);
    
return(
    <p>Staked Amount: {StakedAmount}</p>
)

}
export default StakedAmount;