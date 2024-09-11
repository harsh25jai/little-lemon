import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../constants/Colors";
import { fonts } from "../constants/Fonts";

const AppButton = ({
  onPress,
  title,
  style,
  mode = "primary",
  textStyle,
  disabled = false,
}) => {
  const backgroundColor =
    mode == "disabled"
      ? colors.LIGHT_GREY
      : mode == "secondary"
      ? "white"
      : colors.GREEN;

  const textColor =
    mode == "disabled" ? "black" : mode == "secondary" ? colors.GREEN : "white";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, { backgroundColor: backgroundColor }, style]}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 8,
    fontSize: 20,
    textAlign: "center",
    fontFamily: fonts.KarlaMedium,
  },
  button: {
    margin: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.GREEN,
    borderColor: colors.GREEN,
  },
});

export default AppButton;
