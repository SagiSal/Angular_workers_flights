const HttpsProxyAgent = require("https-proxy-agent");

const proxyConfig = [
  {
    context: "/flights",
    pathRewrite: { "^/flights": "" },
    target: "http://128.24.65.53:3000/flights/:",
    changeOrigin: true,
    secure: false,
  },
];

function setupForCorporateProxy(proxyConfig) {
  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;

  if (proxyServer) {
    const agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach((c) => {
      c.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
