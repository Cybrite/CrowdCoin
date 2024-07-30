import React, { Component } from "react";
import Layout from "../../components/Layout";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    console.log(props.query.address);

    return { address: props.query.address };
  }

  render() {
    return (
      <Layout>
        <h2>Show</h2>
      </Layout>
    );
  }
}

export default CampaignShow;
