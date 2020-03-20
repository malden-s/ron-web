import React, { FunctionComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native-web';

import MainWrapper from '../wrappers/MainWrapper';
import {NavigationParams} from "react-navigation";

const SuccessScreen: FunctionComponent<NavigationParams> = ({ navigation }) => {
    const orderId = navigation.getParam('orderId', null);
    const walletSymbolSign = navigation.getParam('walletSymbolSign', null);
    const walletSendAmount = navigation.getParam('walletSendAmount', null);
  return (
    <MainWrapper>
      <View style={{
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <View style={{
          marginTop: 60,
          width: 375,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Image
            source={require('../icons/completed.png')}
            style={{
              width: 120,
              height: 120,
            }}
          />
          <Text style={{  fontSize: 14, marginTop: 20 }}>Your funds is being processed</Text>
          <Text style={{  fontSize: 22, color: ' #2A2A2E', marginTop: 10 }}>{walletSymbolSign} {walletSendAmount}</Text>
          <Text style={{ fontSize: 16, color: '#828282', marginTop: 40 }}>
            Order ID:
            <Text style={{
              color: '#2669ff',
              fontWeight: '900'
            }}> {orderId}</Text>
          </Text>
          <Text style={{ width: 250, height: 48, fontSize: 14, textAlign: 'center', marginTop: 8}}>
            <Text style={{ fontWeight: 'bold' }}>Screenshot</Text> or <Text style={{ fontWeight: 'bold' }}>write down</Text> your Order ID for easy access
          </Text>
          <TouchableOpacity
            style={{
              width: 94,
              height: 32,
              borderWidth: 1,
              borderColor: '#D7D7DB',
              borderRadius: 3,
              backgroundColor: '#F9FAFC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24
            }}
            onPress={() => navigation.navigate('BuyOrders')}
          >
            <Text style={{ fontSize: 14, color: '#90949C' }}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainWrapper>
  )
}

export default SuccessScreen;