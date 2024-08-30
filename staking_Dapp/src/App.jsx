
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Wallet from './components/wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import DisplayPannel from './components/DisplayPannel/DisplayPannel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/Withdraw';
import { StakingProvider } from './context/StakingContext'


function App() {
  

  return (
    <>
      <Wallet>
        <Navigation/>
        <StakingProvider>
        <DisplayPannel/>
        <StakeAmount/>
        <WithdrawStakeAmount/>
        </StakingProvider>
        <TokenApproval/>
      </Wallet>
    </>
  )
}

export default App
