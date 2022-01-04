import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { message, notification, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout, update } from "../redux/slices/userSlice";
import { ROLE_ADMIN } from "../util.js/constants";
import { handleUpdateError } from "../util.js/errorHandlers";
import LanguageSelector from "./LanguageSelector";
import MainMenu from "./MainMenu";
import UserInfoModal from "./UserInfoModal";

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
const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutIcon = styled(LogoutOutlined)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 2px 4px;
  transition: all 0.3s;
  font-size: large;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.025);
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  transition: all 0.3s;
  font-size: large;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.025);
  }
`;
const ApplicationHeader = (props) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { firstName, lastName, role } = useSelector(
    (state) => state.users.user
  );
  const user = useSelector((state) => state.users.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const stompClient = useRef(null);
  const stompSubscription = useRef(null);
  const openNotification = (user) => {
    notification.open({
      title: t("application.notificationTitle"),
      description: `${t("application.notificationText")} :${user.firstName} ${
        user.lastName
      } (${user.email}) `,
    });
  };
  const mountStompConnection = () => {
    stompClient.current = new Client({
      brokerURL: "ws://localhost:61614/stomp",
      connectHeaders: {
        login: "admin",
        passcode: "admin",
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    stompClient.current.onConnect = () => {
      stompSubscription.current = stompClient.current.subscribe(
        "/topic/sign-up-topic",
        (message) => {
          openNotification(JSON.parse(message.body));
        }
      );
    };
    stompClient.current.activate();
  };
  const unmountStompConnection = () => {
    if (stompSubscription.current) {
      stompSubscription.current.unsubscribe();
      stompSubscription.current = null;
    }
    if (stompClient.current) {
      stompClient.current.deactivate();
      stompClient.current = null;
    }
  };
  useEffect(() => {
    if (role === ROLE_ADMIN) {
      mountStompConnection();
    }
    return unmountStompConnection;
  }, [role]);

  const closeModal = () => {
    setModalLoading(false);
    setModalVisible(false);
  };

  const saveUserInfo = (values) => {
    dispatch(update(values))
      .then(unwrapResult)
      .then(() => {
        closeModal();
        message.success(t("user.successUserInfo"));
      })
      .catch((err) => handleUpdateError(err, t));
  };

  return (
    <Header>
      <LeftSide>
        <Title>{t("application.title")}</Title>
        <MainMenu role={role} />
      </LeftSide>
      <RightSide>
        <Tooltip title={t("userInfo")}>
          <UserInfo onClick={() => setModalVisible(true)}>
            <UserOutlined />
            {firstName} {lastName}
          </UserInfo>
        </Tooltip>
        <LanguageSelector />
        <Tooltip title={t("logout")}>
          <LogoutIcon onClick={() => dispatch(logout())} />
        </Tooltip>
      </RightSide>
      <UserInfoModal
        visible={modalVisible}
        confirmLoading={modalLoading}
        user={user}
        onCancel={closeModal}
        onOk={saveUserInfo}
      />
    </Header>
  );
};

export default ApplicationHeader;
