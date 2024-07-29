import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Button, FormField, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import instance from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await instance.methods
        .createCampaign(Number(this.state.minimumContribution))
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
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
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
