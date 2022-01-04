import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, Modal } from "antd";

const SignUpModal = (props) => {
  const { t } = useTranslation();
  const { visible, onOk, onCancel, confirmLoading } = props;
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };
  return (
    <Modal
      title={t("user.signUp")}
      okText={t("save")}
      cancelText={t("cancel")}
      onOk={() => onSubmit()}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("user.firstName")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("user.lastName")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("user.username")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("user.password")}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("user.email")}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

SignUpModal.propTypes = {
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default SignUpModal;
