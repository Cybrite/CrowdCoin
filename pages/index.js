import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import instance from "../ethereum/factory";
import { CardGroup } from "semantic-ui-react";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await instance.methods.getDeployed().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <CardGroup items={items} />;
  }

  render() {
    return <div>{this.renderCampaigns()}</div>;
  }
}

export default CampaignIndex;
