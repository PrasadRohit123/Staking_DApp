import {useContext} from 'react'
import Web3Context from '../../context/Web3Context'


function ConnectedNetwork() {
  const {chainId} = useContext(Web3Context)
  console.log("chainId ->",chainId);
  if(chainId===11155111){
    return (
      <p>Conneted Network: Sepolia</p>
     )
  }else{
    return (
      <p>Conneted Network: Unsupported</p>
     )
  }
  
}

export default ConnectedNetwork


// import {useContext} from 'react'
// import Web3Context from '../../context/Web3Context'


// const ConnectedAccount= ()=> {
//   const {selectedAccount} = useContext(Web3Context);
//   console.log(selectedAccount)

//   return(
//     <p>Connected Account:{selectedAccount}</p>
//   )
// }

// export default ConnectedAccount
