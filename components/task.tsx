import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ITask } from "../intrerfaces";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { colorScheme, Shadowing } from "../styles.global";
import { pluralize, secondsToTime } from "../lib/helper";

export const Task = (task: ITask) => {
  const { name, totalSeconds, onPress, description, lastUpdate } = task;
  const minutes = parseInt((totalSeconds / 60).toString());
  const seconds = totalSeconds % 60;

  const elapsedString = secondsToTime(totalSeconds);

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
        <Text style={[{ height: 40, color: "#C0C0C0" }]}>
          {description ? description : "No description available"}
        </Text>
        <Text style={{ fontSize: 12, color: "#91a3b0" }}>
          Spent: {elapsedString}{" "}
          {lastUpdate ? `| Last Updated: ${lastUpdate}` : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
