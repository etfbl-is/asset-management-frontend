import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import ApplicationHeader from "./components/ApplicationHeader";
import { Page } from "./components/BasicStyledComponents";
import initializeI18N from "./i8n/init";
import Asset from "./pages/Asset";
import Location from "./pages/Location";
import AssetStatus from "./pages/AssetStatus";
import AssetType from "./pages/AssetType";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { authState } from "./redux/slices/userSlice";
import Login from "./pages/Login";
import User from "./pages/User";
import { ROLE_ADMIN } from "./util.js/constants";
initializeI18N();

const AppContent = styled.div`
  display: flex;
  height: 100%;
`;

const LoadingPage = styled(Spin)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const {
    user,
    role,
    authenticated,
    loading,
    authenticationFailed,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authState());
  }, []);
  if (loading && !authenticationFailed) {
    return <LoadingPage className="spinner" size="large" />;
  }

  if (!authenticated) {
    return <Login />;
  }
  console.log(role);
  return (
    <BrowserRouter>
      <Page>
        <ApplicationHeader user={user} />
        <AppContent>
          <Switch>
            <Route exact path={"/asset"}>
              <Asset />
            </Route>
            <Route exact path={"/location"}>
              <Location />
            </Route>
            {role === ROLE_ADMIN && (
              <>
                <Route exact path={"/asset-type"}>
                  <AssetType />
                </Route>
                <Route exact path={"/asset-status"}>
                  <AssetStatus />
                </Route>
                <Route exact path={"/user"}>
                  <User />
                </Route>
              </>
            )}
            <Route>
              <Redirect to={"/asset"} />
            </Route>
          </Switch>
        </AppContent>
      </Page>
    </BrowserRouter>
  );
};

export default App;
