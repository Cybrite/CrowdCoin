import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x6344F91C93c479dfda87c00072d58316c9B18d7C"
);

export default instance;
