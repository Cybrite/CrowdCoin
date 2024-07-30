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
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form>
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
            />
          </FormField>
          <FormField>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </FormField>

          <Button primary content="Create!" />
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
