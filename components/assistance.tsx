import React from "react";
import { View, Text } from "react-native";
import { colorScheme } from "../styles.global";

export const TipText = (props: any) => {
  const { children, style } = props;

  return (
    <View
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "#f5f5f5",
          borderWidth: 1,
          borderColor: colorScheme.main.color,
          borderRadius: 5,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          lineHeight: 20,
        }}
      >
        {children}
      </Text>
    </View>
  );
};
