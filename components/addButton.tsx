import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colorScheme, Shadowing } from "../styles.global";

export const AddNewTask = ({ onPress }: any) => {
  return (
    <View style={{ marginBottom: 16, marginTop: 4 }}>
      <TouchableOpacity
        style={[
          Shadowing.card,
          {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: colorScheme.main.color,
            borderRadius: 5,
          },
        ]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Ionicons name="md-add" size={16} color={"white"} />
        <Text
          style={[
            {
              marginLeft: 8,
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
            },
          ]}
        >
          ADD NEW TASK
        </Text>
      </TouchableOpacity>
    </View>
  );
};
