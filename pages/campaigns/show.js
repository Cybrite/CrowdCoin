import React, { Component } from "react";
import Layout from "../../components/Layout";
import aboutcampaign from "../../ethereum/Campaign";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = aboutcampaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    console.log(summary);

    return {};
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
