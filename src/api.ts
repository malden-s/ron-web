export interface ApiContext {
  session?: string;
  host: string;
  sessionId: any;
}

type ServerResponse<T> = {
  code: number;
  data: T;
};

export interface Transaction {
  createdDate: string;
  localAmount: number;
  localSymbolName: string;
  localSymbolSign: string;
  networkFee: number;
  payMark: string;
  payMode: number;
  relayFee: number;
  serialNumber: string;
  status: number;
  tranType: number;
  tranFrom: number;
  txid: string;
}

export type PageInfo = {
  limit: number;
  // sortItem?: string;
  // sortType?: string;
  startIndex: number;
  totals: number;
};

type ListResponse<T> = {
  hasNextPage: boolean;
  list: T[];
  pageInfo: PageInfo;
};

export function getApiContext() {
  const sessionId = localStorage.getItem("userId");
  if (!sessionId) {
    throw new Error("No session");
  }
  return {
    host: "https://relayx.io",
    sessionId
  };
}

export async function GET<T>(
  context: ApiContext,
  url: string,
  repeat: boolean = true
): Promise<T> {
  const result = await fetch(`${context.host}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      devId: context.sessionId
    }
  });

  const data = await result.json();
  if (data.code === -800 && repeat) {
    return GET(context, url, false);
  }

  return data;
}

export async function POST<T, U>(
  context: ApiContext,
  url: string,
  params?: T,
  repeat: boolean = false
): Promise<U> {
  const result = await fetch(`${context.host}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      devId: context.sessionId
    },
    body:
      params === null
        ? void 0
        : typeof params === "string"
        ? params
        : JSON.stringify(params)
  });

  const data = await result.json();
  if (data.code === -800 && repeat) {
    return POST(context, url, params, repeat);
  }
  return data;
}

interface FetchSplitParams {
  payModeId?: number;
  currency?: string;
  pageNO?: number;
  pageSize?: number;
}

interface ICancelParams {
  orderNumber: string;
}

export interface Payment {
  paymentId: number;
  paymentName: string;
  paymentType: number;
  sign: string;
  status: number;
  symbolId: number;
  symbolName: string;
  paymentCode: string;
}

export interface IOrderInfo {
  bsvReceiveAmount: number;
  createdDate: string;
  createdTIme: string;
  expireTime: number;
  feeDesc: string;
  jsonInfo: string;
  operateType: number;
  payModeName: string;
  paymentType: number;
  receiveInfo: string;
  serialNumber: string;
  status: number;
  statusInfo: string;
  tranFrom: number;
  tranType: number;
  type: number;
  walletEarnAmount: number;
  walletRechargeAmount: number;
  walletSendAmount: number;
  walletSymbolSign: string;
}

interface SplitOrderDetails {
  bsvAvailAmount: number;
  feeAmount: number;
  feePer: number;
  orderId: string;
  status: number;
  walletAvailAmount: number;
  walletLogoURL: string;
  walletMaxSplitAmount: number;
  walletMinSplitAmount: number;
  walletPaymentId: number;
  walletPaymentName: string;
  walletSymbolId: number;
  walletSymbolName: string;
  walletSymbolSign: string;
}

interface Currency {
  sign: string;
  symbol: string;
  symbolFullname: string;
  symbolId: number;
  flagLogoUrl: string;
}

interface CurrencyRate {
  baseSymbolId: number;
  exchangeRate: string;
  quoteSymbolId: number;
}

interface FixedOrder {
  bsvReceiveAmount: number;
  expiredTime: number;
  operateType: number;
  paymentId: number;
  serialNumber: string;
  walletEarnAmount: number;
  walletRate: number;
  walletSendAmount: number;
  walletSymbolId: number;
  walletSymbolName: string;
  walletSymbolSign: string;
}

export function fetchCurrencies(context: ApiContext) {
  return GET<ServerResponse<Currency[]>>(
    context,
    "/v1/setting/support/currency/list/2"
  );
}

export function fetchCurrencyRates(context: ApiContext) {
  return GET<ServerResponse<CurrencyRate[]>>(
    context,
    `/v1/spot/currency/rates`
  );
}

export function fetchSplitOrders(
  context: ApiContext,
  params: FetchSplitParams
) {
  return POST<
    FetchSplitParams,
    ServerResponse<ListResponse<SplitOrderDetails>>
  >(context, "/v1/split/order/list", params);
}

export function orderAcceptRequest(context: ApiContext, params: any) {
  return POST<FetchSplitParams, any>(context, "/v1/split/order/accept", params);
}

export function handleAccept(context: ApiContext, orderId: string) {
  return GET<any>(context, `/v1/recharge/send/${orderId}`);
}

export function handleCancel(context: ApiContext, params: ICancelParams) {
  return POST<ICancelParams, any>(context, `/v1/recharge/cancel/`, params);
}

export function checkHandle(context: ApiContext, handle: string) {
  return GET(context, `/api/address/${handle}`);
}

export function fetchOrderInfo(context: ApiContext, orderId: string) {
  return GET<ServerResponse<IOrderInfo>>(context, `/v1/earn/get/${orderId}/2`);
}

export function fetchPayment(context: ApiContext) {
  return GET<ServerResponse<Payment[]>>(context, `/v1/setting/payment`);
}

export function fetchTransactionList(
  context: ApiContext
): Promise<ServerResponse<ListResponse<Transaction>>> {
  return POST(context, "/v1/spot/order/list", null);
}

export function fetchBuyOrders(context: ApiContext) {
  return POST<any, ServerResponse<ListResponse<FixedOrder>>>(
    context,
    `/v1/earn/order/list`,
    JSON.stringify({ status: 0, tranType: 1 })
  );
}

export function acceptFixedPriceOrder(
  context: ApiContext,
  orderId: string,
  receiveAddress: string
) {
  return GET<ServerResponse<any>>(
    context,
    `/v1/recharge/accept/${orderId}?receive_address=${receiveAddress}`
  );
}
