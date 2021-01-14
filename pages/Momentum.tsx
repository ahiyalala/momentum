import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Platform, Text, View } from "react-native";
import Timer from "../components/timer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Typography } from "../styles.global";
import { NormalButton } from "../components/buttons";
import { useBackHandler } from "@react-native-community/hooks";
import DatabaseAPI from "../lib/db";
import { AddTaskParam } from "../intrerfaces";

export const Momentum = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [startTimeObj, setStartTime] = useState(new Date());
  const {
    momentumMinutes,
    taskName,
    taskDescription,
    taskId,
  } = route.params as any;
  const [elapsed, setElapsed] = useState(0);
  const [isActive, setActive] = useState(true);

  useBackHandler(() => {
    if (isActive) {
      alert("Cannot go back while timer is running");
      return true;
    }

    if (elapsed == 0) {
      navigation.navigate("Home");
      return true;
    }

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

  const submitTaskData = () => {
    if (elapsed == 0) {
      alert("Cannot save an empty timer");
      return;
    }

    const callback = (res: boolean) => {
      if (res) {
        alert(`New ${taskId == null ? "task" : "progress"} added!`);
        navigation.navigate("Home");
      } else {
        alert(
          "Something went wrong, please reach out to the developer for help."
        );
      }
    };

    const db = new DatabaseAPI();
    const endTime = new Date().toISOString();
    const startTime = startTimeObj.toISOString();
    const _elapsed = parseInt((elapsed / 1000).toString());
    if (taskId != null) {
      db.addNewProgressToTask({
        taskId,
        startTime,
        endTime,
        elapsed: _elapsed,
        callback,
      });
      return;
    }

    db.addNewTask({
      taskName,
      taskDescription,
      startTime,
      endTime,
      elapsed: _elapsed,
      callback,
    } as AddTaskParam);
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
          Keeping track of time for
        </Text>
        <Text style={[Typography.h2, { marginBottom: 40 }]}>{taskName}</Text>
        <View style={{ justifyContent: "space-around", flex: 1 }}>
          <Timer
            minutes={momentumMinutes}
            onTimePass={(el: number) => setElapsed(el)}
            onStateChange={(status: boolean) => setActive(status)}
          />
          <NormalButton
            text={"Submit"}
            style={{ paddingVertical: 16 }}
            disabled={!elapsed || isActive}
            onPress={() => submitTaskData()}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Text>{elapsed}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
