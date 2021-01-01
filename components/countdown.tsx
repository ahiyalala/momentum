import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { buttons, colorScheme } from "../styles.global";
import "../lib/date";
import { Audio } from "expo-av";

const setStartTime = ({ minutes, hours, seconds }: any) => {
  let _date = new Date();
  _date.addHours(hours);
  _date.addMinutes(minutes);
  _date.addSeconds(seconds);

  return _date.getTime();
};

export const Countdown = (props: any) => {
  const { minutes, hours, seconds, onStateChange } = props;
  const endTime = setStartTime({ minutes, hours, seconds });

  const [timerObj, setTimerObj] = useState({
    isActive: true,
    endTime: endTime,
    startTime: Date.now(),
  });
  const [elapsed, setElapsed] = useState(timerObj.endTime - Date.now());
  const [spent, setTimeSpent] = useState({ minutes: 0, seconds: 0, hours: 0 });
  const [sound, setSound] = useState({} as any);
  const endTimer = async () => {
    await sound.playAsync();
    stopTimer();
  };

  useEffect(() => {
    async function setAudio() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/Alarm.mp3")
      );
      setSound(sound);
    }
    setAudio();
  }, []);

  const startTimer = () => {
    setTimerObj({
      isActive: true,
      endTime: setStartTime(spent),
      startTime: timerObj.startTime,
    });
  };

  if (timerObj.isActive) {
    if (elapsed > 0) {
      setTimeout(() => {
        const _elapsed = timerObj.endTime - Date.now();
        setElapsed(_elapsed);
      }, 10);
    } else {
      endTimer();
    }
  }

  const stopTimer = () => {
    setTimerObj({
      isActive: false,
      endTime: timerObj.endTime,
      startTime: timerObj.startTime,
    });
  };

  const clearTimer = () => {
    if (elapsed == 0) return;

    Alert.alert("Clearing progress", "Are you sure you want to proceed?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => setElapsed(Date.now() - Date.now()),
      },
    ]);
  };

  const remainderDate = new Date(elapsed > 0 ? elapsed : 0);
  const remainderHours = remainderDate
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  const remainderMinutes = remainderDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const remainderSeconds = remainderDate
    .getUTCSeconds()
    .toString()
    .padStart(2, "0");

  useEffect(() => {
    onStateChange(timerObj.isActive);
  }, [timerObj.isActive]);
  return (
    <View>
      <Text
        style={stylesheet.timer}
      >{`${remainderHours}:${remainderMinutes}:${remainderSeconds}`}</Text>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  timer: {
    fontSize: 16 * 4,
    textAlign: "center",
  },
  container: {
    borderWidth: 1,
    padding: 16 * 2,
    width: 350,
    height: 350,
    borderRadius: 350 / 2,
    alignContent: "center",
    justifyContent: "center",
  },
  controlPad: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
