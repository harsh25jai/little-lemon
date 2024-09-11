import { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import OnboardingScreen from "../screens/Onboarding";

import AppContext from "../context/AppContext";

const Routes = () => {
  const { globalState, setOnboardingCompleted, updateUser } =
    useContext(AppContext);

  const Stack = createNativeStackNavigator();

  const onLoadOnboarding = async () => {
    try {
      const onBoardingInfo = await AsyncStorage.getItem("isOnboardingUser");
      let info = JSON.parse(onBoardingInfo);

      if (info && info != undefined){
        setOnboardingCompleted(info);
      }

    } catch (err) {
      console.log("Routes onLoadOnboarding Error", err);
    }
  };

  useEffect(() => {
    onLoadOnboarding()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="card"
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        {globalState?.isOnboardingCompleted ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
