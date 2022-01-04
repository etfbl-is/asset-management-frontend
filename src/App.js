import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import ApplicationHeader from "./components/ApplicationHeader";
import { Page } from "./components/BasicStyledComponents";
import initializeI18N from "./i8n/init";
import Asset from "./pages/Asset";
import Location from "./pages/Location";
import AssetStatus from "./pages/AssetStatus";
import AssetType from "./pages/AssetType";
initializeI18N();

const AppContent = styled.div``;

const App = () => (
  <BrowserRouter>
    <Page>
      <ApplicationHeader />
      <AppContent>
        <Switch>
          <Route exact path={"/asset"}>
            <Asset />
          </Route>
          <Route exact path={"/location"}>
            <Location />
          </Route>
          <Route exact path={"/asset-type"}>
            <AssetType />
          </Route>
          <Route exact path={"/asset-status"}>
            <AssetStatus />
          </Route>
          <Route>
            <Redirect to={"/asset"} />
          </Route>
        </Switch>
      </AppContent>
    </Page>
  </BrowserRouter>
);

export default App;
