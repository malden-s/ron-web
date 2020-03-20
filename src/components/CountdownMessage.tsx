import React, { useEffect, useState, FunctionComponent } from "react";
import { View, Text } from "react-native-web";

interface expiredTime {
  expireTime: number;
  onTimeout: () => void;
}

const CountdownMessage: FunctionComponent<expiredTime> = ({
  expireTime,
  onTimeout
}) => {
  const [countdown, setCountdown] = useState(expireTime);
  useEffect(() => {
    let interval: any;
    if (countdown && countdown > 0) {
      interval = setInterval(
        () => setCountdown(countdown => countdown - 1),
        1000
      );
    }
    if (countdown === 0) {
      clearInterval(interval);
      interval = null;
      onTimeout();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown, onTimeout]);

  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          color: "white"
        }}
      >
        ({countdown}s)
      </Text>
    </View>
  );
};

export default CountdownMessage;
