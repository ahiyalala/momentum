import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import {
  NormalButton,
  PillButton,
  PillButtonWithIcon,
} from "../components/buttons";
import { Task } from "../components/task";
import { TaskOverview } from "../intrerfaces";
import DatabaseAPI from "../lib/db";
import { colorScheme, Typography } from "../styles.global";

export const TaskOverviewPage = () => {
  const [calendarModal, setCalendarModalVisiblity] = React.useState(false);
  const [selectedDate, setDate] = React.useState(null as Date | null);

  const [tasksToday, getTasks] = React.useState([] as TaskOverview[]);

  React.useEffect(() => {
    const db = new DatabaseAPI();
    db.getTaskOverview((res: any) => {
      getTasks(res);
    });
  }, []);

  React.useEffect(() => {
    const db = new DatabaseAPI();
    if (selectedDate == null) {
      db.getTaskOverview((res: any) => {
        getTasks(res);
      });
      return;
    }
    db.getTaskByDate(selectedDate, (res: any) => {
      getTasks(res);
    });
  }, [selectedDate]);

  const markedDate = selectedDate ?? new Date();

  return (
    <View style={{ paddingTop: 32, paddingHorizontal: 16 }}>
      <Modal animationType="slide" transparent={false} visible={calendarModal}>
        <View style={{ paddingHorizontal: 32, paddingTop: 96 }}>
          <Pressable
            onPress={() => setCalendarModalVisiblity(false)}
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
          <View>
            <View style={{ marginBottom: 32 }}>
              <Calendar
                maxDate={new Date()}
                current={selectedDate ?? new Date()}
                onDayPress={({ dateString }) => {
                  setDate(new Date(dateString));
                  setCalendarModalVisiblity(false);
                }}
                theme={{
                  selectedDayBackgroundColor: colorScheme.main.color,
                  selectedDayTextColor: "#fff",
                }}
              />
            </View>
            <View>
              <PillButtonWithIcon
                text="Clear"
                icon="md-close"
                style={{ zIndex: 3 }}
                onPress={() => {
                  setDate(null);
                  setCalendarModalVisiblity(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <PillButtonWithIcon
        text={selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
        icon={"md-calendar"}
        style={{ width: 200, marginBottom: 32 }}
        onPress={() => setCalendarModalVisiblity(true)}
      />
      <ScrollView style={{ flexGrow: 1 }}>
        {tasksToday.length > 0 ? (
          generateTasks(tasksToday)
        ) : (
          <Text style={[Typography.h4, { color: "#999", textAlign: "center" }]}>
            No tasks here :(
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const generateTasks = (tasks: TaskOverview[]) => {
  const navigation = useNavigation();
  return tasks.map((task, index) => {
    return (
      <Task
        key={index}
        id={task.taskId}
        name={task.taskName}
        description={task.taskDescription}
        totalSeconds={task.totalElapsed}
        lastUpdate={task.localstarttime}
        onPress={() => navigation.navigate("TaskDetails", { task: task })}
      />
    );
  });
};
