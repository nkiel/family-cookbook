type AppConfig = {
  appTitle: string;
};

export default function useAppConfig(): AppConfig {
  // TODO move config info into mongo database
  return {
    appTitle: 'Cookbook',
  };
}
