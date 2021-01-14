import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import * as React from "react";
import { colorScheme, Layout, Shadowing, Typography } from "../styles.global";
import PureChart from "react-native-pure-chart";
import { Task } from "../components/task";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AddNewTask } from "../components/addButton";
import DatabaseAPI from "../lib/db";
import { AppLoading } from "expo";
import { TaskOverview } from "../intrerfaces";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "../components/buttons";
import { useFocusEffect } from "@react-navigation/native";
let sampleData = [
  {
    seriesName: "series1",
    data: [
      { x: "12/11", y: parseInt((Math.random() * 100).toString()) },
      { x: "12/12", y: parseInt((Math.random() * 100).toString()) },
      { x: "12/13", y: parseInt((Math.random() * 100).toString()) },
      { x: "12/14", y: parseInt((Math.random() * 100).toString()) },
      { x: "12/15", y: parseInt((Math.random() * 100).toString()) },
      { x: "12/16", y: parseInt((Math.random() * 100).toString()) },
      { x: "12/17", y: parseInt((Math.random() * 100).toString()) },
    ],
    color: "#9966cc",
  },
];

const Home = ({ navigation }: any) => {
  const [tasksToday, getTasks] = React.useState([] as TaskOverview[]);

  useFocusEffect(
    React.useCallback(() => {
      const db = new DatabaseAPI();
      db.getTasksToday((res: any) => {
        getTasks(res);
      });
    }, [])
  );

  return (
    <SafeAreaView style={[Layout.outerBox, { flex: 1, paddingBottom: 70 }]}>
      <ScrollView
        style={{
          paddingHorizontal: Platform.OS == "ios" ? 16 : 0,
          paddingTop: Platform.OS == "ios" ? 32 : 0,
        }}
      >
        <Text style={[Typography.h1, { marginBottom: 32 }]}>Welcome!</Text>
        <Text style={[Typography.h4]}>Your week at a glance</Text>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 16,
          }}
        >
          <PureChart
            data={sampleData}
            type="line"
            height={100}
            defaultColumnWidth={10}
            width={"100%"}
            xAxisGridLineColor={"rgba(0,0,0,0)"}
            backgroundColor={"rgba(0,0,0,0)"}
          />
        </View>
        <Text style={[Typography.h4]}>Your day so far</Text>
        <View style={{ marginHorizontal: 4, marginBottom: 24 }}>
          {tasksToday.length == 0 ? (
            <Text
              style={{
                color: "#a2a2a2",
                textAlign: "center",
                marginVertical: 16,
              }}
            >
              No tasks today
            </Text>
          ) : null}
          {tasksToday.map((task, index) => {
            return (
              <Task
                key={index}
                id={task.taskId}
                name={task.taskName}
                totalSeconds={task.totalElapsed}
                onPress={() =>
                  navigation.navigate("TaskDetails", { task: task })
                }
              />
            );
          })}
        </View>
        <Text style={[Typography.h4]}>What you did yesterday</Text>
        <View style={{ marginHorizontal: 4, marginBottom: 24 }}>
          <Text
            style={{
              color: "#a2a2a2",
              textAlign: "center",
              marginVertical: 16,
            }}
          >
            No tasks today
          </Text>
        </View>
      </ScrollView>
      <View
        style={[
          {
            position: "absolute",
            bottom: 0,
            height: 64,
            left: 0,
            right: 0,
            backgroundColor: "white",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 8,
          },
          Shadowing.elevatedCard,
        ]}
      >
        <IconButton
          icon="md-calendar"
          text="Tasks"
          onPress={() => navigation.navigate("TaskOverview")}
        />
        <View
          style={{
            marginTop: -40,
            backgroundColor: colorScheme.main.color,
            width: 80,
            height: 80,
            borderRadius: 100,
            marginHorizontal: 16,
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", padding: 8 }}
            onPress={() => navigation.navigate("NewTask")}
          >
            <Ionicons name="md-add" size={48} color="white" />
            <Text style={{ color: "white", fontSize: 8 }}>ADD TASK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
