import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const Authmiddleware = ({ path, component: Component, layout: Layout }) => (
  <Route
    path={path}
    render={(props) => {
      // here you can apply condition
      if (!localStorage.getItem("accessToken")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default withRouter(Authmiddleware);
