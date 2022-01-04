import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, Modal, Select } from "antd";
import locationService from "../../../services/location.service";
import assetTypeService from "../../../services/assetType.service";
import assetStatusService from "../../../services/assetStatus.service";

const AssetModal = (props) => {
  const { t } = useTranslation();
  const { editMode, visible, onOk, onCancel, asset, confirmLoading } = props;
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [assetStatuses, setAssetStatuses] = useState([]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...asset, ...values });
    });
  };
  useEffect(() => {
    if (asset) form.setFieldsValue(asset);
    else form.resetFields();
  }, [asset]);
  useEffect(() => {
    locationService.getAll().then((res) => setLocations(res.data));
    assetTypeService.getAll().then((res) => setAssetTypes(res));
    assetStatusService.getAll().then((res) => setAssetStatuses(res.data));
  }, []);
  return (
    <Modal
      title={editMode ? t("asset.editModalTitle") : t("asset.addModalTitle")}
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
          label={t("asset.name")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="identifier"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("asset.identifier")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="assetStatusId"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("asset.status")}
        >
          <Select>
            {assetStatuses.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="assetTypeId"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("asset.type")}
        >
          <Select>
            {assetTypes.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="locationId"
          rules={[{ required: true, message: t("fieldRequired") }]}
          label={t("asset.location")}
        >
          <Select>
            {locations.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label={t("asset.description")}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AssetModal.propTypes = {
  editMode: PropTypes.bool,
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  asset: PropTypes.object,
};

export default AssetModal;
