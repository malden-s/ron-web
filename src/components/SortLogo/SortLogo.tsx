import React, { FunctionComponent } from "react";
import { StyleSheet, Image } from "react-native-web";

const SortIcon = require("../../icons/sort.png");

interface IProps {
  rotate: boolean;
}

const SortLogo: FunctionComponent<IProps> = props => {
  return (
    <Image
      resizeMode="contain"
      source={SortIcon}
      style={[styles.sortLogo, props.rotate ? styles.rotate : null]}
    />
  );
};

const styles = StyleSheet.create({
  sortLogo: {
    height: 20,
    marginRight: 9,
    marginLeft: 10,
    width: 20
  },
  rotate: {
    transform: [{ rotate: "180deg" }]
  }
});

export default SortLogo;
