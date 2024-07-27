import React, { Component } from "react";
import instance from "../ethereum/factory";

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaigns = await instance.methods.getDeployed().call();

    console.log(campaigns);
  }

  render() {
    return <h1>campaign index!</h1>;
  }
}

export default CampaignIndex;