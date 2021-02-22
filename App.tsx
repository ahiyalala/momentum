import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TaskDetails } from "./pages/TaskDetails";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { AppLoading } from "expo";
import { NewTask } from "./pages/NewTask";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "./styles.global";
import { Momentum } from "./pages/Momentum";
import { Timebox } from "./pages/Timebox";
import * as SQLite from "expo-sqlite";
import DatabaseAPI from "./lib/db";
import { TaskOverview, TaskOverviewPage } from "./pages/TaskOverview";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({ Lato_400Regular });

  React.useEffect(() => {
    const db = new DatabaseAPI();
    db.loadDb();
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        };
      },
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colorScheme.main.color} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskDetails"
            component={TaskDetails}
            options={{ title: "Details" }}
          />
          <Stack.Screen
            name="NewTask"
            component={NewTask}
            options={{ title: "Add new task" }}
          />
          <Stack.Screen
            name="Momentum"
            component={Momentum}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Timebox"
            component={Timebox}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskOverview"
            component={TaskOverviewPage}
            options={{ title: "Tasks" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
