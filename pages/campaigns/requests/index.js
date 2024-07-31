import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import aboutcampaign from "../../../ethereum/Campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = aboutcampaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    console.log(requests);

    return { address, requests, requestCount, approversCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button
            primary
            floated="right"
            content="Add Request"
            style={{ marginBottom: 8 }}
          />
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount (Ether)</TableHeaderCell>
              <TableHeaderCell>Recipient</TableHeaderCell>
              <TableHeaderCell>Approval Count</TableHeaderCell>
              <TableHeaderCell>Aprrove</TableHeaderCell>
              <TableHeaderCell>Finalize</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>{this.renderRow()}</TableBody>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
