import React, { Component } from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/" className="item">
          CrowdCoin
        </Link>

        <MenuMenu position="right">
          <Link route="/" className="item">
            Campaigns
          </Link>

          <Link route="/campaigns/new" className="item">
            <b>+</b>
          </Link>
        </MenuMenu>
      </Menu>
    );
  }
}
