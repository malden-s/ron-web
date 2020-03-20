import React from 'react';
import { View } from 'react-native-web';

interface ContainerCenteredProps {
  children: React.ReactNode
}

export default function ContainerCentered({
  children
}: ContainerCenteredProps) {
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      { children }
    </View>
  )
}