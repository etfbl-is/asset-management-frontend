import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message, Popconfirm, Space, Typography } from "antd";
import {
  Content,
  StyledTable,
  Toolbar,
} from "../../components/BasicStyledComponents";

import { useDispatch, useSelector } from "react-redux";
import { changeRole, changeStatus, getAll } from "../../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const User = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAll());
  }, []);

  const onChangeRole = (record) => {
    dispatch(changeRole(record))
      .then(unwrapResult)
      .then(() => message.success(t("successChangeRole")))
      .catch((err) => {
        console.error(err);
        message.error(t("failChangeRole"));
      });
  };

  const onChangeStatus = (record) => {
    dispatch(changeStatus(record))
      .then(unwrapResult)
      .then(() => message.success(t("successChangeStatus")))
      .catch((err) => {
        console.error(err);
        message.error(t("failChangeStatus"));
      });
  };

  const columns = [
    {
      title: t("user.username"),
      dataIndex: "username",
    },

    {
      title: t("user.firstName"),
      dataIndex: "firstName",
    },
    {
      title: t("user.lastName"),
      dataIndex: "lastName",
    },
    {
      title: t("user.email"),
      dataIndex: "email",
    },
    {
      title: t("user.role"),
      dataIndex: "role",
      render: (text) => t(`user.${text}`),
    },
    {
      title: t("user.status"),
      dataIndex: "status",
      render: (text) => t(`user.${text}`),
    },
    {
      title: t("actions"),
      key: "actions",
      // eslint-disable-next-line react/display-name
      render: (_text, record) => {
        if (user.id === record.id) return;
        return (
          <Space size="middle">
            <Popconfirm
              title={t("areYouSure")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => onChangeRole(record)}
            >
              <a>{t("user.changeRole")}</a>
            </Popconfirm>
            <Popconfirm
              title={t("areYouSure")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => onChangeStatus(record)}
            >
              <a>{t("user.changeStatus")}</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{t("user.title")}</Typography.Title>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={users}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
    </Content>
  );
};

export default User;
