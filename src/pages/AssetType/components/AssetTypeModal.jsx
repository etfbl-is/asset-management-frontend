import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, Modal } from "antd";

const assetTypeModal = (props) => {
  const { t } = useTranslation();
  const {
    editMode,
    visible,
    onOk,
    onCancel,
    assetType,
    confirmLoading,
  } = props;
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...assetType, ...values });
    });
  };
  useEffect(() => {
    if (assetType) form.setFieldsValue(assetType);
    else form.resetFields();
  }, [assetType]);
  return (
    <Modal
      title={
        editMode ? t("assetType.editModalTitle") : t("assetType.addModalTitle")
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
          label={t("assetType.name")}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label={t("assetType.description")}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

assetTypeModal.propTypes = {
  editMode: PropTypes.bool,
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  assetType: PropTypes.object,
};

export default assetTypeModal;
