import React, { Component } from "react";
import {
  Button,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
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

    console.log(requests);

    return { address, requests, requestCount };
  }
  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary content="Add Request" />
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Recipient</TableHeaderCell>
              <TableHeaderCell>Approval Count</TableHeaderCell>
              <TableHeaderCell>Aprrove</TableHeaderCell>
              <TableHeaderCell>Finalize</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;
