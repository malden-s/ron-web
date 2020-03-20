import React, { useState } from "react";
import BuyOrders from "./views/BuyOrders";
import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "@react-navigation/core";
import FillPaymentPage from "./components/FillPaymentPage";
// import TakeExactFill from "./components/TakeExactFill";
import TakeExactScan from "./components/OrderView";
import SuccessScreen from "./components/SuccessScreen";
import { CurrenciesContextProvider } from "./context/CurrenciesContext";
import { OrdersContextProvider } from "./context/OrdersContext";
import ExpiredPage from "./components/ExpiredPage";
import randomBytes from "randombytes";
import ErrorPage from "./components/ErrorPage";
import { useDidMount } from "./hooks/useDidMount";
import HistoryComponent from "./components/HistoryComponent";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useDidMount(() => {
    if (localStorage.getItem("userId")) {
      setIsLoading(false);
      return;
    }
    randomBytes(16, (err: Error | null, userId: Buffer) => {
      if (err) throw err;
      localStorage.setItem("userId", userId.toString("hex"));
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return null;
  }

  return (
    <CurrenciesContextProvider>
      <OrdersContextProvider>
        <AppContainer />
      </OrdersContextProvider>
    </CurrenciesContextProvider>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  BuyOrders: { screen: BuyOrders, path: "" },
  TakeExactScan: { screen: TakeExactScan, path: "view/:orderId" },
  // TakeExactFill: { screen: TakeExactFill },
  FillPaymentPage: { screen: FillPaymentPage, path: "take/:orderId" },
  SuccessScreen: { screen: SuccessScreen },
  ExpiredPage: { screen: ExpiredPage },
  ErrorPage: { screen: ErrorPage },
  HistoryComponent: { screen: HistoryComponent, path: "history" }
});

const AppContainer = createBrowserApp(AppSwitchNavigator);

export default App;
