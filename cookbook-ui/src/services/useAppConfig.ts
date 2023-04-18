import React, { useMemo, useState, useEffect } from 'react';
import useApi from './useApi';

function AppConfigProvider() {
  return;
}

function useAppConfig() {
  const api = useApi();
  const [config, setConfig] = useState({});
  useEffect(() => {
    const loadConfig = async () => setConfig(await api.api_call('config'));
    loadConfig();
  }, []);
  return config;
}

export default useAppConfig;
