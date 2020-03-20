import React from 'react';
import MainWrapper from '../wrappers/MainWrapper';
import ConfirmSellOrderHeader from '../components/ConfirmSellOrderHeader';
import { View, Image, Text, StyleSheet } from 'react-native-web';
import { Colors } from '../constants/colors';
import SellOrderSummary from '../components/SellOrderSummary';
import { PaymentService } from '../enum/payment-service.enum';
import ContainerCentered from '../components/ContainerCentered';
const returnToEditOrderImage = require('../icons/back-left.png');

export default function ConfirmSellOrder() {
  return (
    <MainWrapper>
      <View style={ styles.container }>

        <ConfirmSellOrderHeader />

        <View style={ styles.returnToEditOrderContainer }>
          <Image 
            style={ styles.returnToEditOrderImage }
            source={ returnToEditOrderImage }  
          />
          <Text style={ styles.returnToEditOrderText }>{ 'Back to edit' }</Text>
        </View>

        <ContainerCentered>
          <SellOrderSummary
            service={ PaymentService.ALIPAY }
            orderSize={ '0.5' }
            earnPercentage={ '2%' }
            minOrderSize={ 'CNY1.0' }
            maxOrderSize={ 'CNY1.1' }
            minEarnAmount={ 'CNY10.0' }
          />
        </ContainerCentered>

        <ContainerCentered>
          <Text>{ 'Slide to pay' }</Text>
          <Text>{ 'if all of above is correct' }</Text>
        </ContainerCentered>
      </View>
    </MainWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16
  },
  returnToEditOrderContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  returnToEditOrderImage: {
    width: 16,
    height: 16,
    tintColor: Colors.ClearBlue,
    marginRight: 12
  },
  returnToEditOrderText: {
    color: Colors.ClearBlue
  },
  confirmSellOrderFooter: {
    marginTop: 32
  },
});