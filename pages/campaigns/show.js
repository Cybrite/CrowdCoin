import React, { Component } from "react";
import Layout from "../../components/Layout";
import aboutcampaign from "../../ethereum/Campaign";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = aboutcampaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requests: summary[2],
      contributors: summary[3],
      manager: summary[4],
    };
  }

  render() {
    return (
      <Layout>
        <h2>Show</h2>
      </Layout>
    );
  }
}

export default CampaignShow;
