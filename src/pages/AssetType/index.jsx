import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import AssetTypeModal from "./components/AssetTypeModal";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  insert,
  remove,
  update,
} from "../../redux/slices/assetTypeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const AssetType = () => {
  const { t } = useTranslation();
  const assetTypes = useSelector((state) => state.assetTypes);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState(null);
  useEffect(() => {
    dispatch(getAll());
  }, []);
  const columns = [
    {
      title: t("assetType.name"),
      dataIndex: "name",
    },
    {
      title: t("assetType.description"),
      dataIndex: "description",
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

  const openEditModal = (assetType) => {
    setSelectedAssetType(assetType);
    setEditMode(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAssetType(null);
    setConfirmLoading(false);
    setEditMode(false);
    setModalVisible(false);
  };

  const saveData = (assetType) => {
    setConfirmLoading(true);
    if (editMode) {
      dispatch(update(assetType))
        .then(unwrapResult)
        .then((res) => {
          message.success(t("editSuccess"));
          closeModal();
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleUpdateError(err, t);
        });
    } else {
      dispatch(insert(assetType))
        .then(unwrapResult)
        .then((res) => {
          closeModal();
          message.success(t("insertSuccess"));
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleInsertError(err, t);
        });
    }
  };

  const onDelete = (assetType) => {
    dispatch(remove(assetType.id))
      .then(unwrapResult)
      .then(() => {
        message.success(t("deleteSuccess"));
      })
      .catch((err) => {
        handleDeleteError(err, t);
      });
  };

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{t("assetType.title")}</Typography.Title>
        <Button type="primary" onClick={() => openAddModal()}>
          {t("assetType.addBtn")}
        </Button>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={assetTypes}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
      <AssetTypeModal
        editMode={editMode}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        assetType={selectedAssetType}
        onCancel={closeModal}
        onOk={saveData}
      />
    </Content>
  );
};

export default AssetType;
