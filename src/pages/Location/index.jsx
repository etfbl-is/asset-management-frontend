import React, { useState, useEffect } from "react";
import locationService from "../../services/location.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import LocationModal from "./components/LocationModal";
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

const Location = () => {
  const { t } = useTranslation();
  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    locationService.getAll().then((res) => setLocations(res.data));
  }, []);
  const columns = [
    {
      title: t("location.name"),
      dataIndex: "name",
    },
    {
      title: t("location.description"),
      dataIndex: "description",
    },
    {
      title: t("location.latitude"),
      dataIndex: "latitude",
    },
    {
      title: t("location.longitude"),
      dataIndex: "longitude",
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

  const openEditModal = (location) => {
    setSelectedLocation(location);
    setEditMode(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedLocation(null);
    setConfirmLoading(false);
    setEditMode(false);
    setModalVisible(false);
  };

  const saveData = (location) => {
    setConfirmLoading(true);
    if (editMode) {
      locationService
        .update(location)
        .then((res) => {
          message.success(t("editSuccess"));
          closeModal();
          setLocations(
            locations.map((el) => (el.id === res.id ? { ...el, ...res } : el))
          );
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleUpdateError(err, t);
        });
    } else {
      locationService
        .insert(location)
        .then((res) => {
          closeModal();
          message.success(t("insertSuccess"));
          setLocations([...locations, res]);
        })
        .catch((err) => {
          setConfirmLoading(false);
          handleInsertError(err, t);
        });
    }
  };

  const onDelete = (location) => {
    locationService
      .remove(location.id)
      .then(() => {
        message.success(t("deleteSuccess"));
        setLocations(locations.filter((el) => el.id !== location.id));
      })
      .catch((err) => {
        handleDeleteError(err, t);
      });
  };

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{t("location.title")}</Typography.Title>
        <Button type="primary" onClick={() => openAddModal()}>
          {t("location.addBtn")}
        </Button>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={locations}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
      <LocationModal
        editMode={editMode}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        location={selectedLocation}
        onCancel={closeModal}
        onOk={saveData}
      />
    </Content>
  );
};

export default Location;
