import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
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
  const navigate = useNavigation();

  const totalTime = secondsToTime(totalElapsed);

  React.useEffect(() => {
    const db = new DatabaseAPI();
    db.getTaskHistory(taskId, (val: any) => populateHistory(val));
  }, []);

  const deleteTask = () => {
    Alert.alert(`Deleting task`, "Are you sure about this?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: () => {
          const db = new DatabaseAPI();
          db.deleteTask(taskId, (val: any) => {
            if (!val) {
              alert("Something went wrong, please contact the developer.");
              return;
            }
            navigate.goBack();
          });
        },
      },
    ]);
  };

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
        <Text style={{ marginBottom: 32 }}>Total time spent: {totalTime}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              },
              {
                backgroundColor: colorScheme.main.color,
                marginRight: 16,
                paddingVertical: 8,
                paddingHorizontal: 32,
                borderRadius: 30,
              },
            ]}
            activeOpacity={0.7}
            onPress={() =>
              navigate.navigate("NewTask", {
                id: taskId,
                name: taskName,
                description: taskDescription,
              })
            }
          >
            <Ionicons
              name="md-add"
              size={28}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
              Add progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              },
              {
                paddingHorizontal: 16,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => deleteTask()}
          >
            <Ionicons
              name="md-trash"
              size={16}
              color={colorScheme.danger.color}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontSize: 16,
                color: colorScheme.danger.color,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
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
              key={index}
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
