import React, { FunctionComponent , useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  CheckBox
} from "react-native-web";

interface IProps {
  title: string;
  list: any[];
}

const FilterDropdown: FunctionComponent<IProps> = ({ title, list }) => {

  const [toggle, setToggle] = useState(false);
  const [checkboxboxValue, setCheckboxValue] = useState<Record<string, boolean>>({
    ...list.reduce((accumulator, value) => {
      const newAcc = {...accumulator}
      newAcc[value.symbol] = true
      return newAcc;
    }, {})
  });

  const onCheckBoxChange = (symbol: string, value: any) => {
    setCheckboxValue({...checkboxboxValue, [symbol]: value});
  }

  return (
      <View>
        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          <Text style={{
            height: 55,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Roboto',
            borderBottomColor: '#F2F2F2',
            borderBottomWidth: 1,
          }}>
            {title} ({list.length}) {toggle ? '^' : '⌄' }
          </Text>
        </TouchableOpacity>
        {toggle && (
          <ScrollView style={{
            height: 275,
            backgroundColor: '#FAFAFB'
          }}>
            {list.map(currency => (
              <View
                style={{
                  height: 47,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#F2F2F2',
                }}
                key={list.indexOf(currency)}
              >
                <CheckBox
                  value={checkboxboxValue[currency.symbol]}
                  onValueChange={() => {
                    onCheckBoxChange(currency.symbol, !checkboxboxValue[currency.symbol])
                  }}
                  style={{
                    marginLeft: 20,
                    marginRight: 8
                  }}
                />
                <Image
                    source={currency.imgUrl}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 6,
                    }}
                  />
                  <Text style={{ fontSize: 12 }}>{currency.label}</Text>
              </View>)
            )}
          </ScrollView>
        )}
     </View>
  )
}

export default FilterDropdown;
