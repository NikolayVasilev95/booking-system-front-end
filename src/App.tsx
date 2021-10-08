import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import GuardedRoute from "./GuardedRoute/GuardedRoute";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Booking from "./Booking/Booking";
import Layout from "./utils/Layout";
import Salon from "./Salon/Salon";
import NewSalon from "./Salon/NewSalon";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <GuardedRoute path="/dashboard" component={Dashboard} />
            <GuardedRoute path="/salon" component={Salon} />
            <GuardedRoute path="/new-salon" component={NewSalon} />
            {/* <GuardedRoute path="/user/setings" component={sada} /> */}
            <Route path="/" exact component={Home} />
            <Route path="/booking" exact component={Booking} />
            <Redirect from="*" to="/" />
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
