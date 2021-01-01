import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MomentumTimerProps } from "../intrerfaces";
import { buttons, colorScheme } from "../styles.global";
import { Audio } from "expo-av";
import DatabaseAPI from "../lib/db";

export default function Timer(props: MomentumTimerProps) {
  const { minutes, onTimePass, style, onStateChange } = props;
  const [timerObj, setTimerObj] = useState({
    isActive: true,
    startTime: Date.now(),
    storedElapsed: 0,
  });
  const [elapsed, setElapsed] = useState(Date.now() - Date.now());
  const [flick, setFlicker] = useState(0);
  const [sound, setSound] = useState({} as any);

  const startTimer = () => {
    setTimerObj({
      isActive: true,
      startTime: Date.now(),
      storedElapsed: timerObj.storedElapsed,
    });
  };

  useEffect(() => {
    async function setAudio() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/Lap.mp3")
      );
      setSound(sound);
    }
    setAudio();
  }, []);

  const stopTimer = () => {
    setTimerObj({
      isActive: false,
      startTime: timerObj.startTime,
      storedElapsed: timerObj.storedElapsed + elapsed,
    });
  };

  useEffect(() => {
    onTimePass(timerObj.storedElapsed);
    onStateChange(timerObj.isActive);
  }, [timerObj.storedElapsed, timerObj.isActive]);

  if (timerObj.isActive) {
    setTimeout(() => {
      let _elapsed = 0;
      _elapsed = Date.now() - timerObj.startTime;
      setElapsed(_elapsed);
    }, 10);
  }

  const clearTimer = () => {
    if (elapsed == 0) return;
    const _timerObj = timerObj;
    _timerObj.storedElapsed = Date.now() - Date.now();
    Alert.alert(
      "Clear progress",
      "Are you sure you want to reset your timer?",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setElapsed(0);
            setTimerObj(_timerObj);
          },
        },
      ]
    );
  };

  const controlTimer = () => {
    setElapsed(0);
    if (timerObj.isActive) {
      stopTimer();
    } else {
      startTimer();
    }
  };
  const elapsedVal = timerObj.isActive
    ? elapsed + timerObj.storedElapsed
    : timerObj.storedElapsed;
  const elapsedDate = new Date(elapsedVal);
  const elapsedHours = elapsedDate.getUTCHours().toString().padStart(2, "0");
  const elapsedMinutes = elapsedDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const elapsedSeconds = elapsedDate
    .getUTCSeconds()
    .toString()
    .padStart(2, "0");
  const elapsedMilliseconds = (elapsedDate.getUTCMilliseconds() / 10)
    .toFixed(0)
    .toString()
    .slice(0, 2)
    .padStart(2, "0");

  const elapsedString =
    parseInt(elapsedHours) > 0
      ? `${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`
      : `${elapsedMinutes}:${elapsedSeconds}.${elapsedMilliseconds}`;

  useEffect(() => {
    setFlicker(parseInt(elapsedMinutes));
  }, [elapsedMinutes]);

  useEffect(() => {
    async function playAudio() {
      await sound.playAsync();
    }
    if (flick >= minutes) {
      playAudio();
      setFlicker(0);
    }
  }, [flick]);

  return (
    <View style={style}>
      <Text style={[stylesheet.timer, { fontFamily: "Lato_400Regular" }]}>
        {elapsedString}
      </Text>
      <View style={stylesheet.controlPad}>
        <TouchableOpacity
          style={buttons.buttons}
          onPress={() => controlTimer()}
        >
          <Text
            style={[
              buttons.buttonText,
              timerObj.isActive ? colorScheme.danger : colorScheme.positive,
              { fontFamily: "Lato_400Regular" },
            ]}
          >
            {timerObj.isActive ? "Stop" : elapsed > 0 ? "Continue" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttons.buttons}
          onPress={() => clearTimer()}
          disabled={timerObj.isActive}
        >
          <Text
            style={[
              buttons.buttonText,
              timerObj.isActive ? colorScheme.disabled : colorScheme.danger,
              { fontFamily: "Lato_400Regular" },
            ]}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
