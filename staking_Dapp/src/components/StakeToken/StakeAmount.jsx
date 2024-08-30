import { useState, useRef, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import TokenApproval from "./TokenApproval";
import Button from "../Button/Button";
import StakingContext from "../../context/StakingContext";

function StakeAmount() {
    const {stakingContract} = useContext(Web3Context);
    const {isRelaod,setIsReload} = useContext(StakingContext);
    const [stakeTransStatus, setStakeTransStatus]= useState("0");
    const stakeTokenRef = useRef();

    
    const staketokenAmount = async(e)=>{
      e.preventDefault();
      const amount = stakeTokenRef.current.value.trim();
      if(isNaN(amount) || amount<=0){
        console.error("Please enter a positve number");
        return;
     }
     const amountToStake = ethers.parseUnits(amount, 18).toString();
     //console.log("amountToSend:",amountToStke)
     try{
      const stakeTransation = await stakingContract.stake(amountToStake);
      console.log(stakeTransation);
      setStakeTransStatus("Transaction is in pending...");
      const receipt = await stakeTransation.wait();
      if(receipt.status==1){
        setStakeTransStatus("Transaction is successful");
        setIsReload(!isRelaod);
        setTimeout(() => {
          setStakeTransStatus("");
        }, 3000);
        stakeTokenRef.current.value="";
      }else{
        setStakeTransStatus("Transaction failed.");
      }
      
     }catch(error){
      console.error("Token staking is failed", error.message);
     }
     

    }

     

  return (
    <div>
        <div>
          {stakeTransStatus && <div>{stakeTransStatus}</div>}
          <form onSubmit={staketokenAmount}>
            <label> Stake Token:</label>
            <input type = "text" ref = {stakeTokenRef}></input>
            <Button onClick={staketokenAmount}  type="submit" label="Stake"/>
           
          </form>
       </div>
    </div>
  )
}

export default StakeAmount;
