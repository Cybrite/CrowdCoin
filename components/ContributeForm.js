import React, { Component } from "react";
import { Form, FormField, Input, Message, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import aboutcampaign from "../ethereum/Campaign";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    const campaign = await aboutcampaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.Contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormField>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder="Amount In Ether!"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </FormField>
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>

        {this.state.errorMessage ? (
          <Message error header="Oops!" content={this.state.errorMessage} />
        ) : null}
      </Form>
    );
  }
}

export default ContributeForm;
