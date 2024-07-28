import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
