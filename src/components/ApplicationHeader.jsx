import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LanguageSelector from "./LanguageSelector";
import MainMenu from "./MainMenu";

const Header = styled.div`
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  justify-content: space-between;
  display: flex;
  height: auto;
  line-height: 48px;
  padding: 0 25px;
  flex-wrap: wrap;
  align-items: center;
`;

const Title = styled.span`
  font-weight: bold;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const ApplicationHeader = (props) => {
  const { t } = useTranslation();
  return (
    <Header>
      <LeftSide>
        <Title>{t("application.title")}</Title>
        <MainMenu />
      </LeftSide>
      <LanguageSelector />
    </Header>
  );
};

export default ApplicationHeader;
