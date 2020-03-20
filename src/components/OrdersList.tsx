import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native-web";
import { IOrder } from "../context/OrdersContext";
import { CurrenciesContext } from "../context/CurrenciesContext";
import { useSelectedCurrency } from "../hooks/useSelectedCurrency";

const height = Dimensions.get("window").height;

function OrderRow(props: { item: IOrder; onPress: (order: IOrder) => void }) {
  const { item, onPress } = props;
  const currency = useSelectedCurrency();
  const currenciesContext = useContext(CurrenciesContext);

  let image;
  if (item.type === "split") {
    image = item.image;
  } else {
    const payment = currenciesContext.payments.find(
      el => el.paymentId === item.paymentId
    );
    image =
      payment &&
      `https://one-staging.relayx.io/wallet/${payment.paymentCode}.png`;
  }

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        onPress(item);
      }}
    >
      <View style={[styles.singleOrder]}>
        {
          <Text style={styles.orderCurrency}>
            {currency.symbol} {currenciesContext.getPrice(item).toFixed(2)}
          </Text>
        }
        <Text
          style={
            item.type === "split"
              ? styles.splitOrderAmount
              : styles.buyOrderAmount
          }
        >
          {item.type === "split" ? `${item.min} - ${item.max}` : item.max}
          {"  "}
          {currenciesContext.currencies[item.symbolId]!.symbol}
        </Text>
        <View style={styles.orderServiceContainer}>
          <Image
            style={styles.orderServiceImage}
            resizeMode="contain"
            source={{ uri: image }}
            accessibilityLabel={item.service}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface Props {
  orders: IOrder[];
  onOrderPress: (order: IOrder) => void;
  loading: boolean;
  priceSort: boolean;
  serviceSort: boolean;
  amountSort: boolean;
  sortBy: string;
}

export default function OrdersList(props: Props) {
  const { orders, onOrderPress, loading } = props;
  const currency = useSelectedCurrency();
  const currenciesContext = useContext(CurrenciesContext);

  const sortedOrders = orders.sort((order: IOrder, nextOrder: IOrder) => {
    switch (props.sortBy) {
      case "service":
        const firstService = order.service;
        const secondService = nextOrder.service;
        return props.serviceSort
          ? firstService.localeCompare(secondService)
          : secondService.localeCompare(firstService);
      case "maxAmount":
        const firstMaxAmount = order.max;
        const secondMaxAmount = nextOrder.max;
        return props.amountSort
          ? firstMaxAmount - secondMaxAmount
          : secondMaxAmount - firstMaxAmount;
      case "price":
      default:
        const firstPrice = currenciesContext.getPrice(order);
        const secondPrice = currenciesContext.getPrice(nextOrder);

        return props.priceSort
          ? firstPrice - secondPrice
          : secondPrice - firstPrice;
    }
  });
  return (
    <>
      {sortedOrders && sortedOrders.length > 0 ? (
        <FlatList
          style={styles.ordersListContainer}
          data={sortedOrders}
          extraData={[props.sortBy]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OrderRow item={item} onPress={onOrderPress} />
          )}
        />
      ) : (
        <Text style={styles.empty}>
          {loading ? `Loading` : `No orders available for ${currency.symbol}`}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  orderServiceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  singleOrder: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(204, 220, 255, 0.6)",
    marginTop: 12,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12
  },
  orderCurrency: {
    color: "#2669FF",
    fontSize: 20,
    fontWeight: "500"
  },
  splitOrderAmount: {
    color: "#90949C",
    fontSize: 14,
    width: 180,
    marginRight: 20,
    textAlign: "right"
  },
  buyOrderAmount: {
    color: "orange",
    fontSize: 14,
    width: 180,
    marginRight: 20,
    textAlign: "right"
  },
  ordersListContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
    height: height - 220
  },
  orderServiceImage: {
    width: 40,
    height: 40
  },
  empty: {
    marginVertical: 50,
    alignSelf: "center"
  }
});
