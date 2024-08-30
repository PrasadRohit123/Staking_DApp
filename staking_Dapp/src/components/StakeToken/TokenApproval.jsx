import {useState, useContext, useRef} from "react";
import Button from "../Button/Button";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";


const TokenApproval =()=>{
   const {stakeTokenContract, stakingContract} = useContext(Web3Context)
   const approveTokenRef = useRef();
   const [transactionStatus, SetTransactionStatus] = useState("");


   const approveToken =async(e)=>{
        e.preventDefault();
        const amount = approveTokenRef.current.value.trim();
        if(isNaN(amount) || amount<=0){
           console.error("Please enter a positve number");
           return;
        }
        const amountToSend = ethers.parseUnits(amount, 18).toString();
        console.log("amountToSend:",amountToSend)
        
        try{
             const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend);
             console.log(transaction)
             SetTransactionStatus("Transaction is in pending...")
             const receipt = await transaction.wait();
             if(receipt.status==1){
               SetTransactionStatus("Transaction is successful");
               setTimeout (()=>{
                  SetTransactionStatus("")
               },5000);
               approveTokenRef.current.value="";

             }else{
               SetTransactionStatus("Transaction failed.");
             }

        }catch(error){
         console.error("Token Approval Failed", error.message);
        }
   }


    return(
       <div>
          {transactionStatus && <div>{transactionStatus}</div>}
          <form onSubmit={approveToken}>
            <label> Token Approval:</label>
            <input type = "text" ref = {approveTokenRef}></input>
            <Button onClick={approveToken}  type="submit" label="Token Approve"/>
           
          </form>
       </div>

    )
}
export default TokenApproval;