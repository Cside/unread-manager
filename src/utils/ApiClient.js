import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'http://localhost:7999',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

let start;

// XXX この設定、axios でグローバルにできないっぽくてだるい
// なんか抜け道ないのかなぁ
ApiClient.interceptors.request.use(config => {
  start = new Date();
  return config;
});

ApiClient.interceptors.response.use(res => {
  console.debug(
    `[${(new Date() - start).toLocaleString()}ms] ${res.status} ${res.config.method.toUpperCase()}  ${res.config.url}`,
  );
  return res;
});

export default ApiClient;
