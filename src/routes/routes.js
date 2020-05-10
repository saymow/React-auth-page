import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Main from "../pages/main";

export default function AppRouter() {
  return(
    <BrowserRouter>
      <Redirect to="/"/>
      <Switch>
        <Route exact path="/" component={Main} /> 
      </Switch>
    </BrowserRouter>
  )
}