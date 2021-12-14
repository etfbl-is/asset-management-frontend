import React from "react";
import { changeLanguage } from "../services/application.service";
import { supportedLanguages } from "../i8n/init";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ZhihuOutlined } from "@ant-design/icons";

const DropdownIcon = styled(ZhihuOutlined)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 2px 4px;
  transition: all 0.3s;
  font-size: x-large;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.025);
  }
`;
const LanguageSelector = (props) => {
  const { t } = useTranslation();
  const onClick = ({ key }) => {
    changeLanguage(key);
  };
  const menu = (
    <Menu onClick={onClick} selectedKeys={[localStorage.getItem("language")]}>
      {supportedLanguages.map((key) => (
        <Menu.Item key={key}>{t(key)}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu}>
        <DropdownIcon />
      </Dropdown>
    </div>
  );
};

export default LanguageSelector;
