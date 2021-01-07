import {
  StyleProp,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface ITask extends Basic {
  id: number;
  name: string;
  description?: string;
  totalSeconds: number;
  timestamps?: Timestamp[];
  onPress?: any;
}

export interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
  totalElapsed: number;
}

export interface Progress {
  progressId?: number;
  taskId: number;
  startTime: string;
  endTime: string;
  elapsed: number;
}

export interface AddTaskParam {
  taskName: string;
  taskDescription: string;
  elapsed: number;
  startTime: string;
  endTime: string;
  callback(val: boolean): void;
}

export interface MomentumTimerProps extends Basic {
  minutes: number;
  onTimePass: Function;
  onStateChange: Function;
}

interface Timestamp {
  startTimestamp: Date;
  endTimestamp: Date;
}

export interface ElapsedTime {
  minutes: number;
  hours: number;
  seconds: number;
}

interface Basic {
  style?: StyleProp<ViewStyle>;
}

export interface TaskOverview {
  localstarttime: string;
  taskDescription: string;
  taskId: number;
  taskName: string;
  totalElapsed: number;
}

export interface TaskHistory {
  endTime: Date;
  startTime: Date;
  elapsed: number;
}
