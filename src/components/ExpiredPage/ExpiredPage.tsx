import React, { FunctionComponent } from "react";
import { Image, View, Text } from "react-native-web";

import MainWrapper from "../../wrappers/MainWrapper";
import PrimaryButton from "../PrimaryButton";

const ExpiredPage: FunctionComponent<{ navigation: any }> = props => {
  return (
    <MainWrapper>
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 40,
          display: "flex",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 105,
            height: 105,
            borderWidth: 10,
            borderColor: "#F5A623",
            borderRadius: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 131
          }}
        >
          <Image
            style={{ width: 52, height: 52 }}
            source={require("../../icons/error.png")}
          />
        </View>
        <Text
          style={{
            marginTop: 46,
            fontSize: 18,
            color: "#555555",
            fontWeight: "bold",
            textDecorationLine: "underline"
          }}
        >
          Oops, this transaction has expired.
        </Text>
        <Text
          style={{
            marginTop: 33,
            fontSize: 15,
            color: "#555555"
          }}
        >
          To buy BSV, return to Home page
        </Text>
      </View>
      <PrimaryButton
        onPress={() => props.navigation.navigate("BuyOrders")}
        title={"OK"}
      />
    </MainWrapper>
  );
};

export default ExpiredPage;
