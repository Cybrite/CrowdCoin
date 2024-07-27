import React, { Component } from "react";
import instance from "../ethereum/factory";

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaigns = await instance.methods.getDeployed().call();

    console.log(campaigns);
  }

  render() {
    return <div>campaign index!</div>;
  }
}

export default CampaignIndex;