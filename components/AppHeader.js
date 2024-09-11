import { Image, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { images } from "../constants/Image";

const AppHeader = ({ style, left, right, showBack = true, onBackPress }) => {
  return (
    <View style={[styles.header, style]}>
      {showBack ? (
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={onBackPress}
        />
      ) : (
        <View style={{ width: "10%" }} />
      )}

      {left}

      <Image
        source={images.Logo}
        style={{ alignSelf: "center", margin: 10, width: "60%", height: 40 }}
        resizeMethod="auto"
        resizeMode="contain"
      />

      {right}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppHeader;
