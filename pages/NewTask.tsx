import { Text, View, TextInput, ScrollView } from "react-native";
import React, { createRef, useEffect, useRef, useState } from "react";
import { colorScheme, Typography } from "../styles.global";
import { NormalButton, PillButton } from "../components/buttons";
import { TipText } from "../components/assistance";
import { useNavigation } from "@react-navigation/native";

const isWhiteSpace = (str: string) => {
  return !/\S/.test(str);
};

const strictNumeric = (value: string, callback: Function) => {
  const val = parseInt(value);

  if (!val && val != 0) {
    callback("");
    return;
  }
  callback(value);
};

const clearOnTap = (value: string, callback: Function) => {
  const val = parseInt(value);
  if (val != 0) return;
  callback("");
};

const formatOnBlur = (value: string, callback: Function) => {
  const val = parseInt(value);
  if (isWhiteSpace(value) || val == 0) {
    callback("00");
    return;
  }

  callback(val.toString().padStart(2, "0"));
};

export const NewTask = () => {
  const [isMomentum, switchMode] = useState(true);
  const [momentumMinutes, setMomentumMinutes] = useState("0");
  const [timeboxHours, setTimeboxHours] = useState("00");
  const [timeboxMinutes, setTimeboxMinutes] = useState("00");
  const [timeboxSeconds, setTimeboxSeconds] = useState("00");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isSubmitted, setSubmissionState] = useState(false);
  const navigation = useNavigation();
  const taskNameRef = useRef(null);

  const hasTaskDetails = (): boolean => {
    setSubmissionState(true);
    return !isWhiteSpace(taskName);
  };

  const navigateToTimer = () => {
    if (!hasTaskDetails()) {
      alert("You must specify a task name");
      return;
    }

    if (isMomentum) {
      if (parseInt(momentumMinutes) > 0) {
        navigation.navigate("Momentum", {
          momentumMinutes: momentumMinutes,
          taskName: taskName,
          taskDescription: taskDescription,
        });
      } else {
        alert("Frequency must be more than 0");
      }
      return;
    }

    if (
      parseInt(timeboxHours) == 0 &&
      parseInt(timeboxMinutes) == 0 &&
      parseInt(timeboxSeconds) == 0
    ) {
      alert("Timer must not be 00:00:00");
      return;
    }

    navigation.navigate("Timebox", {
      timeboxHours,
      timeboxMinutes,
      timeboxSeconds,
      taskName,
      taskDescription,
    });
  };

  const formatTimebox = () => {
    if (isWhiteSpace(timeboxMinutes)) {
      setTimeboxMinutes("00");
      return;
    }
    let val = parseInt(timeboxMinutes);
    let hours = parseInt(timeboxHours);
    while (val >= 60) {
      val -= 60;
      hours++;
    }
    setTimeboxMinutes(val.toString().padStart(2, "00"));
    setTimeboxHours(hours.toString().padStart(2, "00"));
  };

  const formatTimboxSeconds = () => {
    if (isWhiteSpace(timeboxSeconds)) {
      setTimeboxSeconds("00");
      return;
    }
    let val = parseInt(timeboxSeconds);
    let minutes = parseInt(timeboxMinutes);
    while (val >= 60) {
      val -= 60;
      minutes++;
    }
    setTimeboxSeconds(val.toString().padStart(2, "00"));
    setTimeboxMinutes(minutes.toString().padStart(2, "00"));
  };

  useEffect(() => {
    taskNameRef.current.focus();
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={{
            paddingTop: 8,
            fontSize: 24,
            marginBottom: 16,
          }}
          ref={taskNameRef}
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
          placeholder={"Task Name"}
          placeholderTextColor={
            isSubmitted && isWhiteSpace(taskName)
              ? "red"
              : colorScheme.main.color
          }
        />
        <TextInput
          placeholder="Task description (optional)"
          placeholderTextColor={colorScheme.main.color}
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
          style={{ fontSize: 16 }}
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={256}
          multiline={true}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View
          style={{
            borderBottomColor: "rgba(0,0,0,0.2)",
            borderBottomWidth: 1,
            marginBottom: 32,
            flex: 0.75,
          }}
        />
      </View>
      <View style={{ marginBottom: 24 }}>
        <View
          style={{
            display: isMomentum ? "flex" : "none",
            marginBottom: 16,
            marginHorizontal: 4,
          }}
        >
          <Text style={{ fontSize: 16 }}>Set ping frequency (in minutes)</Text>

          <TextInput
            value={momentumMinutes}
            keyboardType="numeric"
            onChangeText={(value) => strictNumeric(value, setMomentumMinutes)}
            onFocus={() => {
              const val = parseInt(momentumMinutes);
              if (val == 0) {
                setMomentumMinutes("");
                return;
              }
            }}
            onBlur={() => {
              const val = parseInt(momentumMinutes);
              if (!val) {
                setMomentumMinutes("0");
                return;
              }
            }}
            textAlignVertical={"bottom"}
            style={{
              textAlign: "center",
              fontSize: 24,
              borderBottomColor: colorScheme.main.color,
              borderBottomWidth: 1,
              paddingBottom: 0,
              paddingHorizontal: 8,
            }}
          />
        </View>
        <View
          style={{
            marginBottom: 16,
            display: !isMomentum ? "flex" : "none",
            marginHorizontal: 4,
          }}
        >
          <Text style={{ fontSize: 16 }}>Countdown from (hh:mm:ss)</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              keyboardType="numeric"
              value={timeboxHours}
              textAlignVertical={"bottom"}
              onFocus={() => {
                clearOnTap(timeboxHours, setTimeboxHours);
              }}
              onBlur={() => {
                formatOnBlur(timeboxHours, setTimeboxHours);
              }}
              maxLength={2}
              onChangeText={(value) => strictNumeric(value, setTimeboxHours)}
              style={{
                textAlign: "center",
                fontSize: 24,
                borderBottomColor: colorScheme.main.color,
                borderBottomWidth: 1,
                paddingBottom: 0,
                paddingHorizontal: 8,
              }}
            />
            <Text>:</Text>
            <TextInput
              keyboardType="numeric"
              value={timeboxMinutes}
              onFocus={() => clearOnTap(timeboxMinutes, setTimeboxMinutes)}
              onBlur={() => formatTimebox()}
              onChangeText={(value) => strictNumeric(value, setTimeboxMinutes)}
              textAlignVertical={"bottom"}
              maxLength={2}
              style={{
                textAlign: "center",
                fontSize: 24,
                borderBottomColor: colorScheme.main.color,
                borderBottomWidth: 1,
                paddingBottom: 0,
                paddingHorizontal: 8,
              }}
            />
            <Text>:</Text>
            <TextInput
              keyboardType="numeric"
              defaultValue="00"
              textAlignVertical={"bottom"}
              maxLength={2}
              value={timeboxSeconds}
              onFocus={() => clearOnTap(timeboxSeconds, setTimeboxSeconds)}
              onBlur={() => formatTimboxSeconds()}
              onChangeText={(value) => strictNumeric(value, setTimeboxSeconds)}
              style={{
                textAlign: "center",
                fontSize: 24,
                borderBottomColor: colorScheme.main.color,
                borderBottomWidth: 1,
                paddingBottom: 0,
                paddingHorizontal: 8,
              }}
            />
          </View>
        </View>
        <TipText>
          This is a stopwatch that pings every {momentumMinutes} minutes. Best
          for tracking how much time was spent for the task.
        </TipText>
      </View>
      <NormalButton
        text={"Start"}
        onPress={() => navigateToTimer()}
        icon={"md-play"}
      />
      <Text style={{ fontSize: 12, textAlign: "center" }}>
        * Timer will immediately begin upon pressing START
      </Text>
    </ScrollView>
  );
};
