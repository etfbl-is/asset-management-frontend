import { message } from "antd";

export const handleInsertError = (err, t) => {
  console.error(err);
  if (err.response.status === 409) message.error(t("duplicate"));
  else message.error(t("insertFails"));
};

export const handleUpdateError = (err, t) => {
  console.error(err);
  if (err.response.status === 409) message.error(t("duplicate"));
  else message.error(t("editFail"));
};

export const handleDeleteError = (err, t) => {
  console.error(err);
  message.error(t("deleteFail"));
};
