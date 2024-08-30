import { useState, useRef, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";

import Button from "../Button/Button";


function WithdrawStakeAmount() {
    const {stakingContract} = useContext(Web3Context);
    const [TransStatus, setTransStatus]= useState("0");
    const WithdrawTokenRef = useRef();

    
    const WithdrawAmount = async(e)=>{
      e.preventDefault();
      const amount = WithdrawTokenRef.current.value.trim();
      if(isNaN(amount) || amount<=0){
        console.error("Please enter a positve number");
        return;
     }
     const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
     //console.log("amountToSend:",amountToStke)
     try{
      const WithdrawTransation = await stakingContract.withdraw(amountToWithdraw);
      console.log(WithdrawTransation);
      setTransStatus("Transaction is in pending...");
      const receipt = await WithdrawTransation.wait();
      if(receipt.status==1){
        setTransStatus("Transaction is successful");
        setTimeout(() => {
            setTransStatus("");
        }, 3000);
        WithdrawTokenRef.current.value="";
      }else{
        setTransStatus("Transaction failed.");
      }
      
     }catch(error){
      console.error("Token staking is failed", error.message);
     }
     

    }
  return (
    <div>
        <div>
          {TransStatus && <div>{TransStatus}</div>}
          <form onSubmit={WithdrawAmount}>
            <label> Withdraw Token:</label>
            <input type = "text" ref = {WithdrawTokenRef}></input>
            <Button onClick={WithdrawAmount}  type="submit" label="Withdraw the staked tokens"/>
           
          </form>
       </div>
    </div>
  )
}

export default WithdrawStakeAmount;
