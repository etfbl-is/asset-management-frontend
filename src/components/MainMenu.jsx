import React from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
const MainMenu = (props) => {
  const { t } = useTranslation();
  const { pathname } = props.location;
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
      <Menu.Item key={"/asset-type"}>
        <Link to={"/asset-type"}>{t("assetType.title")}</Link>
      </Menu.Item>
      <Menu.Item key={"/asset-status"}>
        <Link to={"/asset-status"}>{t("assetStatus.title")}</Link>
      </Menu.Item>
    </Menu>
  );
};

MainMenu.propTypes = {
  location: PropTypes.object,
};

export default withRouter(MainMenu);
