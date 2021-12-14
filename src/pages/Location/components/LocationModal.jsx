import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Modal } from "antd";

const LocationModal = (props) => {
  const { t } = useTranslation();
  const { editMode, visible, onOk, onCancel, location, confirmLoading } = props;
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...location, ...values });
    });
  };
  useEffect(() => {
    if (location) form.setFieldsValue(location);
    else form.resetFields();
  }, [location]);
  return (
    <Modal
      title={
        editMode ? t("location.editModalTitle") : t("location.addModalTitle")
      }
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
          name="name"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("location.name")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="latitude"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("location.latitude")}
        >
          <InputNumber min={-90} max={90} precision={6} />
        </Form.Item>
        <Form.Item
          name="longitude"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("location.longitude")}
        >
          <InputNumber min={-180} max={180} precision={6} />
        </Form.Item>
        <Form.Item name="description" label={t("location.description")}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

LocationModal.propTypes = {
  editMode: PropTypes.bool,
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  location: PropTypes.object,
};

export default LocationModal;
