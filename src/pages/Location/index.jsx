import React, { useState, useEffect } from "react";
import locationService from "../../services/location.service";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, Table, Typography } from "antd";
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
  const [editMode, setEditMode] = useState(false);
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
  ];

  const openAddModal = () => {
    setEditMode(false);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
          dataSource={locations}
          columns={columns}
          scroll={{ y: "calc(100vh - 250px)" }}
        />
      </Content>
      <LocationModal
        editMode={editMode}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={closeModal}
      />
    </Page>
  );
};

export default Location;
