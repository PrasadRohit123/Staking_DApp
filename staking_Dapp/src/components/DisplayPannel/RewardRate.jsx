import { useContext, useEffect, useState } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";



function RewardRate() {
  const {stakingContract, selectedAccount} = useContext(Web3Context);
  const [RewardRate, setRewardRate]= useState("0");


  useEffect(()=>{
    const fetchRewardRate = async()=>{
      try{
           const RewardRateInWei = await stakingContract.REWARD_RATE();
           const RewardRateInEth = ethers.formatUnits(RewardRateInWei.toString(),18);
           console.log(RewardRateInEth)
           setRewardRate(RewardRateInEth)
      }catch(error){
        console.error("Error fetching data:", error.message)
      }
    }
    stakingContract && fetchRewardRate()

  },[stakingContract,selectedAccount ])

    




  return (
    <div>
       <p> Reward Rate: {RewardRate} token/second</p>
    </div>
  )
}

export default RewardRate;
