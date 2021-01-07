import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddNewTask } from "../components/addButton";
import { IconButton } from "../components/buttons";
import { TaskHistory } from "../intrerfaces";
import DatabaseAPI from "../lib/db";
import { pluralize, secondsToTime } from "../lib/helper";
import { colorScheme, Shadowing, Typography } from "../styles.global";

export const TaskDetails = ({ route, navigation }: any) => {
  const { task } = route.params;
  const { taskId, taskName, taskDescription, totalElapsed } = task;
  const [history, populateHistory] = useState([] as TaskHistory[]);

  const totalTime = secondsToTime(totalElapsed);

  React.useEffect(() => {
    const db = new DatabaseAPI();
    db.getTaskHistory(taskId, (val: any) => populateHistory(val));
  }, []);

  return (
    <View>
      <View
        style={[
          {
            paddingTop: 32,
            paddingBottom: 48,
            paddingHorizontal: 16,
            backgroundColor: "white",
          },
        ]}
      >
        <Text style={[Typography.h1, { marginBottom: 8 }]}>{taskName}</Text>
        <Text style={{ marginBottom: 16 }}>
          {taskDescription ? taskDescription : "No description"}
        </Text>
        <Text>Total time spent: {totalTime}</Text>
      </View>
      <View style={{ alignItems: "flex-end", position: "relative" }}>
        <TouchableOpacity
          style={[
            { alignItems: "center", justifyContent: "center" },
            {
              backgroundColor: colorScheme.main.color,
              width: 60,
              height: 60,
              borderRadius: 100,
              marginHorizontal: 16,
              marginRight: 32,
              position: "absolute",
              top: -32,
              right: 16,
            },
          ]}
          activeOpacity={0.7}
          onPress={() => console.log("Dong")}
        >
          <Ionicons name="md-add" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flexGrow: 1 }}>
        {history.map((timestamp, index: number) => {
          const { elapsed, endTime, startTime } = timestamp;
          const startDate = new Date(startTime);
          const endDate = new Date(endTime);
          return (
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={[{ marginBottom: 8, fontSize: 20, fontWeight: "bold" }]}
                key={index}
              >
                {secondsToTime(elapsed)}
              </Text>
              <Text>
                {`${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()} - ${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString()}`}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
