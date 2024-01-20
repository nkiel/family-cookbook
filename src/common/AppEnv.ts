enum AppEnv {
  PROD = 'production',
  DEVL = 'development',
}

export const getEnv = () =>
  import.meta.env.MODE as AppEnv;

export default AppEnv;
