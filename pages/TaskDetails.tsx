import React from "react";
import { Text, View } from "react-native";

export const TaskDetails = ({ route, navigation }: any) => {
  const { id } = route.params;
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};
