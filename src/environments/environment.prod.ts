const host = '192.168.1.9';
const port = '8080';
const protocol = 'http://';
export const environment = {
  production: true,
  host: host,
  port: port,
  protocol: protocol,
  SOCKET_ENDPOINT: protocol + host + ':3000',
};
