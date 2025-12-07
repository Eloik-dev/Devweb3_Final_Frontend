export default class EnvUtils {
  static isDev() {
    return import.meta.env.VITE_ENV === "dev";
  }

  static getApiUrl() {
    if (this.isDev()) {
      return import.meta.env.VITE_API_URL_DEV;
    }
    return import.meta.env.VITE_API_URL_PROD;
  }
}
