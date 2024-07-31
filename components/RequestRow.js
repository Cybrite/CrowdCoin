import React, { Component } from "react";
import { TableCell, TableRow, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import aboutcampaign from "../ethereum/Campaign";

class RequestRow extends Component {
  state = {
    ApproveErrorMessage: "",
    Approvloading: false,
    FinalerrorMessage: "",
    Finalloading: false,
  };

  onApprove = async () => {
    const campaign = aboutcampaign(this.props.address);

    this.setState({ Approvloading: true });

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ ApproveErrorMessage: err.message });
    }

    this.setState({ Approvloading: false });
  };

  onFinalize = async () => {
    const campaign = aboutcampaign(this.props.address);

    this.setState({ Finalloading: true });

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ FinalerrorMessage: err.message });
    }

    this.setState({ Finalloading: false });
  };

  render() {
    // const readyToFinalize =
    //   Number(this.props.request.approvalCount) >
    //   Number(this.props.approversCount / 2);

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
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.Approvloading}
            >
              Approve
            </Button>
          )}
          {this.state.ApproveErrorMessage ? (
            <Message negative content={this.state.ApproveErrorMessage} />
          ) : null}
        </TableCell>
        <TableCell>
          {this.props.request.complete ? null : (
            <Button
              color="teal"
              basic
              onClick={this.onFinalize}
              loading={this.state.Finalloading}
            >
              Finalize
            </Button>
          )}
        </TableCell>
        {this.state.FinalerrorMessage ? (
          <Message negative content={this.state.FinalerrorMessage} />
        ) : null}
      </TableRow>
    );
  }
}

export default RequestRow;
