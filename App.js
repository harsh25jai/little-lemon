import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AppProvider } from "./context/AppContext";
import Routes from "./navigation/routes";

export default function App() {
  const [fontLoaded, error] = useFonts({
    Karla: require("./assets/fonts/Karla-Regular.ttf"),
    Karla_Bold: require("./assets/fonts/Karla-Bold.ttf"),
    Karla_Medium: require("./assets/fonts/Karla-Medium.ttf"),
    Markazi: require("./assets/fonts/MarkaziText-Regular.ttf"),
  });

  useEffect(() => {}, [fontLoaded]);

  if (!fontLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <AppProvider>
      <View style={styles.container}>
        <Routes />
        <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
