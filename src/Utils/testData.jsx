import jwt from "jsonwebtoken";

export const wallet = {
  responseTime: "2024-03-03T00:37:42.6491336",
  balance: 342941.30000000075,
  totpEnabled: true,
  updated: "2024-03-01T17:14:15.83",
  created: "2024-02-27T22:30:01.119",
};
export const walletResponse = {
  json: () => wallet,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};

export const walletNoTOTP = {
  responseTime: "2024-03-03T00:37:42.6491336",
  balance: 342941.30000000075,
  totpEnabled: false,
  updated: "2024-03-01T17:14:15.83",
  created: "2024-02-27T22:30:01.119",
};

export function generateUser(seconds = 604800) {
  const payload = {
    sub: "user1",
    iat: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
    exp: Math.floor(Date.now() / 1000) + seconds,
  };
  return payload;
}

export function generateToken(seconds = 604800) {
  const payload = {
    sub: "user1",
    iat: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
    exp: Math.floor(Date.now() / 1000) + seconds,
  };
  const secret = "testing";
  return jwt.sign(payload, secret);
}

export const user = generateUser();
export const userExpired = generateUser(-600);

export const token = {
  accessToken: generateToken(),
  tokenType: "Bearer",
};
export const tokenExpired = {
  accessToken: generateToken(-600),
  tokenType: "Bearer",
};
export const tokenInvalid = {
  accessToken: "invalid",
  tokenType: "Bearer",
};
export const tokenResponse = {
  json: () => token,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const tokenResponseNotOk = {
  message: "error",
  status: 400,
  ok: false,
  headers: { "Content-Type": "application/json" },
};

export const QrCodeData = {
  message:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAACpUlEQ",
};
export const QrCodeResponse = {
  json: () => {
    return QrCodeData;
  },
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const QrCodeConfirmData = true;
export const QrCodeConfirmResponse = {
  json: () => QrCodeConfirmData,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const disableTOTPResponse = {
  json: () => ({ message: "TOTP disabled" }),
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const disableTOTPResponseNotOk = {
    json: () => ({ message: "error" }),
    status: 400,
    ok: false,
    headers: { "Content-Type": "application/json" },
}
export const checkUsernameAvailableResponse = {
  json: () => true,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const registerResponse = {
  json: () => ({ message: "User Created" }),
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const snackbarData = {
  message: "test",
  isOpen: true,
  severity: "success",
};
export const statementData = {
  totalPages: 12,
  responseTime: "2024-03-16T17:15:23.19378783",
  statements: [
    {
      id: "65f57fe3254f80757e7a1569",
      type: "Debit",
      status: "Cancelled",
      fromTo: "user2",
      amount: 100,
      createdAt: "2024-03-16T16:47:55.686",
    },
    {
      id: "65f489019fa5d160a8a94499",
      type: "Debit",
      status: "Successful",
      fromTo: "user2",
      amount: 10000000,
      createdAt: "2024-03-15T23:14:33.401",
    },
    {
      id: "65f488df9fa5d160a8a94498",
      type: "Recharge",
      status: "Successful",
      fromTo: "Self",
      amount: 100000,
      createdAt: "2024-03-15T23:13:59.007",
    },
    {
      id: "65f488d69fa5d160a8a94497",
      type: "Recharge",
      status: "Successful",
      fromTo: "Self",
      amount: 100000,
      createdAt: "2024-03-15T23:13:50.313",
    },
    {
      id: "65f43ccc0a783130783855e8",
      type: "Recharge",
      status: "Successful",
      fromTo: "Self",
      amount: 100000,
      createdAt: "2024-03-15T17:49:24.267",
    },
    {
      id: "65f43c160a783130783855e7",
      type: "Debit",
      status: "Cancelled",
      fromTo: "user2",
      amount: 1000,
      createdAt: "2024-03-15T17:46:22.301",
    },
    {
      id: "65f43bd90a783130783855e6",
      type: "Debit",
      status: "Cancelled",
      fromTo: "user2",
      amount: 1000,
      createdAt: "2024-03-15T17:45:21.796",
    },
    {
      id: "65f43b510a783130783855e5",
      type: "Debit",
      status: "Initiated",
      fromTo: "user2",
      amount: 1000,
      createdAt: "2024-03-15T17:43:05.768",
    },
    {
      id: "65f43ab40a783130783855e4",
      type: "Debit",
      status: "Timeout",
      fromTo: "user2",
      amount: 1000,
      createdAt: "2024-03-15T17:40:28.467",
    },
    {
      id: "65f4022911974976e0986636",
      type: "Debit",
      status: "Timeout",
      fromTo: "user2",
      amount: 100,
      createdAt: "2024-03-15T13:39:13.782",
    },
  ],
};

export const statementResponse = {
  json: () => statementData,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const cashbackData = {
  totalPages: 3,
  responseTime: "2024-03-16T17:02:00.80577365",
  recharges: [
    {
      id: "65f488df9fa5d160a8a94498",
      amount: 100000,
      cashback: 34,
      created: "2024-03-15T23:13:59.007",
    },
    {
      id: "65f318a9b50e4e5aae3c7807",
      amount: 1000,
      cashback: 2,
      created: "2024-03-14T21:02:57.138",
    },
    {
      id: "65f2ec1b681238229e53f26b",
      amount: 100,
      cashback: 0,
      created: "2024-03-14T17:52:51.023",
    },
    {
      id: "65f2ec12681238229e53f26a",
      amount: 10,
      cashback: 0,
      created: "2024-03-14T17:52:42.4",
    },
  ],
};
export const cashbackResponse = {
  json: () => cashbackData,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const InitTransactionObject = {
  transactionId: "65e49a905f85ef7f7fb33889",
  from: "user1",
  to: "user2",
  amount: 100,
  created: "2024-03-03T21:13:12.6626127",
};
export const InitTransactionResponse = {
  json: () => InitTransactionObject,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const confirmTransactionTimeout = {
  timeStamp: "2024-03-03T21:15:21.0790107",
  error: "Bad Request",
  message: "Transaction timeout",
  description: "uri=/transaction/confirm/65e49a905f85ef7f7fb33889",
};
export const confirmTransactionTimeoutResponse = {
  json: () => confirmTransactionTimeout,
  status: 400,
  ok: false,
  headers: { "Content-Type": "application/json" },
};
export const confirmTransactionSuccessResponse = {
  json: () => wallet,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
export const cancelTransactionObject = {
  message: "Transaction cancelled",
};
export const cancelTransactionResponse = {
  json: () => cancelTransactionObject,
  status: 200,
  ok: true,
  headers: { "Content-Type": "application/json" },
};
