import React, { Component } from "react";
import instance from "../ethereum/factory";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await instance.methods.getDeployed().call();

    return { campaigns };
  }

  render() {
    return <h3>{this.props.campaigns[0]}</h3>;
  }
}

export default CampaignIndex;
