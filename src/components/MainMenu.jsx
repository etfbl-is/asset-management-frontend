import React from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { ROLE_ADMIN } from "../util.js/constants";
const MainMenu = (props) => {
  const { t } = useTranslation();
  const { pathname } = props.location;
  const { role } = props;
  return (
    <Menu
      defaultSelectedKeys={[pathname === "/" ? "/asset" : pathname]}
      theme="light"
      mode="horizontal"
    >
      <Menu.Item key={"/asset"}>
        <Link to={"/asset"}>{t("asset.title")}</Link>
      </Menu.Item>
      <Menu.Item key={"/location"}>
        <Link to={"/location"}>{t("location.title")}</Link>
      </Menu.Item>
      {role === ROLE_ADMIN && (
        <>
          <Menu.Item key={"/asset-type"}>
            <Link to={"/asset-type"}>{t("assetType.title")}</Link>
          </Menu.Item>
          <Menu.Item key={"/asset-status"}>
            <Link to={"/asset-status"}>{t("assetStatus.title")}</Link>
          </Menu.Item>
          <Menu.Item key={"/user"}>
            <Link to={"/user"}>{t("user.title")}</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

MainMenu.propTypes = {
  location: PropTypes.object,
  role: PropTypes.string,
};

export default withRouter(MainMenu);
