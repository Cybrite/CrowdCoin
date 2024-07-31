import React, { Component } from "react";
import { TableCell, TableRow, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import aboutcampaign from "../ethereum/Campaign";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = aboutcampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalize = async () => {
    const campaign = aboutcampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  render() {
    // const readyToFinalize =
    //   this.props.request.approvalCount > (this.props.approversCount / 2);

    return (
      <TableRow
        disabled={this.props.request.complete}
        positive={!this.props.request.complete}
      >
        <TableCell>{this.props.id + 1}</TableCell>
        <TableCell>{this.props.request.description}</TableCell>
        <TableCell>
          {String(web3.utils.fromWei(this.props.request.value, "ether"))}
        </TableCell>
        <TableCell>{this.props.request.recipient}</TableCell>
        <TableCell>
          {String(this.props.request.approvalCount)}/
          {String(this.props.approversCount)}
        </TableCell>
        <TableCell>
          {this.props.request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </TableCell>
        <TableCell>
          {this.props.request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default RequestRow;
