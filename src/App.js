import React, { useEffect, useState } from "react";
import { ReactQueryDevtools } from 'react-query-devtools'
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Events from "./pages/events/events";
import EventsDetails from "./pages/eventDetails/eventDetails";

function App() {
  return (
    <BrowserRouter basename='/'>
      <Switch>
      <Route exact path="/" component={Events} />
      <Route exact path="/event" component={EventsDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
