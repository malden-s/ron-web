import React, { FunctionComponent, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native-web";

import { Colors } from "../constants/colors";
import CurrencyDropdown from "./CurrencyDropdown";
import { CurrenciesContext, ICurrency } from "../context/CurrenciesContext";
import { useSelectedCurrency } from "../hooks/useSelectedCurrency";
import SortLogo from "./SortLogo";

interface OrdersHeaderProps {
  setPriceSort: () => void;
  setAmountSort: () => void;
  setServiceSort: () => void;
  setSortBy: (value: string) => void;
  priceSort: boolean;
  amountSort: boolean;
  serviceSort: boolean;
}

interface IOrderBuy {
  setPriceSort: () => void;
  setAmountSort: () => void;
  setServiceSort: () => void;
  setSortBy: (value: string) => void;
  priceSort: boolean;
  amountSort: boolean;
  serviceSort: boolean;
}

const OrdersHeaderBuy: FunctionComponent<IOrderBuy> = props => {
  const currenciesContext = useContext(CurrenciesContext);
  const selectedCurrency = useSelectedCurrency();

  const onCurrencyChange = (currency: ICurrency) => {
    currenciesContext.selectCurrency(currency.symbolId);
  };

  const togglePirceSort = () => {
    props.setSortBy("price");
    props.setPriceSort();
  };

  const toggleAmountSort = () => {
    props.setSortBy("maxAmount");
    props.setAmountSort();
  };

  const toggleServiceSort = () => {
    props.setSortBy("service");
    props.setServiceSort();
  };

  return (
    <>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheaderLabel}>{"Buy BSV"}</Text>
        <View style={styles.currencyDropdown}>
          {currenciesContext.currencies &&
            currenciesContext.selectedCurrency && (
              <CurrencyDropdown
                selectedCurrency={selectedCurrency}
                currencies={currenciesContext.selectableCurrencies.map(
                  c => currenciesContext.currencies[c]
                )}
                onCurrencyChange={onCurrencyChange}
              />
            )}
        </View>
      </View>
      <View style={styles.orderDetailContainer}>
        <TouchableOpacity
          style={styles.orderDetailElement}
          onPress={togglePirceSort}
        >
          <Text style={styles.orderLabelText}>{"Price"}</Text>
          <SortLogo rotate={props.priceSort} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderDetailElementAmount}
          onPress={toggleAmountSort}
        >
          <Text style={styles.orderLabelText}>{"Amount"}</Text>
          <SortLogo rotate={props.amountSort} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={toggleServiceSort}
        >
          <Text style={styles.filterLabelText}>Method</Text>
          <SortLogo rotate={props.serviceSort} />
        </TouchableOpacity>
      </View>
    </>
  );
};

// const OrdersHeaderSell: FunctionComponent = () => {
//   return (
//     <>
//       <View style={styles.subheaderContainer}>
//         <Text style={styles.subheaderLabel}>{"Create sell order"}</Text>
//         <Text style={styles.otherText}>{"Buy BSV"}</Text>
//       </View>
//       <View style={styles.orderDetailContainer}>
//         <Text style={styles.instruction}>
//           {"Please fill in below information to create your order"}
//         </Text>
//       </View>
//     </>
//   );
// };

const OrdersHeader: FunctionComponent<OrdersHeaderProps> = ({
  setPriceSort,
  setSortBy,
  setAmountSort,
  setServiceSort,
  priceSort,
  amountSort,
  serviceSort
}) => {
  return (
    <OrdersHeaderBuy
      setPriceSort={setPriceSort}
      setAmountSort={setAmountSort}
      setServiceSort={setServiceSort}
      setSortBy={setSortBy}
      serviceSort={serviceSort}
      amountSort={amountSort}
      priceSort={priceSort}
    />
  );
};

export default OrdersHeader;

const styles = StyleSheet.create({
  scrollContent: {
    justifyContent: "flex-end"
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    borderRightWidth: 5,
    borderRightColor: "transparent",
    borderTopWidth: 6,
    borderTopColor: "#BDBDBD",
    marginRight: 80,
    marginLeft: 19
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 100,
    height: 36
  },
  activeArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    borderRightWidth: 5,
    borderRightColor: "transparent",
    borderTopWidth: 6,
    borderTopColor: "#2669FF",
    marginRight: 80,
    marginLeft: 19
  },
  activeFilterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 137,
    height: 36,
    backgroundColor: "#CCDCFF"
  },
  sectionContent: {
    padding: 15,
    backgroundColor: Colors.PaleGrey
  },
  bsvSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    borderBottomColor: Colors.PaleGrey,
    borderBottomWidth: 1,
    height: 56
  },
  singleOrder: {
    display: "flex",
    flexDirection: "row",
    width: 366,
    height: 48,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(204, 220, 255, 0.6)",
    marginTop: 12,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderCurrency: {
    marginLeft: 12,
    color: "#2669FF",
    fontSize: 20,
    fontWeight: "500"
  },
  orderAmount: {
    color: "#90949C",
    fontSize: 14
  },
  orderService: {
    color: "#2A2A2E",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
    marginRight: 12
  },
  btnSend: {
    backgroundColor: Colors.LightPeriwinkle,
    justifyContent: "center",
    height: 48
  },
  currencyInfo: {
    width: 115,
    height: 16,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "right",
    color: "white",
    marginLeft: 70
  },
  otherText: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.LightGray,
    marginRight: 16
  },
  orderLabelText: {
    lineHeight: 14,
    color: Colors.LightGray,
    marginLeft: 32,
    fontSize: 12
  },
  filterLabelText: {
    lineHeight: 14,
    color: Colors.LightGray,
    fontSize: 12
  },
  instruction: {
    lineHeight: 14,
    color: Colors.LightGray,
    marginLeft: 16,
    fontSize: 12,
    marginRight: 100
  },
  orderFilterText: {
    lineHeight: 14,
    color: Colors.LightGray,
    marginLeft: 32,
    fontSize: 12
  },
  ActiveOrderFilterText: {
    lineHeight: 14,
    color: "#2669FF",
    marginLeft: 32,
    fontSize: 12
  },
  currencyLabel: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
    fontWeight: "500"
  },
  relayLogo: {
    width: 72,
    height: 20,
    marginRight: 9,
    marginLeft: 10
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    minWidth: 375,
    position: "absolute",
    left: "50%",
    marginLeft: -200,
    borderWidth: 1,
    borderStyle: "solid"
  },
  baseText: {
    fontFamily: "Roboto"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.ClearBlue,
    height: 60,
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)"
  },
  subheaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.PaleGrey,
    borderBottomWidth: 1,
    height: 55,
    minWidth: 375,
    zIndex: 1
  },
  orderDetailContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.PaleGrey,
    borderBottomWidth: 1
  },
  orderDetailElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 36
  },
  orderDetailElementAmount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 36,
    width: 150
  },
  orderListContainer: {
    height: 446,
    marginLeft: 16,
    marginRight: 16
  },
  currencyDropdown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 84,
    height: 32,
    backgroundColor: "#F2F2F2",
    borderRadius: 4,
    marginRight: 8,
    marginLeft: 14
  },

  subheaderLabel: {
    fontSize: 20,
    marginLeft: 16
  }
});
