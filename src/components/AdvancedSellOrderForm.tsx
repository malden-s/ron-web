import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native-web";

import Button from "./Button";
import BottomPrimaryButton from "./PrimaryButton";
import { Colors } from "../constants/colors";
import {
  AdvancedInputType,
  AdvancedInputSections
} from "../constants/withdraw";
import { useDidMount } from "../hooks/useDidMount";

/**
 * @todo use i18n-js
 */
const I18n = {
  t(key: string, extra?: any) {
    return key;
  }
};

const util = {
  showAlert(alert: string) {
    window.alert(alert);
  }
};

function Loader(props: { visible: boolean }) {
  return props.visible ? <Text>Loading</Text> : null;
}

interface Section {
  id: number;
  label: string;
}

interface Limits {
  bsvAmountLimitMax: string;
  bsvAmountLimitMin: string;
  feeMinAmountLimitMax: number | null;
  feeMinAmountLimitMin: number | null;
  feePCTLimitMax: number | null;
  feePCTLimitMin: number | null;
}

export default function AdvancedWithdrawScreen() {
  const { balanceSAT, currencyExchangeRatePay /*, privateKey, node*/ } = {
    balanceSAT: 100,
    currencyExchangeRatePay: 1.1
    // privateKey: "foo",
    // node: "foo"
  };
  const props = {
    orderId: void 0,
    values: ["", "", "", "", ""],
    linkedInfo: "123",
    payment: {
      paymentId: 777,
      sign: "US$",
      paymentName: "Test Payment"
    }
  };
  //  useSelector(
  //   (state: AppState) => {
  //     const { main, currency } = state;
  //     return {
  //       balanceSAT: state.wallet.satoshi,
  //       currencyExchangeRatePay: currency[props.payment.symbolId!] || 1,
  //       localSymbolSign: main.localSymbolSign,
  //       privateKey: state.wallet.privateKey!,
  //       node: state.settingReducer.node
  //     };
  //   }
  // );
  const updateExchangeRates = () => {
    // implement me
  };
  // const scrollView = useRef(null as null | ScrollView);

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(props.values);
  const [advancedInputType, setAdvancedInputType] = useState(-1);
  const [orderId, setOrderId] = useState(props.orderId || "");
  const [limits, setLimits] = useState({
    bsvAmountLimitMax: "",
    bsvAmountLimitMin: "",
    feeMinAmountLimitMax: null,
    feeMinAmountLimitMin: null,
    feePCTLimitMax: null,
    feePCTLimitMin: null
  } as Limits);

  useDidMount(async () => {
    checkExistingOrders();
    await updateExchangeRates();
    setLoading(false);
  });

  async function checkExistingOrders() {
    // try {
    //   const res = await api.fetchSplitOrderPre(props.payment.paymentId);
    //   setLimits({
    //     bsvAmountLimitMax: res.bsvAmountLimitMax,
    //     bsvAmountLimitMin: res.bsvAmountLimitMin,
    //     feeMinAmountLimitMax: res.feeMinAmountLimitMax,
    //     feeMinAmountLimitMin: res.feeMinAmountLimitMin,
    //     feePCTLimitMax: res.feePCTLimitMax,
    //     feePCTLimitMin: res.feePCTLimitMin
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  }

  // 发送BSV
  async function onConfirmBSV() {
    const {
      bsvAmountLimitMax,
      bsvAmountLimitMin,
      feeMinAmountLimitMax,
      feeMinAmountLimitMin,
      feePCTLimitMax,
      feePCTLimitMin
    } = limits;
    const { linkedInfo, payment } = props;
    console.log(values);
    console.log(advancedInputType);
    const amountSAT = Number(values[0]) * 100000000;

    if (Number(values[0]) > Number(bsvAmountLimitMax)) {
      util.showAlert(
        I18n.t("splitOrderMaxLimitMessage", { bsvAmountLimitMax })
      );
      return;
    }
    if (Number(values[0]) < Number(bsvAmountLimitMin)) {
      util.showAlert(
        I18n.t("splitOrderMinLimitMessage", { bsvAmountLimitMax })
      );
      return;
    }
    if (amountSAT > balanceSAT) {
      util.showAlert(I18n.t("lowBalanceMessage"));
      return;
    }
    if (Number(values[2]) < Number(values[1])) {
      util.showAlert(I18n.t("splitOrderMinMaxErrorMessage"));
      return;
    }
    if (Number(values[3]) > Number(feePCTLimitMax)) {
      util.showAlert(I18n.t("splitOrderMaxPercentMessage", { feePCTLimitMax }));
      return;
    }
    if (Number(values[3]) < Number(feePCTLimitMin)) {
      util.showAlert(I18n.t("splitOrderMinPercentMessage", { feePCTLimitMax }));
      return;
    }
    if (Number(values[4]) > Number(feeMinAmountLimitMax)) {
      util.showAlert(
        I18n.t("splitOrderMaxFeeMessage", { feeMinAmountLimitMax })
      );
      return;
    }
    if (Number(values[4]) < Number(feeMinAmountLimitMin)) {
      util.showAlert(
        I18n.t("splitOrderMinFeeMessage", { feeMinAmountLimitMin })
      );
      return;
    }

    const params = {
      bsvAmount: values[0],
      feeMinAmount: values[4],
      feePct: values[3],
      receiptInfo: linkedInfo,
      walletLockRate: currencyExchangeRatePay!,
      walletMaxSplitAmount: values[2],
      walletMinSplitAmount: values[1],
      walletPaymentId: props.payment.paymentId
    };
    console.log(params);
    try {
      // 阻止多次请求
      if (loading) {
        return;
      }
      // setLoading(true);
      // const orderRes = await api.createSplitOrder(params);

      // const config: DatapayOptions = {
      //   data: [
      //     "1HyHXtYWyGePrHVisnNdS931Vt6CqouUyZ",
      //     "relayx.io",
      //     "",
      //     "0",
      //     JSON.stringify({
      //       channel: payment.paymentId,
      //       amount: amountSAT,
      //       currency: payment.symbolName,
      //       symbol: payment.sign
      //     })
      //   ],
      //   pay: {
      //     key: privateKey,
      //     rpc: node,
      //     to: [
      //       {
      //         address: orderRes.address,
      //         value: Math.ceil(Number(amountSAT))
      //       }
      //     ]
      //   }
      // };
      // console.log(config, orderRes);

      // const hash = await datasend(config);
      // await api.splitOrderInit(orderRes.orderId, hash);
      // setOrderId(orderRes.orderId);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  // 取消订单
  async function onCancelAdvanced() {
    try {
      // const res = await api.splitOrderCancel(orderId);
      // console.log(res);
      // props.navigation.navigate("main");
    } catch (e) {
      console.log(e);
    }
  }

  // 输入amount
  function handledClick(number: string) {
    const newValues = [...values];
    let value = newValues[advancedInputType];

    value === "0" ? (value = number) : (value = value + number);
    if (value === ".") {
      value = "0" + number;
    }
    if (value.split(".").length - 1 > 1) {
      value = value.slice(0, value.length - 1);
    }

    newValues[advancedInputType] = value;
    setValues(newValues);
  }

  // 删除amount
  function pressBackSpace() {
    const newValues = [...values];
    let value = newValues[advancedInputType];

    value = value.slice(0, value.length - 1);

    newValues[advancedInputType] = value;
    setValues(newValues);
  }

  const handleSectionPress = (sectionId: number) => () => {
    if (advancedInputType === sectionId) {
      setAdvancedInputType(-1);

      //   delay(() => {
      //     scrollView.current!.scrollTo({ y: 0, animated: true });
      //   }, 100);
    } else {
      setAdvancedInputType(sectionId);

      //   delay(() => {
      //     scrollView.current!.scrollTo({
      //       y: sectionId * 60 + (sectionId > 0 ? 100 : 60),
      //       animated: true
      //     });
      //   }, 100);
    }
  };

  function handleNextPress() {
    if (advancedInputType === AdvancedInputType.EarnMin) {
      setAdvancedInputType(-1);

      // delay(() => {
      //   scrollView.current!.scrollTo({ y: 0, animated: true });
      // }, 100);
    } else {
      setAdvancedInputType(advancedInputType + 1);

      // delay(() => {
      //   scrollView.current!.scrollTo({
      //     y: (advancedInputType + 1) * 60 + (advancedInputType > 0 ? 100 : 60),
      //     animated: true
      //   });
      // }, 100);
    }
  }

  function handleBackPress() {
    // const { navigation } = props;
    // navigation.goBack();
  }

  function renderKeypad(index: number) {
    const buttonTitleStyle = [
      styles.nextButtonTitle,
      {
        color: values[index] ? Colors.ClearBlue : Colors.LightPeriwinkle
      }
    ];

    // style={{ flex: 1, padding: 0 }}
    // textStyle={styles.btnKey}
    return (
      <View style={styles.keyPadView}>
        <View style={styles.keyPadInnerView}>
          <View style={styles.btnView}>
            <Button
              title="1"
              onPress={() => {
                handledClick("1");
              }}
            />
            <Button
              title="2"
              onPress={() => {
                handledClick("2");
              }}
            />
            <Button
              title="3"
              onPress={() => {
                handledClick("3");
              }}
            />
          </View>
          <View style={styles.btnView}>
            <Button
              title="4"
              onPress={() => {
                handledClick("4");
              }}
            />
            <Button
              title="5"
              onPress={() => {
                handledClick("5");
              }}
            />
            <Button
              title="6"
              onPress={() => {
                handledClick("6");
              }}
            />
          </View>
          <View style={styles.btnView}>
            <Button
              title="7"
              onPress={() => {
                handledClick("7");
              }}
            />
            <Button
              title="8"
              onPress={() => {
                handledClick("8");
              }}
            />
            <Button
              title="9"
              onPress={() => {
                handledClick("9");
              }}
            />
          </View>
          <View style={styles.btnView}>
            <Button
              title="."
              onPress={() => {
                handledClick(".");
              }}
            />
            <Button
              title="0"
              onPress={() => {
                handledClick("0");
              }}
            />
            <Button
              title="⌫"
              onPress={() => {
                pressBackSpace();
              }}
            />
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={buttonTitleStyle}>{I18n.t("next")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderAmountInfo(index: number) {
    const { payment } = props;
    const amount = values[index];
    let localCurrencyAmount: string | number = 0;

    if (amount) {
      localCurrencyAmount = (
        parseFloat(amount) / Number(currencyExchangeRatePay)
      ).toFixed(2);
    }

    let symbolUnit = payment.sign;
    if (index === AdvancedInputType.Amount) {
      symbolUnit = "₿ ";
    } else if (index === AdvancedInputType.Earn) {
      symbolUnit = "%";
    }

    const infoEl =
      balanceSAT < Number(amount) * 100000000 ? (
        <Text style={[styles.lblAmountInfo, { color: Colors.OrangeYellow }]}>
          {I18n.t("amountHighMessage")}
        </Text>
      ) : (
        <Text style={styles.lblAmountInfo}>
          {amount ? `${payment.sign} ${localCurrencyAmount}` : " "}
        </Text>
      );

    return (
      <View style={styles.coinInputView}>
        <View style={styles.bitcoinView}>
          {index !== AdvancedInputType.Earn && (
            <Text
              style={[
                styles.unit,
                { color: amount ? "black" : Colors.LightGrey }
              ]}
            >
              {symbolUnit}
            </Text>
          )}

          <Text
            style={amount ? styles.txtBitCoinFill : styles.placeholderStyle}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {amount ? amount : ` ${I18n.t("amount")}`}
          </Text>

          {index === AdvancedInputType.Earn && (
            <Text
              style={[
                styles.unit,
                { color: amount ? "black" : Colors.LightGrey }
              ]}
            >
              {symbolUnit}
            </Text>
          )}
        </View>
        {index === AdvancedInputType.Amount && infoEl}
      </View>
    );
  }

  function renderFooter() {
    let isAllSet = true;
    values.forEach(value => {
      isAllSet = isAllSet && !!value;
    });

    return (
      <View>
        {orderId ? (
          <View style={{ marginTop: 30 }}>
            <BottomPrimaryButton
              color={"blue"}
              title={I18n.t("cancel")}
              colorReceive={true}
              onPress={onCancelAdvanced}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.termsAgree}>
              {I18n.t("splitOrderAgreeMessage")}
            </Text>

            <TouchableOpacity
              style={isAllSet ? styles.btnSendFill : styles.btnSend}
              disabled={!isAllSet}
              onPress={() => {
                isAllSet && onConfirmBSV();
              }}
            >
              <Text style={styles.buttonTitle}>{I18n.t("request")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  function renderSectionHeader(section: Section) {
    const { payment } = props;
    const isRequest = !!orderId;

    const value = values[section.id]
      ? `${values[section.id]}`
      : I18n.t("inputAmountPlaceholder");
    const valueStyle = values[section.id]
      ? styles.sectionValue
      : styles.sectionPlaceholder;
    // 互斥条件暂时保留
    // let banIndex = -1;
    // if (values[4] !== '') {
    //     banIndex = 5
    // }
    // if (values[5] !== '') {
    //     banIndex = 4
    // }
    let localAmountFromBsv = 0;
    if (section.id === AdvancedInputType.Amount && value) {
      localAmountFromBsv = parseFloat(value) / Number(currencyExchangeRatePay);
    }

    const sectionStyle =
      section.id === AdvancedInputType.Amount &&
      advancedInputType !== AdvancedInputType.Amount
        ? styles.bsvSectionHeader
        : styles.sectionHeader;

    const headerStyle = {
      flex: 1,
      height:
        section.id === AdvancedInputType.Amount &&
        advancedInputType !== AdvancedInputType.Amount
          ? 125
          : 60,
      justifyContent: "center" as "center"
    };

    let symbolUnit = payment.sign;
    if (section.id === AdvancedInputType.Amount) {
      symbolUnit = "₿ ";
    } else if (section.id === AdvancedInputType.Earn) {
      symbolUnit = "%";
    }

    const labelEl =
      section.id === AdvancedInputType.Amount &&
      advancedInputType !== AdvancedInputType.Amount ? (
        <View style={{ flex: 1 }}>
          <Text style={[styles.sectionLabel, { paddingBottom: 10 }]}>
            {isRequest && section.id === AdvancedInputType.Amount
              ? I18n.t("remainAmount")
              : section.label}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Text style={[valueStyle, { fontSize: 30, lineHeight: 32 }]}>
              {values[section.id] ? symbolUnit : " "}
            </Text>
            <Text
              style={[
                valueStyle,
                { fontSize: 30, lineHeight: 32, fontWeight: "bold" }
              ]}
            >
              {values[section.id]
                ? `${value}`
                : I18n.t("inputAmountPlaceholder")}
            </Text>
          </View>

          <Text
            style={[styles.sectionPlaceholder, { fontSize: 13, paddingTop: 5 }]}
          >
            {values[section.id]
              ? `${payment.sign} ${localAmountFromBsv.toFixed(2)}`
              : " "}
          </Text>
        </View>
      ) : (
        <Text style={[styles.sectionLabel, { flex: 1 }]}>{section.label}</Text>
      );

    const valueEl = section.id !== AdvancedInputType.Amount && (
      <View style={{ flexDirection: "row" }}>
        {section.id === AdvancedInputType.Earn ? (
          <Text style={valueStyle}>
            {value} {values[section.id] ? `${symbolUnit}` : ""}
          </Text>
        ) : (
          <Text style={valueStyle}>
            {values[section.id] ? `${symbolUnit}` : ""} {value}
          </Text>
        )}
      </View>
    );

    const imageStyle = {
      marginLeft: 5,
      width: 24,
      height: 24,
      tintColor: Colors.ClearBlue,
      transform: [
        { rotate: advancedInputType === section.id ? "90deg" : "0deg" }
      ]
    };
    // console.log(advancedInputType)
    return (
      <View style={sectionStyle}>
        <TouchableOpacity
          style={headerStyle}
          onPress={!isRequest ? handleSectionPress(section.id) : () => {}}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {labelEl}
            {valueEl}
            {/*((!isRequest && section.id !== banIndex) || (isRequest && section.id !== 0))*/}
            {!isRequest && (
              <Image source={require("../icons/next.png")} style={imageStyle} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSectionContent(section: Section) {
    return advancedInputType === section.id && !orderId ? (
      <View style={styles.sectionContent}>
        {renderAmountInfo(section.id)}
        {renderKeypad(section.id)}
      </View>
    ) : null;
  }

  const { payment } = props;
  const isRequest = !!orderId;

  // let imageSource =
  //   Number(payment.paymentId) > 1 ? PayWallet[payment.paymentName] : "";
  let walletName = payment.paymentName;
  if (isRequest) {
    // imageSource =
    //   Number(payment.paymentId) > 1 ? PayWallet[payment.paymentName] : "";
    walletName = I18n.t(payment.paymentName, {
      defaultValue: payment.paymentName
    });
  }

  const scrollContainerStyle = [
    styles.scrollContent
    // {
    //   minHeight:
    //     height -
    //     safeAreaDimension.current.top -
    //     safeAreaDimension.current.bottom -
    //     60 /* Header height */
    // }
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {/* <Header headerText={I18n.t("sell")} onBackPress={handleBackPress} /> */}

        <View style={styles.container}>
          <ScrollView
            ref={null /*scrollView*/}
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={scrollContainerStyle}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.otherPay}>
                {/* <Image
                  resizeMode="contain"
                  source={imageSource as any}
                  style={styles.imagePaymode}
                /> */}
                <Text style={styles.otherText}>{walletName}</Text>
                {/*<Image*/}
                {/*source={require("../icons/next.png")}*/}
                {/*style={{*/}
                {/*width: 24,*/}
                {/*height: 24,*/}
                {/*tintColor: Colors.BlueyGrey*/}
                {/*}}*/}
                {/*/>*/}
                {isRequest && <Text>TXID {orderId}</Text>}
              </TouchableOpacity>
              {isRequest && (
                <View style={styles.requestView}>
                  {/* <Image
                    source={require("../icons/sendAdvanced.png")}
                    style={{
                      width: 50,
                      height: 39
                    }}
                  /> */}
                  <Text style={styles.request}>
                    {I18n.t("splitOrderSentSuccess")}
                  </Text>
                  <Text style={styles.requestHint}>
                    {I18n.t("splitOrderSuccessPostMessage")}
                  </Text>
                </View>
              )}
              {AdvancedInputSections.map(section => (
                <View key={`#advancedSection${section.id}`}>
                  {renderSectionHeader(section)}
                  {renderSectionContent(section)}
                </View>
              ))}
            </View>

            {renderFooter()}
          </ScrollView>
        </View>
        <Loader visible={loading} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    borderBottomWidth: 1
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    borderBottomColor: Colors.PaleGrey,
    borderBottomWidth: 1
  },
  sectionLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Slate
  },
  sectionValue: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.DarkGrey
  },
  sectionPlaceholder: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.LightGrey
  },
  termsAgree: {
    color: Colors.BlueyGrey,
    fontSize: 14,
    lineHeight: 16,
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  nextButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    borderRadius: 5,
    backgroundColor: Colors.LightPeriwinkleWithOpacity(0.1)
  },
  nextButtonTitle: {
    fontSize: 19
  },
  imagePaymode: {
    width: 24,
    height: 24,
    marginRight: 9,
    marginLeft: 10
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 19,
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  btnSendFill: {
    backgroundColor: Colors.ClearBlue,
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginHorizontal: 15,
    marginBottom: 20
  },

  btnSend: {
    backgroundColor: Colors.LightPeriwinkle,
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginHorizontal: 15,
    marginBottom: 20
  },

  keyPadView: {
    backgroundColor: Colors.PaleGrey,
    height: 305,
    marginBottom: 20
  },

  keyPadInnerView: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 15,
    marginLeft: 40,
    marginRight: 40
  },

  btnView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.PaleGrey
  },

  btnKey: {
    fontSize: 35,
    color: Colors.Slate
  },

  otherPay: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: Colors.PaleGrey,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10
  },

  otherText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1
  },

  coinInputView: {
    alignItems: "center",
    justifyContent: "center",
    height: 105
  },

  bitcoinView: {
    flexDirection: "row",
    paddingHorizontal: 15,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },

  lblAmountInfo: {
    fontSize: 12,
    padding: 10
  },

  txtBitCoinFill: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 50
  },
  unit: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000"
  },
  placeholderStyle: {
    margin: 5,
    fontSize: 16,
    color: Colors.LightGrey
  },
  requestView: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 70,
    marginTop: 30
  },
  request: {
    fontSize: 19,
    lineHeight: 28,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 2
  },
  requestHint: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgb(144, 148, 156)",
    textAlign: "center"
  }
});
