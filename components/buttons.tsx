import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { buttons, colorScheme } from "../styles.global";
import { Ionicons } from "@expo/vector-icons";
import { Shadowing } from "../styles.global";

export const PillButton = (props: any) => {
  const { label, width, isActive, onPress } = props;

  const buttonColor = isActive ? colorScheme.main.color : "#fffafa";
  const inverseColor = !isActive ? colorScheme.main.color : "#fffafa";
  return (
    <TouchableOpacity
      style={{ width: width }}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: buttonColor,
            borderWidth: 2,
            borderColor: colorScheme.main.color,
            borderRadius: 100,
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: inverseColor,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const NormalButton = ({ onPress, text, icon, style, disabled }: any) => {
  return (
    <View style={{ marginBottom: 16, marginTop: 4 }}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          Shadowing.card,
          {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: disabled
              ? colorScheme.disabled.color
              : colorScheme.main.color,
            borderRadius: 5,
          },
          style,
        ]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text
          style={[
            {
              marginRight: 8,
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
            },
          ]}
        >
          {text.toUpperCase()}
        </Text>
        <Ionicons name={icon} size={16} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export const IconButton = ({ icon, text, onPress }: any) => {
  return (
    <View style={{ width: 40, marginHorizontal: 16 }}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
        <Ionicons name={icon} size={24} color={"#a2a2a2"} />
        <Text style={{ color: "#a2a2a2", fontSize: 12 }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
