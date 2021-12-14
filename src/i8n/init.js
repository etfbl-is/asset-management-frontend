import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import sr from "./sr.json";

export const supportedLanguages = ["en", "sr"];

const initializeI18N = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      sr: {
        translation: sr,
      },
    },
    lng: localStorage.getItem("language"),
    fallbackLng: "en",
  });
};

export default initializeI18N;
