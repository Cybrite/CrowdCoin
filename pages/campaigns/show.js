import React, { Component } from "react";
import Layout from "../../components/Layout";
import aboutcampaign from "../../ethereum/Campaign";
import { CardGroup } from "semantic-ui-react";

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

  renderCards() {
    const { balance, manager, minimumContribution, requests, contributors } =
      this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager Created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <CardGroup items={items} />;
  }

  render() {
    return <Layout>{this.renderCards()}</Layout>;
  }
}

export default CampaignShow;
