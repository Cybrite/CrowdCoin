import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Button, FormField, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form>
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
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
