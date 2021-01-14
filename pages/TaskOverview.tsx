import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Task } from "../components/task";
import { TaskOverview } from "../intrerfaces";
import DatabaseAPI from "../lib/db";

export const TaskOverviewPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [tasksToday, getTasks] = React.useState([] as TaskOverview[]);

  React.useEffect(() => {
    const db = new DatabaseAPI();
    db.getTaskOverview((res: any) => {
      getTasks(res);
    });
  }, []);
  return (
    <View style={{ paddingTop: 32, paddingHorizontal: 16 }}>
      {tasksToday.map((task, index) => {
        return (
          <Task
            key={index}
            id={task.taskId}
            name={task.taskName}
            description={task.taskDescription}
            totalSeconds={task.totalElapsed}
            onPress={() => navigation.navigate("TaskDetails", { task: task })}
          />
        );
      })}
    </View>
  );
};
