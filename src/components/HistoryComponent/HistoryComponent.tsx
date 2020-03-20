import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native-web";

import { fetchTransactionList, getApiContext, Transaction } from "../../api";
import { useDidMount } from "../../hooks/useDidMount";
import MainWrapper from "../../wrappers/MainWrapper";
import { formatCalendar, parseDate } from "../../helpers/dateHelper";
import { CurrenciesContext } from "../../context/CurrenciesContext";

const HistoryComponent = () => {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const currencyContext = useContext(CurrenciesContext);

  useDidMount(() => {
    fetchTransactionList(getApiContext())
      .then(data => {
        setHistory(data.data.list);
        setLoading(false);
      })
      .catch(err => console.log(err));
  });

  const renderLogo = (serviceId: number) => {
    const payment = currencyContext.payments.filter(
      payment => payment.paymentId === serviceId
    );
    return (
      payment[0] &&
      `https://one-staging.relayx.io/wallet/${payment[0].paymentCode}.png`
    );
  };

  console.log(history);

  const renderTransactionStatus = (status: number) => {
    switch (status) {
      case 10000:
        return <Text style={styles.done}>Done</Text>;
      case -200:
        return <Text style={styles.canceled}>Canceled</Text>;
      default:
        return <Text style={styles.pending}>Pending</Text>;
    }
  };

  const renderTransactionList = () => {
    return (
      history &&
      history.map(el => (
        <View style={styles.singleTransaction}>
          <View style={styles.serviceContainer}>
            <img
              src={renderLogo(el.payMode)}
              alt=""
              style={{
                width: 34,
                height: 34,
                marginRight: 10
              }}
            />
            <Text style={styles.defaultFont}>{el.payMark}</Text>
          </View>
          {renderTransactionStatus(el.status)}
          <View>
            <Text style={styles.defaultFont}>
              {el.tranType === 1 ? "- " : "+ "}
              {el.localSymbolName} {el.localAmount}
            </Text>
            <Text style={styles.defaultFont}>
              {formatCalendar(parseDate(el.createdDate))}
            </Text>
          </View>
        </View>
      ))
    );
  };

  return (
    <MainWrapper isLoading={loading}>
      <View
        style={{
          paddingTop: 15
        }}
      >
        {renderTransactionList()}
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  singleTransaction: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(204, 220, 255, 0.6)",
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12
  },
  defaultFont: {
    fontFamily: "Roboto",
    fontSize: 14
  },
  serviceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  pending: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "lightgray"
  },
  done: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "lightgreen"
  },
  canceled: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "orange"
  }
});

export default HistoryComponent;
