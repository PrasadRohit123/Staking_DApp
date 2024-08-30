import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";


function EarnedReward() {
    const {stakingContract, selectedAccount} = useContext(Web3Context);
    const [EarnedReward, setEarnedReward] = useState("0");

useEffect(()=>{
    const fetchEarnedReward = async()=>{
        try{
          const earnedRewardInWei = await stakingContract.earned(selectedAccount);
        //   const earnedRewardInEth = ethers.formatUnits(earnedRewardInWei.toString(), 18);
          
          const earnedRewardInEth = ethers.formatUnits(earnedRewardInWei.toString(),36);

          

          console.log("EarnedRewardInEth:",earnedRewardInEth)
          setEarnedReward(earnedRewardInEth);
        }catch(error){
            console.error("Error fetching data:",error.message)
            
        }
      }
      stakingContract && fetchEarnedReward();
},[stakingContract,selectedAccount]);

return(
    <p>Earned Rewards: {EarnedReward}</p>
)
  
}

export default EarnedReward
