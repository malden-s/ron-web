import React from 'react';
import { View, ActivityIndicator } from 'react-native-web';

const Loader = () => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator size="large" color="#2669ff" />
    </View>
  )
}

export default Loader;
