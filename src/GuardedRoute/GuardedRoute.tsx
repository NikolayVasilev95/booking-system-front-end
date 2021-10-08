import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const GuardedRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("@token") ? (
          // <Dashboard />
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default GuardedRoute;
