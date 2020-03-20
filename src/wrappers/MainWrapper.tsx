import React, { useContext } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native-web";

import Loader from "../components/Loader";
import { Colors } from "../constants/colors";
import { CurrenciesContext } from "../context/CurrenciesContext";
import { useDidMount } from "../hooks/useDidMount";

interface IProps {
  children: any;
  isLoading?: boolean;
}

const MAX_WIDTH = 500;

const MainWrapper = (props: IProps) => {
  const currenciesContext = useContext(CurrenciesContext);

  const price = currenciesContext.selectedCurrency
    ? 1 / currenciesContext.rates[currenciesContext.selectedCurrency]
    : 0;

  useDidMount(() => {
    currenciesContext.load();
  });

  return (
    <SafeAreaView style={styles.container}>
      {props.isLoading ? (
        <Loader />
      ) : (
        <Text style={styles.baseText}>
          <View style={styles.mainWrapper}>
            <View style={styles.headerContainer}>
              <View
                style={{
                  maxWidth: MAX_WIDTH,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1
                }}
              >
                <TouchableOpacity
                  accessibilityRole="link"
                  {...({ href: "/" } as any)}
                  onPress={() => (window.location.href = "/")}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../icons/Logo.svg")}
                    style={styles.relayLogo}
                  />
                </TouchableOpacity>
                {!!price && (
                  <Text style={styles.currencyInfo}>
                    {`BSV price: ${
                      currenciesContext.selectedCurrency
                        ? currenciesContext.currencies[
                            currenciesContext.selectedCurrency
                          ]!.sign
                        : ""
                    } ${price.toFixed(2)}`}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.childContainer}>
              <View style={{ maxWidth: MAX_WIDTH, flex: 1 }}>
                {props.children}
              </View>
            </View>
          </View>
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, marginBottom: 10 },
  childContainer: {
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 0
  },
  currencyInfo: {
    minWidth: 115,
    height: 16,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "right",
    color: "white",
    marginLeft: 70,
    marginRight: 16
  },
  relayLogo: {
    width: 72,
    height: 20,
    marginRight: 9,
    marginLeft: 10
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  baseText: {
    display: "flex",
    fontFamily: "Roboto"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.ClearBlue,
    height: 60,
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)"
  }
});

export default MainWrapper;
