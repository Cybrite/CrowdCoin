import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x71CdF48c60f9cc942b47F35d15B257fcb4DCcDcB"
);

export default instance;
