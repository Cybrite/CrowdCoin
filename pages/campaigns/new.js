import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Form,
  Button,
  FormField,
  Input,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import instance from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      await instance.methods
        .createCampaign(Number(this.state.minimumContribution))
        .send({
          from: accounts[0],
        });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit}>
          <FormField>
            <label>Minimum Contribution</label>
            <Input
              label="Wei"
              placeholder="Amount In Wei!"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </FormField>
          {this.state.errorMessage ? (
            <Message
              negative
              header="Oops!"
              content={this.state.errorMessage}
            />
          ) : null}
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
