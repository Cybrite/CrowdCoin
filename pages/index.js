import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import instance from "../ethereum/factory";
import { CardGroup, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await instance.methods.getDeployed().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <Link route={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true,
      };
    });

    return <CardGroup items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
            <Button
              floated="right"
              icon="add circle"
              labelPosition="left"
              primary={true}
              content="Create Campaign"
            />
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
