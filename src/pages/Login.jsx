import { Button, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Page } from "../components/BasicStyledComponents";
import SignUpModal from "../components/SignUpModal";
import { login } from "../redux/slices/userSlice";
import userService from "../services/user.service";

const LoginPage = styled(Page)`
  padding-top: 250px;
  align-items: center;
`;

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const { username } = credentials;
    if (!username) return;
    dispatch(login(credentials));
  }, [credentials]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const closeModal = () => {
    setModalLoading(false);
    setModalVisible(false);
  };

  const signUpUser = (values) => {
    userService
      .signUp(values)
      .then(() => {
        closeModal();
        message.success(t("user.signUpSuccess"));
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 409)
          message.error(t("user.usernameExists"));
        else message.error(t("user.signUpFail"));
      });
  };
  return (
    <LoginPage>
      <Form
        style={{ width: "25%" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        initialValues={credentials}
        onFinish={(values) => setCredentials(values)}
      >
        <Form.Item
          label={t("user.username")}
          name="username"
          rules={[{ required: true, message: t("fieldRequired") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("user.password")}
          name="password"
          rules={[{ required: true, message: t("fieldRequired") }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            {t("user.submit")}
          </Button>
          <Button
            style={{ marginLeft: 16 }}
            onClick={() => setModalVisible(true)}
          >
            {t("user.signUp")}
          </Button>
        </Form.Item>
      </Form>
      <SignUpModal
        visible={modalVisible}
        confirmLoading={modalLoading}
        onCancel={closeModal}
        onOk={signUpUser}
      />
    </LoginPage>
  );
};

export default Login;
