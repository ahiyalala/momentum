import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
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
import { GraphData, TaskOverview } from "../intrerfaces";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "../components/buttons";
import { useFocusEffect } from "@react-navigation/native";
import App from "../App";
import { MenuItem } from "../components/menuItem";
import { secondsToTime } from "../lib/helper";

const Home = ({ navigation }: any) => {
  const [tasksToday, getTasks] = React.useState([] as TaskOverview[]);
  const [menuModal, setMenuModalVisibility] = React.useState(false);
  const [tasksYesterday, getTasksFromYesterday] = React.useState(
    [] as TaskOverview[]
  );
  const [elapsedCount, getGraphData] = React.useState(null as GraphData | null);

  useFocusEffect(
    React.useCallback(() => {
      const db = new DatabaseAPI();
      db.getTasksToday((res: TaskOverview[]) => {
        getTasks(res);
      });
      db.getTasksYesterday((res: TaskOverview[]) => {
        getTasksFromYesterday(res);
      });
      db.getSumOfElapsedPerDay((res: GraphData[]) => {
        getGraphData(res[0]);
      });
    }, [])
  );

  const openingUrl = (url: string) => {
    Alert.alert(
      "Exiting Momentum",
      "You are visiting a page outside the app, do you want to continue?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Proceed",
          onPress: () => Linking.openURL(url),
        },
      ]
    );
  };

  const elapsedString = secondsToTime(parseInt(elapsedCount?.y ?? "0"));

  return (
    <SafeAreaView style={[Layout.outerBox, { flex: 1, paddingBottom: 70 }]}>
      <Modal animationType="slide" transparent={false} visible={menuModal}>
        <View style={{ paddingHorizontal: 32, paddingTop: 48 }}>
          <Pressable
            onPress={() => setMenuModalVisibility(false)}
            style={{
              position: "absolute",
              right: 32,
              top: 32,
              padding: 16,
              zIndex: 2,
            }}
          >
            <Ionicons name="md-close" color="#ccc" size={32} />
          </Pressable>
          <View style={{ marginBottom: 32 }}>
            <Image
              style={{ width: 40, height: 40, marginBottom: 16 }}
              source={require("../assets/icon.png")}
            />
            <Text style={[Typography.h2]}>Momentum</Text>
            <Text style={[Typography.h4, colorScheme.disabled]}>v1.1.0</Text>
          </View>
          <View>
            <MenuItem
              onPress={() =>
                openingUrl("https://chronolala.github.io/privacy-policy")
              }
              title="Privacy Notice"
            />
            <MenuItem
              onPress={() =>
                openingUrl("https://chronolala.github.io/terms-and-condition")
              }
              title="Terms and Condition"
            />
            <MenuItem
              onPress={() => openingUrl("mailto:chronolala.1994@gmail.com")}
              title="Contact Us"
            />
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{
          paddingHorizontal: Platform.OS == "ios" ? 16 : 0,
          paddingTop: Platform.OS == "ios" ? 32 : 0,
        }}
      >
        <Text style={[Typography.h1, { marginBottom: 32 }]}>Welcome!</Text>
        <Text style={[Typography.h4, { marginBottom: 16 }]}>
          Your day so far
        </Text>
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
          ) : (
            <Text style={[{ marginBottom: 16, color: "black", fontSize: 20 }]}>
              In total: {elapsedString}
            </Text>
          )}
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
          {tasksYesterday.length == 0 ? (
            <Text
              style={{
                color: "#a2a2a2",
                textAlign: "center",
                marginVertical: 16,
              }}
            >
              No tasks yesterday
            </Text>
          ) : null}
          {tasksYesterday.map((task, index) => {
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
          icon="md-menu"
          text="Menu"
          style={{ marginRight: "auto" }}
          onPress={() => setMenuModalVisibility(true)}
        />
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
