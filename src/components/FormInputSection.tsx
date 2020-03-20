import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native-web';

class InputSection extends PureComponent {
  render() {
    return (
      <View style={ styles.inputSectionContainer }>
        { this.props.children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputSectionContainer: {
    marginTop: 36
  }
});