import React, { useState, useEffect } from "react";
import assetService from "../../services/asset.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import AssetModal from "./components/AssetModal";
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

const Asset = () => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  useEffect(() => {
    assetService
      .getAll(pagination.current - 1, pagination.pageSize)
      .then((res) => {
        setAssets(res.data.content);
        setPagination({
          ...pagination,
          total: res.data.totalElements,
        });
      });
  }, []);
  const columns = [
    {
      title: t("asset.name"),
      dataIndex: "name",
      sorter: true,
    },
    {
      title: t("asset.identifier"),
      dataIndex: "identifier",
      sorter: true,
    },
    {
      title: t("asset.description"),
      dataIndex: "description",
      sorter: true,
    },
    {
      title: t("asset.location"),
      dataIndex: "locationName",
      sorter: true,
    },
    {
      title: t("asset.type"),
      dataIndex: "assetTypeName",
      sorter: true,
    },
    {
      title: t("asset.status"),
      dataIndex: "assetStatusName",
      sorter: true,
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

  const onTableChange = (pagination, filter, sorters) => {
    console.log(pagination, filter, sorters);
    assetService
      .getAll(pagination.current - 1, pagination.pageSize, sorters)
      .then((res) => {
        setAssets(res.data.content);
        setPagination({ ...pagination, total: res.data.totalElements });
      });
  };

  return (
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
        onChange={onTableChange}
        pagination={pagination}
      />
      <AssetModal
        editMode={editMode}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        asset={selectedAsset}
        onCancel={closeModal}
        onOk={saveData}
      />
    </Content>
  );
};

export default Asset;
