import React, { useState } from "react";
import { View } from "react-native-web";
import MainWrapper from "../../wrappers/MainWrapper";
import { useDidMount } from "../../hooks/useDidMount";
import {
  getApiContext,
  fetchOrderInfo,
  handleAccept,
  handleCancel,
  IOrderInfo
} from "../../api";
import { NavigationScreenProp } from "react-navigation";
import QRScreen from "./QRScreen";
import ErrorPage from "../ErrorPage";
import SuccessPage from "../SuccessScreen";

const TakeExactScan = (props: {
  navigation: NavigationScreenProp<{}, { orderId: string }>;
}) => {
  const { navigation } = props;
  const orderId = navigation.getParam("orderId");
  const [currentOrder, setCurrentOrder] = useState<IOrderInfo | null>(null);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  async function refreshOrder() {
    setLoading(true);
    const orderInfo = await fetchOrderInfo(getApiContext(), orderId);
    if (orderInfo.code < 0) {
      setError("Error fetching order");
    }

    setCurrentOrder(orderInfo.data);
    setLoading(false);
  }

  const onSent = async () => {
    setLoading(true);
    await handleAccept(getApiContext(), currentOrder!.serialNumber);
    refreshOrder();
  };

  const onCancel = async () => {
    setLoading(true);
    await handleCancel(getApiContext(), {
      orderNumber: currentOrder!.serialNumber
    });
    navigation.navigate("BuyOrders");
  };

  useDidMount(refreshOrder);

  if (!currentOrder) {
    return (
      <MainWrapper isLoading>
        <View />
      </MainWrapper>
    );
  }

  switch (currentOrder.status) {
    case 100:
      return (
        <QRScreen
          loading={loading}
          order={currentOrder}
          onSent={onSent}
          onCancel={onCancel}
          onRefresh={refreshOrder}
        />
      );
    case 200:
    case 10000:
      return <SuccessPage navigation={navigation} />;
    default:
      return <ErrorPage navigation={navigation} error={error} />;
  }
};

export default TakeExactScan;
