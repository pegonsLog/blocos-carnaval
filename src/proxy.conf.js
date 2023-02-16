const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://carnaval-bhtrans-2023-default-rtdb.firebaseio.com",
    secure: true,
    logLevel: "debug",
    pathRewrite: { "^/api": "" },
  },
];

module.exports = PROXY_CONFIG;
