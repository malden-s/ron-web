import React, { useReducer, createContext, ReactNode } from "react";
import {
  fetchSplitOrders,
  getApiContext,
  fetchPayment,
  fetchBuyOrders
} from "../api";

export interface ISplitOrder {
  type: "split";
  fee: number;
  id: string;
  image: string;
  max: number;
  min: number;
  paymentId: number;
  service: string;
  symbolId: number;
}

export interface IFixedOrder {
  type: "buy";
  id: string;
  max: number;
  min: number;
  paymentId: number;
  service: string;
  symbolId: number;
  receiveBSV: number;
  sendInBSV: number;
}

export type IOrder = ISplitOrder | IFixedOrder;

export interface IOrdersState {
  loading: boolean;
  orders: IOrder[];
}

interface IOrderContext extends IOrdersState {
  loadOrders: () => void;
}

const initialState: IOrdersState = {
  loading: false,
  orders: []
};

type OrdersAction = SetLoadingAction | SetOrdersAction;

interface SetLoadingAction {
  type: "SET_LOADING";
  loading: boolean;
}

interface SetOrdersAction {
  type: "SET_ORDERS";
  orders: IOrder[];
}

function reducer(state: IOrdersState, action: OrdersAction): IOrdersState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_ORDERS":
      return { ...state, orders: action.orders };
    default:
      throw new Error("Undefined context actions");
  }
}

export const OrdersContext = createContext<IOrderContext>({
  ...initialState,
  loadOrders: () => {}
});

export const OrdersContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setLoading(loading: boolean) {
    dispatch({ type: "SET_LOADING", loading });
  }

  async function loadOrders() {
    setLoading(true);

    try {
      const splitOrder = await fetchSplitOrders(getApiContext(), {});
      const splitOrders: ISplitOrder[] = splitOrder.data.list.map<ISplitOrder>(
        item => ({
          id: item.orderId,
          fee: item.feePer,
          service: item.walletPaymentName,
          image: item.walletLogoURL,
          min: item.walletMinSplitAmount,
          max: item.walletMaxSplitAmount,
          paymentId: item.walletPaymentId,
          symbolId: item.walletSymbolId,
          type: "split"
        })
      );

      const fixedOrder = await fetchBuyOrders(getApiContext());
      const fixedOrders: IFixedOrder[] = fixedOrder.data.list.map<IFixedOrder>(
        item => ({
          id: item.serialNumber,
          paymentId: item.paymentId,
          type: "buy",
          service: item.walletSymbolName,
          symbolId: item.walletSymbolId,
          max: item.walletSendAmount,
          min: item.walletSendAmount,
          receiveBSV: item.bsvReceiveAmount / 100000000,
          sendInBSV: item.walletSendAmount * item.walletRate
        })
      );

      const orders: IOrder[] = [...splitOrders, ...fixedOrders];

      fetchPayment(getApiContext());
      dispatch({
        type: "SET_ORDERS",
        orders
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <OrdersContext.Provider value={{ ...state, loadOrders }}>
      {props.children}
    </OrdersContext.Provider>
  );
};
