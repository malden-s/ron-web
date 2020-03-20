import { useContext } from "react";
import { CurrenciesContext } from "../context/CurrenciesContext";

export function useSelectedCurrency() {
  const currenciesContext = useContext(CurrenciesContext);

  if (!currenciesContext.selectedCurrency) {
    throw new Error("No currency selected");
  }

  const selectedCurrency =
    currenciesContext.currencies[currenciesContext.selectedCurrency];

  if (!selectedCurrency) {
    throw new Error("No currency selected");
  }

  return selectedCurrency;
}
