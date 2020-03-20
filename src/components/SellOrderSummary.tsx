import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native-web';
import { Colors } from '../constants/colors';
import { PaymentService } from '../enum/payment-service.enum';
import ContainerCentered from './ContainerCentered';
import { PaymentServiceIcons } from '../constants/payment-service-icons';

interface SellOrderSummaryProps {
  service: PaymentService;
  orderSize: string;
  earnPercentage: string;
  minOrderSize: string;
  maxOrderSize: string;
  minEarnAmount: string;
}

export default function SellOrderSummary({
  service,
  orderSize,
  earnPercentage,
  minOrderSize,
  maxOrderSize,
  minEarnAmount
}: SellOrderSummaryProps) {
  return (
    <View style={ styles.sellOrderSummaryContainer }>
      <ContainerCentered>
        <Image
          source={ PaymentServiceIcons.ALIPAY }
          style={ styles.paymentServiceIcon }
        />
        <Text>{ service }</Text>
        <Text style={ styles.actionLabel }>{ 'Selling' }</Text>
        <Text style={ styles.orderSizeLabel }>{ 'BSV' + ' ' + orderSize }</Text>
      </ContainerCentered>
    </View>
  )
}

const styles = StyleSheet.create({
  sellOrderSummaryContainer: {
    width: 299,
    height: 394,
    marginTop: 61,
    marginRight: 16,
    marginLeft: 16,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 24,
    shadowOpacity: 1.0,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1,
    borderColor: Colors.Lightest,
    borderRadius: 6
  },
  paymentServiceIcon: {
    width: 48,
    height: 48,
    position: 'relative',
    top: -19
  },
  actionLabel: {
    marginTop: 30,
    // fontSize: 14,
    color: Colors.BlueyGrey
  },
  orderSizeLabel: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '500'
  }
});