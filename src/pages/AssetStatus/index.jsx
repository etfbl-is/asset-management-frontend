import React, { useState, useEffect } from "react";
import assetStatusService from "../../services/assetStatus.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import AssetStatusModal from "./components/AssetStatusModal";
import {
  Content,
  StyledTable,
  Toolbar,
} from "../../components/BasicStyledComponents";
import {
  handleDeleteError,
  handleInsertError,
  handleUpdateError,
} from "../../util.js/errorHandlers";

const AssetStatus = () => {
  const { t } = useTranslation();
  const [assetStatuses, setAssetStatuss] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [selectedAssetStatus, setSelectedAssetStatus] = useState(null);
  useEffect(() => {
    assetStatusService.getAll().then((res) => setAssetStatuss(res.data));
  }, []);
  const columns = [
    {
      title: t("assetStatus.name"),
      dataIndex: "name",
    },
    {
      title: t("actions"),
      key: "actions",
      // eslint-disable-next-line react/display-name
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => openEditModal(record)}>{t("edit")}</a>
          <Popconfirm
            title={t("areYouSure")}
            okText={t("yes")}
            cancelText={t("no")}
            onConfirm={() => onDelete(record)}
          >
            <a>{t("delete")}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const openAddModal = () => {
    setEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (assetStatus) => {
    setSelectedAssetStatus(assetStatus);
    setEditMode(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAssetStatus(null);
    setConfirmLoading(false);
    setEditMode(false);
    setModalVisible(false);
  };

  const saveData = (assetStatus) => {
    setConfirmLoading(true);
    if (editMode) {
      assetStatusService
        .update(assetStatus)
        .then((res) => {
          message.success(t("editSuccess"));
          closeModal();
          setAssetStatuss(
            assetStatuses.map((el) =>
              el.id === res.id ? { ...el, ...res } : el
            )
          );
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleUpdateError(err, t);
        });
    } else {
      assetStatusService
        .insert(assetStatus)
        .then((res) => {
          closeModal();
          message.success(t("insertSuccess"));
          setAssetStatuss([...assetStatuses, res]);
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleInsertError(err, t);
        });
    }
  };

  const onDelete = (assetStatus) => {
    assetStatusService
      .remove(assetStatus.id)
      .then(() => {
        message.success(t("deleteSuccess"));
        setAssetStatuss(assetStatuses.filter((el) => el.id !== assetStatus.id));
      })
      .catch((err) => {
        handleDeleteError(err, t);
      });
  };

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{t("assetStatus.title")}</Typography.Title>
        <Button type="primary" onClick={() => openAddModal()}>
          {t("assetStatus.addBtn")}
        </Button>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={assetStatuses}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
      <AssetStatusModal
        editMode={editMode}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        assetStatus={selectedAssetStatus}
        onCancel={closeModal}
        onOk={saveData}
      />
    </Content>
  );
};

export default AssetStatus;
