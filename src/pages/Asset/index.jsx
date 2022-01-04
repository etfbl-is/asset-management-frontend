import React, { useState, useEffect } from "react";
import assetService from "../../services/asset.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import ApplicationHeader from "../../components/ApplicationHeader";
import AssetModal from "./components/AssetModal";
import {
  Content,
  Page,
  StyledTable,
  Toolbar,
} from "../../components/BasicStyledComponents";
import {
  handleDeleteError,
  handleInsertError,
  handleUpdateError,
} from "../../util.js/errorHandlers";

const Asset = () => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  useEffect(() => {
    assetService.getAll().then((res) => setAssets(res.data));
  }, []);
  const columns = [
    {
      title: t("asset.name"),
      dataIndex: "name",
    },
    {
      title: t("asset.identifier"),
      dataIndex: "identifier",
    },
    {
      title: t("asset.description"),
      dataIndex: "description",
    },
    {
      title: t("asset.location"),
      dataIndex: "locationName",
    },
    {
      title: t("asset.type"),
      dataIndex: "assetTypeName",
    },
    {
      title: t("asset.status"),
      dataIndex: "assetStatusName",
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

  const openEditModal = (asset) => {
    setSelectedAsset(asset);
    setEditMode(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAsset(null);
    setConfirmLoading(false);
    setEditMode(false);
    setModalVisible(false);
  };

  const saveData = (asset) => {
    setConfirmLoading(true);
    if (editMode) {
      assetService
        .update(asset)
        .then((res) => {
          message.success(t("editSuccess"));
          closeModal();
          setAssets(
            assets.map((el) => (el.id === res.id ? { ...el, ...res } : el))
          );
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleUpdateError(err, t);
        });
    } else {
      assetService
        .insert(asset)
        .then((res) => {
          closeModal();
          message.success(t("insertSuccess"));
          setAssets([...assets, res]);
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleInsertError(err, t);
        });
    }
  };

  const onDelete = (asset) => {
    assetService
      .remove(asset.id)
      .then(() => {
        message.success(t("deleteSuccess"));
        setAssets(assets.filter((el) => el.id !== asset.id));
      })
      .catch((err) => {
        handleDeleteError(err, t);
      });
  };

  return (
    <Page>
      <ApplicationHeader />
      <Content>
        <Toolbar>
          <Typography.Title level={3}>{t("asset.title")}</Typography.Title>
          <Button type="primary" onClick={() => openAddModal()}>
            {t("asset.addBtn")}
          </Button>
        </Toolbar>
        <StyledTable
          key="id"
          dataSource={assets}
          columns={columns}
          scroll={{ y: "calc(100vh - 250px)" }}
        />
      </Content>
      <AssetModal
        editMode={editMode}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        asset={selectedAsset}
        onCancel={closeModal}
        onOk={saveData}
      />
    </Page>
  );
};

export default Asset;
