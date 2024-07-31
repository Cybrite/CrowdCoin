import React, { Component } from "react";
import { Form, Button, Message, FormField, Input } from "semantic-ui-react";
import aboutcampaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = aboutcampaign(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      this.setState({ loading: true, errorMessage: "" });
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          Back
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit}>
          <FormField>
            <label>description</label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </FormField>
          <FormField>
            <label>Amount</label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
              label="ether"
              labelPosition="right"
            />
          </FormField>
          <FormField>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </FormField>

          <Button primary content="Create!" loading={this.state.loading} />
          {this.state.errorMessage ? (
            <Message
              negative
              header="Oops!"
              content={this.state.errorMessage}
            />
          ) : null}
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
