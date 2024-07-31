import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import aboutcampaign from "../../../ethereum/Campaign";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = aboutcampaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount };
  }
  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary content="Add Request" />
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
