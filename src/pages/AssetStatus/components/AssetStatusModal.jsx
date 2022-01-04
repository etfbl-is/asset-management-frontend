import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, Modal } from "antd";

const AssetStatusModal = (props) => {
  const { t } = useTranslation();
  const {
    editMode,
    visible,
    onOk,
    onCancel,
    assetStatus,
    confirmLoading,
  } = props;
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...assetStatus, ...values });
    });
  };
  useEffect(() => {
    if (assetStatus) form.setFieldsValue(assetStatus);
    else form.resetFields();
  }, [assetStatus]);
  return (
    <Modal
      title={
        editMode
          ? t("assetStatus.editModalTitle")
          : t("assetStatus.addModalTitle")
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
          label={t("assetStatus.name")}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AssetStatusModal.propTypes = {
  editMode: PropTypes.bool,
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  assetStatus: PropTypes.object,
};

export default AssetStatusModal;
