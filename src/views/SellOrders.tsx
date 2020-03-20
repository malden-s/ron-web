import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native-web";
import { Colors } from "../constants/colors";
import MainWrapper from "../wrappers/MainWrapper";
import AdvancedWithdraw from "../components/AdvancedSellOrderForm";

export default function SellOrders() {
  return (
    <MainWrapper>
      {/* <OrdersHeader /> */}
      <AdvancedWithdraw />
      <TouchableOpacity style={styles.btnSend}>
        <Text style={[styles.baseText, styles.buttonTitle]}>
          {"Preview order"}
        </Text>
      </TouchableOpacity>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    justifyContent: "flex-end"
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
  btnSend: {
    backgroundColor: Colors.LightPeriwinkle,
    justifyContent: "center",
    height: 48
    // ⬇️ this is invalid ⬇️
    // border: 0
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
  orderFilterText: {
    lineHeight: 14,
    color: Colors.LightGray,
    marginLeft: 32,
    fontSize: 12,
    marginRight: 100
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
  sortLogo: {
    height: 20,
    marginRight: 9,
    marginLeft: 10,
    width: 20
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
    width: 400,
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
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.PaleGrey,
    borderBottomWidth: 1,
    height: 55
  },
  orderDetailContainer: {
    // width: 294,
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
    height: 36,
    width: 30
  },
  currencyDropdown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 84,
    height: 32,
    backgroundColor: Colors.LightBLue,
    borderRadius: 4,
    marginRight: 8
  },
  subheaderLabel: {
    fontSize: 20,
    marginLeft: 16
  }
});
