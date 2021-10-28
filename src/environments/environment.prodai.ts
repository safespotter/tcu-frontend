const host = '15.161.210.238';
const port = '8080';
const ftp = '15.161.210.238';
const protocol = 'http://';
export const environment = {
  production: true,
  host: host,
  port: port,
  protocol: protocol,
  SOCKET_ENDPOINT: protocol + host + ':3000',
  ftp: ftp,
  platform: 'ai'
};
