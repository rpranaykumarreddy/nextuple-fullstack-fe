import jwt from "jsonwebtoken";

export const wallet = {
    responseTime: "2024-03-03T00:37:42.6491336",
    balance: 342941.30000000075,
    totpEnabled: true,
    updated: "2024-03-01T17:14:15.83",
    created: "2024-02-27T22:30:01.119"
}
export const walletResponse = {
    json: () => wallet,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}

export const walletNoTOTP = {
    responseTime: "2024-03-03T00:37:42.6491336",
    balance: 342941.30000000075,
    totpEnabled: false,
    updated: "2024-03-01T17:14:15.83",
    created: "2024-02-27T22:30:01.119"
}

function generateUser(seconds = 604800) {
    const payload = {
        sub: 'user1',
        iat: Math.floor(Date.now() / 1000) - (60 * 60 * 24 * 30),
        exp: Math.floor(Date.now() / 1000) + (seconds)
    };
    return payload;
}

function generateToken(seconds = 604800) {
    const payload = {
        sub: 'user1',
        iat: Math.floor(Date.now() / 1000) - (60 * 60 * 24 * 30),
        exp: Math.floor(Date.now() / 1000) + (seconds)
    };
    const secret = 'testing';
    return jwt.sign(payload, secret);
}

export const user = generateUser();
export const userExpired = generateUser(-600);

export const token = {
    accessToken: generateToken(),
    tokenType: "Bearer"
}
export const tokenExpired = {
    accessToken: generateToken(-600),
    tokenType: "Bearer"
}
export const tokenResponse = {
    json: () => token,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}

export const QrCodeData = {
    message:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAACpUlEQ"
}
export const QrCodeResponse = {
    json: () => {return QrCodeData},
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const QrCodeConfirmData = true;
export const QrCodeConfirmResponse = {
    json: () => QrCodeConfirmData,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const checkUsernameAvailableResponse = {
    json: () => true,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const registerResponse = {
    json: () => ({message: "User Created"}),
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const snackbarData = {
    message: "test",
    isOpen: true,
    severity: "success"
}
export const statementData = {
    responseTime: "2024-03-02T21:02:40.0938321",
    wallet: {
        responseTime: "2024-03-02T21:02:40.0938321",
        balance: 342941.30000000075,
        totpEnabled: true,
        updated: "2024-03-01T17:14:15.83",
        created: "2024-02-27T22:30:01.119"
    },
    credits: [
        {
            type: "CREDIT",
            id: "65de15fc6e6cd619ce9d55d2",
            from: "user2",
            amount: 40000,
            status: "SUCCESSFUL",
            created: "2024-02-27T22:33:56.125"
        }
    ],
    debits: [
        {
            type: "DEBIT",
            id: "65df744b331f367c7dc950a5",
            to: "user2",
            amount: 1000,
            status: "INIT",
            created: "2024-02-28T23:28:35.408"
        },
        {
            type: "DEBIT",
            id: "65df6a2f282b1c62371e817e",
            to: "user2",
            amount: 1000,
            status: "TIMEOUT",
            created: "2024-02-28T22:45:27.062"
        },
        {
            type: "DEBIT",
            id: "65df89eeecab09372952e95a",
            to: "user2",
            amount: 20000000,
            status: "SUCCESSFUL",
            created: "2024-02-29T01:00:54.563"
        },
        {
            type: "DEBIT",
            id: "65df665322474010543b5138",
            to: "user2",
            amount: 10000,
            status: "CANCELLED",
            created: "2024-02-28T22:28:59.115"
        }
    ],
    recharges: [
        {
            type: "RECHARGE",
            id: "65e1bf8ff489f939d0b29cd1",
            amount: 1000,
            cashback: 10,
            created: "2024-03-01T17:14:15.83"
        }
    ]
}

export const statementResponse = {
    json: () => statementData,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const InitTransactionObject={
    transactionId: "65e49a905f85ef7f7fb33889",
    from: "user1",
    to: "user2",
    amount: 100,
    created: "2024-03-03T21:13:12.6626127"
}
export const InitTransactionResponse = {
    json: () => InitTransactionObject,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const confirmTransactionTimeout ={
    timeStamp: "2024-03-03T21:15:21.0790107",
    error: "Bad Request",
    message: "Transaction timeout",
    description: "uri=/transaction/confirm/65e49a905f85ef7f7fb33889"
}
export const confirmTransactionTimeoutResponse = {
    json: () => confirmTransactionTimeout,
    status: 400,
    ok: false,
    headers: {"Content-Type": "application/json"},
}
export const confirmTransactionSuccessResponse = {
    json: () => wallet,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}
export const cancelTransactionObject = {
    message: "Transaction cancelled"
}
export const cancelTransactionResponse = {
    json: () => cancelTransactionObject,
    status: 200,
    ok: true,
    headers: {"Content-Type": "application/json"},
}