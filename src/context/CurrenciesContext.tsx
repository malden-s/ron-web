import React, { useReducer, createContext, FC } from "react";
import {
  fetchCurrencies,
  fetchCurrencyRates,
  getApiContext,
  fetchPayment,
  Payment
} from "../api";
import { IOrder } from "./OrdersContext";

export interface ICurrency {
  sign: string;
  symbol: string;
  symbolFullname: string;
  symbolId: number;
}

export interface ICurrenciesState {
  // things that should be in dropdown
  selectableCurrencies: number[];
  currencies: { [key: number]: ICurrency };
  selectedCurrency: number | null;
  rates: { [symbolId: number]: number };
  payments: Payment[];
}

interface ICurrenciesContext extends ICurrenciesState {
  load: () => void;
  selectCurrency: (currency: number) => void;
  getPrice(order: IOrder): number;
}

type CurrenciesAction =
  | SetCurrenciesAction
  | SetSelectedCurrenciesAction
  | SetPaymentsAction;

interface SetCurrenciesAction {
  type: "SET_CURRENCIES";
  currencies: { [key: number]: ICurrency };
  rates: { [symbolId: number]: number };
  selectableCurrencies: number[];
}

interface SetSelectedCurrenciesAction {
  type: "SET_SELECTED_CURRENCY";
  selectedCurrency: number;
}

interface SetPaymentsAction {
  type: "SET_PAYMENTS";
  payments: Payment[];
}

const initialState: ICurrenciesState = {
  selectableCurrencies: [],
  currencies: {},
  selectedCurrency: null,
  rates: {},
  payments: []
};

function reducer(
  state: ICurrenciesState,
  action: CurrenciesAction
): ICurrenciesState {
  switch (action.type) {
    case "SET_CURRENCIES":
      let selectedCurrency = state.selectedCurrency;
      if (!selectedCurrency) {
        selectedCurrency = (
          Object.values(action.currencies).find(c => c.symbol === "USD") ||
          Object.values(action.currencies)[0]
        ).symbolId;
      }
      return {
        ...state,
        currencies: action.currencies,
        rates: action.rates,
        selectedCurrency,
        selectableCurrencies: action.selectableCurrencies
      };
    case "SET_SELECTED_CURRENCY":
      return { ...state, selectedCurrency: action.selectedCurrency };
    case "SET_PAYMENTS":
      return { ...state, payments: action.payments };
    default:
      throw new Error("Undefined context actions");
  }
}

export const CurrenciesContext = createContext<ICurrenciesContext>({
  ...initialState,
  load: () => {},
  selectCurrency: (_currency: number) => {},
  getPrice: (_order: IOrder) => 0
});

export const CurrenciesContextProvider: FC<{}> = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function load() {
    const [currencies, payments, ratesResponse] = await Promise.all([
      fetchCurrencies(getApiContext()),
      fetchPayment(getApiContext()),
      fetchCurrencyRates(getApiContext())
    ]);

    const rates: { [key: number]: number } = {};
    for (const rate of ratesResponse.data) {
      rates[rate.baseSymbolId] = +rate.exchangeRate;
    }
    const currenciesMap: { [key: number]: ICurrency } = {};

    payments.data.forEach(p => {
      currenciesMap[p.symbolId] = {
        sign: p.sign,
        symbol: p.symbolName,
        symbolFullname: p.symbolName,
        symbolId: p.symbolId
      };
    });

    currencies.data.forEach(c => {
      currenciesMap[c.symbolId] = c;
    });

    dispatch({
      type: "SET_CURRENCIES",
      selectableCurrencies: currencies.data.map(c => c.symbolId),
      currencies: currenciesMap,
      rates: rates
    });

    dispatch({
      type: "SET_PAYMENTS",
      payments: payments.data
    });
  }

  async function selectCurrency(selectedCurrency: number) {
    dispatch({
      type: "SET_SELECTED_CURRENCY",
      selectedCurrency
    });
  }

  function getPrice(order: IOrder): number {
    if (state.selectedCurrency === null) {
      throw new Error("No currency");
    }
    const price = 1 / state.rates[state.selectedCurrency];
    if (order.type === "split") {
      return price + price * (order.fee / 100);
    }
    console.log(order.receiveBSV, price, order.sendInBSV);

    return (order.receiveBSV * price) / order.sendInBSV;
  }

  return (
    <CurrenciesContext.Provider
      value={{ ...state, load, selectCurrency, getPrice }}
    >
      {props.children}
    </CurrenciesContext.Provider>
  );
};
