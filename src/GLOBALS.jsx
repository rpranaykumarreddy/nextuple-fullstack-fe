export const GLOBALS = {
  serverHost: "http://localhost:8080",
  link: {
    auth: {
      id: "/auth",
      register: "/register",
      login: "/login",
      regenerate: "/regenerate",
      checkUsername: "/check-username",
    },
    recharge: {
      id: "/recharge",
    },
    transaction: {
      id: "/transaction",
      checkWallet: "/check-wallet",
      initiate: "/init",
      confirm: "/confirm",
      cancel: "/cancel",
    },
    wallet: {
      id: "/wallet",
      details: "/details",
      createTotp: "/totp",
      confirmTotp: "/totp/confirm",
      disableTotp: "/totp/disable",
      statement: "/statement",
      cashback: "/cashback",
    },
  },
};
