import React from "react";
import { View, TextInput } from "react-native-web";

import FilterDropdown from "../FilterDropdown";

const FilterContentComponent = () => {
  return (
    <View
      style={{
        height: 500,
        marginLeft: 16,
        marginRight: 16
      }}
    >
      <TextInput
        placeholder="Search by method/currency"
        placeholderTextColor="#BDBDBD"
        style={{
          minWidth: 343,
          height: 40,
          backgroundColor: "#F8F8FA",
          marginTop: 14,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 8,
          paddingRight: 8
        }}
      />
      {/* <FilterDropdown title="Currency" list={currencies} />
      <FilterDropdown title="Methods" list={currencies} /> */}
    </View>
  );
};

FilterContentComponent.path = "/orderList/filter";
FilterContentComponent.navigationOptions = {
  title: "Filter",
  linkName: "MatchFilter"
};

export default FilterContentComponent;
