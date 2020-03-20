import React, { useContext, useState, useEffect } from "react";
import { Text } from "react-native-web";
import { NavigationScreenProp } from "react-navigation";

import MainWrapper from "../wrappers/MainWrapper";
import OrdersHeader from "../components/OrdersHeader";
import OrdersList from "../components/OrdersList";

import { OrdersContext } from "../context/OrdersContext";
import { CurrenciesContext } from "../context/CurrenciesContext";

interface BuyOrdersProps {
  navigation: NavigationScreenProp<{}, {}>;
}

export default function BuyOrders({ navigation }: BuyOrdersProps) {
  const ordersContext = useContext(OrdersContext);
  const currenciesContext = useContext(CurrenciesContext);
  const [priceSort, setPriceSort] = useState(true);
  const [amountSort, setAmountSort] = useState(true);
  const [serviceSort, setServiceSort] = useState(true);
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    if (currenciesContext.selectedCurrency) {
      ordersContext.loadOrders();
    }
    // eslint-disable-next-line
  }, [currenciesContext.selectedCurrency]);

  if (!currenciesContext.selectedCurrency) {
    return (
      <MainWrapper isLoading>
        <Text>Loading</Text>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <OrdersHeader
        setPriceSort={() => setPriceSort(!priceSort)}
        priceSort={priceSort}
        setAmountSort={() => setAmountSort(!amountSort)}
        amountSort={amountSort}
        setServiceSort={() => setServiceSort(!serviceSort)}
        serviceSort={serviceSort}
        setSortBy={(value: string) => setSortBy(value)}
      />
      <OrdersList
        serviceSort={serviceSort}
        amountSort={amountSort}
        sortBy={sortBy}
        onOrderPress={selectedOrder =>
          navigation.navigate("FillPaymentPage", {
            orderId: selectedOrder!.id
          })
        }
        orders={ordersContext.orders}
        loading={ordersContext.loading}
        priceSort={priceSort}
      />
    </MainWrapper>
  );
}
