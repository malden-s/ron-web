import React, { ReactNode, ReactElement } from "react";
import { View, TextInput, KeyboardType, Text } from "react-native-web";

const RightAddon: React.FC = props => (
  <View
    style={{
      marginRight: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch"
    }}
  >
    {props.children}
  </View>
);

interface IProps {
  inputValue: string;
  changeInputValue: (value: string) => void;
  keyboard?: KeyboardType;
  footer?: ReactElement | string;
  placeholder?: string;
  label: ReactNode;
  validationError?: string;
}

const Input = (props: IProps) => {
  return (
    <>
      <Text
        style={{
          color: "#90949C",
          fontFamily: "Roboto",
          fontSize: 15,
          marginTop: 20
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          height: 42,
          display: "flex",
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 12,
          borderWidth: 1,
          borderColor: "#999999"
        }}
      >
        <TextInput
          style={{
            height: 42,
            fontSize: 12,
            display: "flex",
            flex: 1,
            marginLeft: 8,
            marginRight: 8
          }}
          keyboardType={props.keyboard}
          value={props.inputValue}
          onChangeText={(value: string) => props.changeInputValue(value)}
          placeholder={props.placeholder}
        />
        <RightAddon>
          {React.isValidElement(props.footer) ? (
            props.footer
          ) : (
            <Text
              style={{
                fontSize: 15,
                color: "#000000"
              }}
            >
              {props.footer || ""}
            </Text>
          )}
        </RightAddon>
      </View>
      {/*props.validationError*/ 1 && (
        <Text
          style={{
            color: "#D8000C",
            fontFamily: "Roboto",
            fontSize: 15,
            marginTop: 2,
            height: 20
          }}
        >
          {props.validationError}
        </Text>
      )}
    </>
  );
};

export default Input;
