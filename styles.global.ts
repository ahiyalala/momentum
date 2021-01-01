import { StyleSheet } from "react-native";

// Functions

const rem = (num: number) => {
  return num * 16;
};

// Rules

export const colorScheme = StyleSheet.create({
  positive: { color: "#4CAF50" },
  danger: { color: "#D84315" },
  warning: { color: "#FBC02D" },
  info: { color: "#0288D1" },
  disabled: { color: "#ddd" },
  main: { color: "#9966cc" },
});

export const buttons = StyleSheet.create({
  buttons: {
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 20,
    padding: 8,
    textTransform: "uppercase",
  },
});

export const display = StyleSheet.create({
  hidden: {
    display: "none",
  },
});

export const Layout = StyleSheet.create({
  outerBox: {
    paddingHorizontal: rem(1),
    paddingTop: rem(4),
  },
});

const Font = StyleSheet.create({
  lato: {
    fontFamily: "Lato_400Regular",
  },
});

export const Typography = StyleSheet.create({
  h1: {
    ...Font.lato,
    fontSize: rem(2.5),
  },
  h2: {
    ...Font.lato,
    fontSize: rem(2),
  },
  h3: {
    ...Font.lato,
    fontSize: rem(1.5),
  },
  h4: {
    ...Font.lato,
    fontSize: rem(1),
    marginBottom: rem(0.5),
  },
});

export const Shadowing = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
  },
  elevatedCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
