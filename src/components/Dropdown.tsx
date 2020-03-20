import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native-web';

interface DropdownProps<T> {
  items: T[];
  selectedItem: T;
  renderTopItem: Function;
  renderItemInList: Function;
  onChange: (item: T) => void;
}

export default function Dropdown<T>({
  items,
  selectedItem,
  renderTopItem,
  renderItemInList,
  onChange
}: DropdownProps<T>) {

  const [ isToggled, setIsToggled ] = useState(false);

  function handleChangeSelected(item: T) {
    onChange(item);
    setIsToggled(false);
  }

  return (
    <TouchableOpacity style={ styles.dropdownContainer } onPress={ () => setIsToggled(!isToggled) }>

      { /** SELECTED ITEM */ }
      <View style={ styles.dropdownTopContainer }>
        { renderTopItem(selectedItem) }
        <View style={ styles.dropdownToggleContainer } />
      </View>

      { /** ITEMS LIST */ }
      { isToggled && <View style={ styles.dropdownListContainer }>
        { items.map((item: T) => (
          <TouchableOpacity
            key={ items.indexOf(item) }
            onPress={ () => handleChangeSelected(item) }
            style={ styles.dropdownListItemContainer }>
            { renderItemInList(item) }
          </TouchableOpacity>
        )) }
      </View>}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  dropdownTopContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownToggleContainer: {
    width: 0, 
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderTopWidth: 6,
    borderTopColor: '#333333',
  },
  dropdownListContainer: {
    position: 'absolute',
    top: 35,
    left: 0,
    width: 84,
    marginRight: 5,
    height: 200,
    overflow: 'scroll',
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d3d2d3',
    zIndex: 1000
  },
  dropdownListItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 32,
  }
});