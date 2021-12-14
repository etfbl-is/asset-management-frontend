import React, { useState, useEffect } from "react";
import locationService from "../../services/location.service";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, message, Popconfirm, Space, Table, Typography } from "antd";
import ApplicationHeader from "../../components/ApplicationHeader";
import LocationModal from "./components/LocationModal";
const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Toolbar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  margin: 16px;
  flex-grow: 1;
`;

const LocationTable = styled(Table)`
  flex-grow: 1;
`;

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
          console.error(err);
          setConfirmLoading(false);
          message.error(t("editFail"));
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
          console.error(err);
          setConfirmLoading(false);
          message.error(t("insertFail"));
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
        console.error(err);
        message.error(t("deleteFail"));
      });
  };

  return (
    <Page>
      <ApplicationHeader />
      <Content>
        <Toolbar>
          <Typography.Title level={3}>{t("location.title")}</Typography.Title>
          <Button type="primary" onClick={() => openAddModal()}>
            {t("location.addBtn")}
          </Button>
        </Toolbar>
        <LocationTable
          key="id"
          dataSource={locations}
          columns={columns}
          scroll={{ y: "calc(100vh - 250px)" }}
        />
      </Content>
      <LocationModal
        editMode={editMode}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        location={selectedLocation}
        onCancel={closeModal}
        onOk={saveData}
      />
    </Page>
  );
};

export default Location;
