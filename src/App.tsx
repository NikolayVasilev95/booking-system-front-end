import React from "react";
import "./App.css";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import GuardedRoute from "./GuardedRoute/GuardedRoute";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Booking from "./pages/Booking/Booking";
import Layout from "./utils/Layout";
import Salons from "./pages/Salon/Salons/Salons";
import NewSalon from "./pages/Salon/NewSalon/NewSalon";
import EditSalon from "./pages/Salon/EditSlon/EditSalon";
import Positions from "./pages/Position/Positions/Positions";
import NewPosition from "./pages/Position/NewPosition/NewPosition";
import EditPosition from "./pages/Position/EditPosition/EditPosition";
import Employees from "./pages/Employee/Employees/Employees";
import EditEmployee from "./pages/Employee/EditEmployee/EditEmployee";
import NewEmployee from "./pages/Employee/NewEmployee/NewEmployee";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <GuardedRoute path="/dashboard" component={Dashboard} />
            {/* SALON */}
            <GuardedRoute path="/salon" component={Salons} />
            <GuardedRoute path="/new-salon" component={NewSalon} />
            <GuardedRoute path="/edit-salon/:id" component={EditSalon} />
            {/* POSITION */}
            <GuardedRoute path="/position" component={Positions} />
            <GuardedRoute path="/new-position" component={NewPosition} />
            <GuardedRoute path="/edit-position/:id" component={EditPosition} />
            {/* EMPLOYEE */}
            <GuardedRoute path="/employee" component={Employees} />
            <GuardedRoute path="/new-employee" component={NewEmployee} />
            <GuardedRoute path="/edit-employee/:id" component={EditEmployee} />
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
