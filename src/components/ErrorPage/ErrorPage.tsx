import React, { FunctionComponent } from "react";
import { Image, View, Text } from "react-native-web";

import MainWrapper from "../../wrappers/MainWrapper";
import PrimaryButton from "../PrimaryButton";

const ErrorPage: FunctionComponent<{
  navigation: any;
  error?: string;
}> = props => {
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
            textDecorationLine: "underline",
            textAlign: "center"
          }}
        >
          {props.error || "Oops, there is transaction error while processing."}
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
        title={"OK"}
        onPress={() => props.navigation.navigate("BuyOrders")}
      />
    </MainWrapper>
  );
};

export default ErrorPage;
