import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

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
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default GuardedRoute;
