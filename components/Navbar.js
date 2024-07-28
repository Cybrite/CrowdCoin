import React, { Component } from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";

export default class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <MenuItem
          name="browse"
          active={activeItem === "browse"}
          onClick={this.handleItemClick}
        >
          CrowdCoin
        </MenuItem>

        <MenuMenu position="right">
          <MenuItem
            name="browse"
            active={activeItem === "browse"}
            onClick={this.handleItemClick}
          >
            Campaigns
          </MenuItem>
          <MenuItem
            name="browse"
            active={activeItem === "browse"}
            onClick={this.handleItemClick}
          >
            <b>+</b>
          </MenuItem>
        </MenuMenu>
      </Menu>
    );
  }
}
