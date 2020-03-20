import React from "react";
import Dropdown from "./Dropdown";
import { Text, Image, StyleSheet } from "react-native-web";
import { ICurrency } from "../context/CurrenciesContext";

interface CurrencyDropdownProps {
  currencies: ICurrency[];
  selectedCurrency: ICurrency;
  onCurrencyChange: (currency: ICurrency) => void;
}

export default function CurrencyDropdown({
  currencies,
  selectedCurrency,
  onCurrencyChange
}: CurrencyDropdownProps) {
  function renderTopCurrency(currency: ICurrency): JSX.Element {
    return (
      <>
        <Image
          source={{ uri: (currency as any).flagLogoUrl }}
          style={styles.currencyImage}
        />
        <Text style={styles.currencyLabel}>{currency.symbol}</Text>
      </>
    );
  }

  function renderCurrencyInList(currency: ICurrency) {
    return (
      <>
        <Image
          source={{ uri: (currency as any).flagLogoUrl }}
          style={styles.currencyImage}
        />
        <Text style={styles.currencyInListLabel}>{currency.symbol}</Text>
      </>
    );
  }

  return (
    <Dropdown
      items={currencies}
      selectedItem={selectedCurrency}
      renderTopItem={renderTopCurrency}
      renderItemInList={renderCurrencyInList}
      onChange={onCurrencyChange}
    />
  );
}

const styles = StyleSheet.create({
  currencyImage: {
    width: 16,
    height: 16,
    marginRight: 5
  },
  currencyLabel: {
    marginRight: 3,
    fontSize: 12,
    color: "#333333"
  },
  currencyInListLabel: {
    fontSize: 11
  }
});
