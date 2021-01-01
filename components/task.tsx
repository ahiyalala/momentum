import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ITask } from "../intrerfaces";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Shadowing } from "../styles.global";

const pluralize = (str: string, val: number) => {
  return val == 1 ? `${str}` : `${str}s`;
};

export const Task = (task: ITask) => {
  const { name, totalSeconds, onPress } = task;
  const minutes = parseInt((totalSeconds / 60).toString());
  const seconds = totalSeconds % 60;

  const elapsedString =
    minutes > 0
      ? `Total spent: ${minutes} ${pluralize("minute", minutes)}`
      : `Total spent: ${seconds} ${pluralize("second", seconds)}`;

  return (
    <View
      style={[
        {
          paddingHorizontal: 8,
          paddingVertical: 16,
          borderBottomColor: "#9966cc",
          borderBottomWidth: 4,
          marginBottom: 8,
        },
        Shadowing.card,
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={{ marginBottom: 8 }}>{name}</Text>
        <Text style={{ height: 40 }}>No description available</Text>
        <Text style={{ fontSize: 12, color: "#91a3b0" }}>{elapsedString}</Text>
      </TouchableOpacity>
    </View>
  );
};
