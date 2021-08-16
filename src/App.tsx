import React from "react";
import CarsPage from "./pages/Cars.page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LearnPage from "./pages/Learn.page";
import ShopPage from "./pages/Shop.page";
import { StyleProvider, ThemePicker } from 'vcc-ui';

function App() {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <Router>
          <Switch>
            <Route path="/learn">
              <LearnPage />
            </Route>
            <Route path="/shop">
              <ShopPage />
            </Route>
            <Route path="/">
              <CarsPage />
            </Route>
          </Switch>
        </Router>
      </ThemePicker>
    </StyleProvider>
  );
}

export default App;
