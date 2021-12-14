export const changeLanguage = (language) => {
  localStorage.setItem("language", language);
  window.location.reload();
};

export default {
  changeLanguage,
};
