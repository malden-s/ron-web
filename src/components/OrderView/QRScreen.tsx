import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native-web";
import MainWrapper from "../../wrappers/MainWrapper";
import CountdownMessage from "../CountdownMessage";
import Button from "../Button";
import { IOrderInfo } from "../../api";
import QRCode from "qrcode";

interface Props {
  loading: boolean;
  order: IOrderInfo;
  onSent: () => void;
  onCancel: () => void;
  onRefresh: () => void;
}

export default function QRScreen(props: Props) {
  const { loading, order, onSent, onRefresh, onCancel } = props;

  const [qrcodeSVG, setQRCodeSVG] = useState("");

  useEffect(() => {
    QRCode.toString(order.jsonInfo, function(err, string) {
      if (err) throw err;
      setQRCodeSVG(string);
    });
  });

  return (
    <MainWrapper isLoading={loading}>
      <View>
        <ScrollView
          style={{
            marginLeft: 16,
            marginRight: 16,
            height: 539
          }}
        >
          {order && (
            <Text
              style={{
                fontSize: 22,
                color: "#2A2A2E",
                fontFamily: "Roboto",
                marginTop: 25
              }}
            >
              Scan and Pay with {order.payModeName}
            </Text>
          )}
          <div
            style={{
              height: 250,
              margin: "0 20px",
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
              marginTop: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px 10px",
              borderRadius: 6
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
            {order && (
              <Text
                style={{
                  color: "#333333",
                  fontSize: 22,
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  marginTop: 8
                }}
              >
                {order.walletSymbolSign} {order.walletSendAmount}
              </Text>
            )}
            <View
              style={{
                height: 1,
                width: 220,
                backgroundColor: "#F2F2F2",
                marginTop: 15
              }}
            />
            <View
              style={{
                height: 220,
                width: 200,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: qrcodeSVG }}></div>
            </View>
          </div>
          {
            <View
              style={{
                marginTop: 20,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <Text
                style={{
                  marginTop: 6,
                  color: "#828282",
                  fontSize: 14,
                  fontFamily: "Roboto",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                {"You will receive "}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  color: "#828282",
                  fontSize: 14,
                  fontFamily: "Roboto",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <Text
                  style={{
                    marginTop: 8,
                    color: "#828282",
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {order.bsvReceiveAmount}
                </Text>
                {" BSV"}
              </Text>
            </View>
          }
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 16,
              marginTop: 8
            }}
          >
            {
              <Text
                style={{
                  color: "#828282",
                  fontSize: 14,
                  fontFamily: "Roboto"
                }}
              >
                Order ID:{" "}
                <Text style={{ color: "#2669FF" }}>{order.serialNumber}</Text>
              </Text>
            }
            <Text
              style={{
                color: "#2669FF",
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "Roboto"
              }}
            >
              support@relayx.io
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Button title={"Cancel"} onPress={onCancel} />
          <Button
            title={
              <>
                Sent{" "}
                {
                  <CountdownMessage
                    expireTime={order.expireTime}
                    onTimeout={onRefresh}
                  />
                }
              </>
            }
            theme={"clearBlue"}
            onPress={onSent}
          />
        </View>
      </View>
    </MainWrapper>
  );
}
