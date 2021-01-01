import { useBackHandler } from "@react-native-community/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NormalButton } from "../components/buttons";
import { Countdown } from "../components/countdown";
import { Layout, Typography } from "../styles.global";

export const Timebox = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    timeboxSeconds,
    timeboxHours,
    timeboxMinutes,
    taskDescription,
    taskName,
  } = route.params as any;
  const [isActive, setActiveState] = useState(true);
  const [timerObj, setTimerObj] = useState({
    startTime: Date.now(),
    endTime: null,
  } as any);

  useBackHandler(() => {
    Alert.alert("Hold on!", "Going back will lose your progress.", [
      {
        text: "Cancel",
        onPress: () => null,
      },
      {
        text: "Proceed",
        onPress: () => {
          navigation.navigate("Home");
        },
      },
    ]);

    return true;
  });

  const discardProgress = () => {
    Alert.alert(
      "Discarding progress",
      "Do you want to discard this task progress?",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  const saveProgress = () => {
    if (isActive) {
      Alert.alert("Stop and keep", "Stop the clock and keep ?", [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={[Layout.outerBox, { flex: 1 }]}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: Platform.OS == "ios" ? 16 : 0,
          paddingTop: Platform.OS == "ios" ? 32 : 0,
        }}
      >
        <Text style={[Typography.h4, { marginBottom: 8 }]}>
          Time-boxing for
        </Text>
        <Text style={[Typography.h2, { marginBottom: 40 }]}>{taskName}</Text>
        <View style={{ justifyContent: "space-around", flex: 1 }}>
          <Countdown
            minutes={timeboxMinutes}
            hours={timeboxHours}
            seconds={timeboxSeconds}
            onStateChange={(val: boolean) => setActiveState(val)}
          />
          <View>
            <NormalButton
              text={isActive ? "Stop and keep" : "Keep"}
              icon="md-save"
              style={{ paddingVertical: 16 }}
              onPress={() => saveProgress()}
            />
            <NormalButton
              text={"Discard"}
              icon="md-close"
              style={{ paddingVertical: 16, backgroundColor: "red" }}
              onPress={() => discardProgress()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
