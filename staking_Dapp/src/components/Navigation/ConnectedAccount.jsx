import {useContext} from 'react'
import Web3Context from '../../context/Web3Context'


const ConnectedAccount= ()=> {
  const {selectedAccount} = useContext(Web3Context);
  console.log(selectedAccount)
   if(!selectedAccount){
    return(
      <p>Connected Account: Please Connect your metamask</p>
    )
   }else{
    return(
      <p>Connected Account: {selectedAccount}</p>
    )
   }
  
}

export default ConnectedAccount
