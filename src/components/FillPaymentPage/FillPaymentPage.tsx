import React, { useState, useContext } from "react";
import { Text, View } from "react-native-web";

import MainWrapper from "../../wrappers/MainWrapper";
import { CurrenciesContext } from "../../context/CurrenciesContext";
import { OrdersContext, IOrder } from "../../context/OrdersContext";
import {
  getApiContext,
  orderAcceptRequest,
  checkHandle,
  acceptFixedPriceOrder
} from "../../api";
import Input from "../Input";
import { NavigationScreenProp } from "react-navigation";
import { useDidMount } from "../../hooks/useDidMount";
import Link from "../Link";
import PrimaryButton from "../PrimaryButton";
import { isBrowserNotChrome } from "../../helpers/browserCheck";

function Loading() {
  return (
    <MainWrapper isLoading>
      <Text>Loading</Text>
    </MainWrapper>
  );
}

const TakeExact = (props: {
  navigation: NavigationScreenProp<{}, { orderId: string }>;
}) => {
  const [address, setAddress] = useState("");
  const [send, setSend] = useState("");
  const [loading, setLoading] = useState(true);
  const currenciesContext = useContext(CurrenciesContext);
  const orderContext = useContext(OrdersContext);

  const currentOrder = orderContext.orders.find(
    order => order.id === props.navigation.state.params!.orderId
  );

  useDidMount(async () => {
    if (!currentOrder) {
      await orderContext.loadOrders();
      setLoading(false);
      return;
    }
    setLoading(false);
    if (currentOrder.type === "buy") {
      return setSend(currentOrder.max.toString());
    }
  });

  const handleConfirm = async (currentOrder: IOrder) => {
    setLoading(true);
    const isHandleExist: any = await checkHandle(getApiContext(), address);

    if (isHandleExist.code !== -7 && isHandleExist.code !== undefined) {
      const orderAccept =
        currentOrder.type === "split"
          ? await orderAcceptRequest(getApiContext(), {
              amount: send,
              paymodeId: currentOrder.paymentId,
              orderId: currentOrder.id,
              address: address
            })
          : await acceptFixedPriceOrder(
              getApiContext(),
              currentOrder.id,
              address
            );
      setrecipientError(0);
      if (orderAccept.code === 0 && orderAccept.data)
        props.navigation.navigate(`TakeExactScan`, {
          orderId:
            currentOrder.type === "split" ? orderAccept.data : currentOrder.id
        });
      else {
        props.navigation.navigate("ErrorPage");
      }
    } else {
      setrecipientError(1);
    }
  };

  const [recipientError, setrecipientError] = useState(0);

  const sendAmount = parseFloat(send);

  if (!currentOrder || !currenciesContext.selectedCurrency) {
    return <Loading />;
  }

  const orderCurrency = currenciesContext.currencies[currentOrder.symbolId];

  if (!orderCurrency) {
    return <Loading />;
  }

  let sendError = "";
  if (sendAmount < currentOrder.min) {
    sendError = "Amount too small";
  } else if (sendAmount > currentOrder.max) {
    sendError = "Amount too large";
  } else {
    sendError = "";
  }

  const changeWithValidation = (value: string) => {
    return value.match(/^[0-9]*\.?[0-9]*$/) && setSend(value);
  };

  const handleChangeByType = () => {
    return currentOrder.type === "split" ? changeWithValidation : () => {};
  };

  return (
    <MainWrapper isLoading={loading}>
      <View
        style={{
          marginLeft: 16,
          marginRight: 16
        }}
      >
        <View style={{ marginBottom: 29, marginTop: 36, flexDirection: "row" }}>
          <Link onPress={() => props.navigation.navigate("BuyOrders")}>
            {"< Back to list"}
          </Link>
        </View>
        <Input
          label={<Text>Amount</Text>}
          inputValue={send}
          changeInputValue={handleChangeByType()}
          keyboard={isBrowserNotChrome() ? "default" : "numeric"}
          footer={orderCurrency.symbol}
          placeholder={`[Enter amount between ${orderCurrency.sign} ${currentOrder.min} - ${currentOrder.max}]`}
          validationError={sendError}
        />

        <Input
          label={<Text>Destination</Text>}
          inputValue={address}
          changeInputValue={setAddress}
          placeholder={"[Enter 1handle , paymail, or BSV address]"}
          validationError={recipientError ? "Recipient not found" : ""}
        />
      </View>
      {currentOrder && (
        <PrimaryButton
          disabled={loading || !!sendError || !sendAmount || !address}
          onPress={() => handleConfirm(currentOrder)}
          title={"Proceed to Payment"}
        />
      )}
    </MainWrapper>
  );
};

export default TakeExact;
