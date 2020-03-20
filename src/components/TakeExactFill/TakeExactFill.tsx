import React, { FunctionComponent } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native-web";
import { NavigationScreenProp } from "react-navigation";

import MainWrapper from "../../wrappers/MainWrapper";
import { Colors } from "../../constants/colors";
import PrimaryButton from "../PrimaryButton";

interface TakeExactFillProps {
  navigation: NavigationScreenProp<{}, {}>;
}

const TakeExactFill: FunctionComponent<TakeExactFillProps> = ({
  navigation
}) => {
  return (
    <MainWrapper>
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
          maxHeight: "85vh",
          overflow: "scroll"
        }}
      >
        <View
          style={{
            marginTop: 25,
            width: 400
          }}
        >
          <Text
            style={{
              fontSize: 22,
              lineHeight: 26,
              letterSpacing: 0.4,
              fontFamily: "Roboto"
            }}
          >
            {"Enter Details"}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("BuyOrders")}>
          <Text
            style={{
              color: Colors.ClearBlue,
              marginBottom: 29,
              marginTop: 36
            }}
          >
            {"< Back to list"}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#90949C",
            fontFamily: "Roboto",
            fontSize: 14
          }}
        >
          Recipient
        </Text>
        <View
          style={{
            height: 35,
            borderBottomColor: "#D7D7DB",
            borderBottomWidth: 2,
            display: "flex",
            marginBottom: 31,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../icons/pencil.png")}
            style={{
              width: 16,
              height: 16,
              marginBottom: 6
            }}
          />
          <TextInput
            style={{ height: 31, width: "85%" }}
            placeholder={"1handle or paymail"}
            placeholderTextColor="#D7D7DB"
          />
          <Image
            resizeMode="contain"
            source={require("../../icons/file.png")}
            style={{
              width: 16,
              height: 16,
              marginBottom: 6
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 22,
            color: "#BDBDBD",
            fontFamily: "Roboto"
          }}
        >
          Scan with WeChat Pay
        </Text>
        <div
          style={{
            width: 172,
            height: 258,
            margin: "0 auto",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            padding: "16px 24px",
            opacity: 0.5
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Roboto",
              color: "#90949C"
            }}
          >
            Send
          </Text>
          <Text
            style={{
              color: " #333333",
              fontSize: 22,
              fontFamily: "Roboto",
              fontWeight: "500"
            }}
          >
            CNY 25.0
          </Text>
          <Text
            style={{
              color: "#828282",
              fontSize: 14,
              fontFamily: "Roboto"
            }}
          >
            Buy at CHY 965.4
          </Text>
          <View
            style={{
              height: 160,
              width: 160,
              marginTop: 25,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#F2F2F2"
            }}
          ></View>
        </div>
        <Text
          style={{
            marginTop: 15,
            marginLeft: "auto",
            marginRight: "auto",
            color: "#828282",
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "Roboto",
            opacity: 0.5
          }}
        >
          Recepient will receive CNY 23.4
        </Text>
        <Text
          style={{
            marginTop: 16,
            marginLeft: "auto",
            marginRight: "auto",
            color: "#2669FF",
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "Roboto",
            opacity: 0.5,
            marginBottom: 48
          }}
        >
          Need help?
        </Text>
      </View>
      <PrimaryButton title={"Continue"} onPress={() => {}} />
    </MainWrapper>
  );
};

export default TakeExactFill;
