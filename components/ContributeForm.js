import React, { Component } from "react";
import { Form, FormField, Input, Message, Button } from "semantic-ui-react";

class ContributeForm extends Component {
  render() {
    return (
      <Form>
        <FormField>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder="Amount In Ether!"
          />
        </FormField>
        <Button primary>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;
