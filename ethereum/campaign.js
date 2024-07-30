import web3 from "./web3";
import Campaign from "./build/Campaign.json";

function aboutcampaign(address) {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
}

export default aboutcampaign;
