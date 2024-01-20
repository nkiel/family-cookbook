import { useState, useEffect } from 'react';
import Log from '../../common/Logger';
import api from './api';

function useAppConfig() {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const loadConfig = async () => setConfig(await api.api_call('config'));
    loadConfig().catch((error) => Log.error(error));
  }, []);
  return config;
}

export default useAppConfig;
