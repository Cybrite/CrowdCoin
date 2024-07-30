import React, { Component } from "react";
import Layout from "../../components/Layout";
import aboutcampaign from "../../ethereum/Campaign";
import { CardGroup } from "semantic-ui-react";
import web3 from "../../ethereum/web3";

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
      {
        header: String(minimumContribution),
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: String(requests),
        meta: "Number of Requests by manager",
        description:
          "A request by the manager to withdraw money from the campaign",
      },
      {
        header: String(contributors),
        meta: "Number of Contributors",
        description: "Number of people who have contributed to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ];

    return <CardGroup items={items} />;
  }

  render() {
    return <Layout>{this.renderCards()}</Layout>;
  }
}

export default CampaignShow;
