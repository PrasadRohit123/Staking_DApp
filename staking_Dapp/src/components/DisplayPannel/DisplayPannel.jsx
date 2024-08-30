import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";
import EarnedReward from "./EarnedReward";

const  DisplayPannel=()=> {
  return (
    <div>
      <StakedAmount/>
      <EarnedReward/>
      <RewardRate/>
    </div>
  )
}

export default DisplayPannel;
