import developmentConfig from "./config.development.json";
import productionConfig from "./config.production.json";

export default () => {
  switch (process.env.NODE_ENV) {
    case "development":
    case "test": {
      return developmentConfig;
    }
    case "production": {
      return productionConfig;
    }

    default: {
      throw new Error("NODE_ENV not being set");
    }
  }
};
