import React from "react";
import { View, Pressable, Text } from "react-native";

export const MenuItem = ({ onPress, title }: any) => {
  return (
    <View>
      <Pressable
        style={{
          paddingVertical: 16,
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 16 }}>{title}</Text>
      </Pressable>
    </View>
  );
};
