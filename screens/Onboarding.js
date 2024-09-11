import { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import { images } from "../constants/Image";
import { fonts } from "../constants/Fonts";
import { colors } from "../constants/Colors";
import AppContext from "../context/AppContext";

const OnboardingScreen = ({ navigation, route }) => {
  const { setOnboardingCompleted, updateUser } = useContext(AppContext);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateName = () => {
    if (firstName == "") {
      setFirstNameError("Please enter First Name.");
    } else if (firstName?.length <= 3) {
      setFirstNameError("Please enter more than 3 characters.");
    } else {
      setFirstNameError("");
    }
  };

  const validateEmail = () => {
    if (email == "") {
      setEmailError("Please enter Email.");
    } else if (email?.length <= 6) {
      setEmailError("Please enter correct email.");
    } else {
      setEmailError("");
    }
  };

  const onPressNext = async () => {
    console.log("Next");
    if (firstName != "" && email != "") {
      try {
        let user = { firstName, email };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("isOnboardingUser", JSON.stringify(true));

        updateUser({ firstName, email });
        setOnboardingCompleted(true);
      } catch (error) {
        console.error("Onboarding Screen onPressNext Error", error);
      }
    } else {
      Alert.alert(
        "Alert",
        `${firstName == "" ? "First Name" : "Email"} is required.`
      );
    }
  };

  useEffect(() => {
    const nameValid = firstName?.length > 3;
    const emailValid = email?.length > 6 && email?.includes("@");

    if (nameValid && emailValid) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email, firstName]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#dee3e9" }}>
        <Image
          source={images.Logo}
          style={styles.logo}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.LIGHT_GREY,
        }}
      >
        <Text style={[styles.text, { flex: 0.5 }]}>Let us get to know you</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          onBlur={validateName}
          keyboardType="default"
          selectionColor={colors.YELLOW}
          cursorColor={colors.YELLOW}
          style={styles.textinput}
        />
        {firstNameError != "" && (
          <Text style={styles.errortext}>{firstNameError}</Text>
        )}

        <Text style={styles.text}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          onBlur={validateEmail}
          keyboardType="email-address"
          selectionColor={colors.YELLOW}
          cursorColor={colors.YELLOW}
          style={styles.textinput}
        />
        {emailError != "" && <Text style={styles.errortext}>{emailError}</Text>}
      </View>

      <View
        style={{
          flex: 0.2,
          alignItems: "flex-end",
        }}
      >
        <AppButton
          title={"Next"}
          disabled={buttonDisabled}
          onPress={onPressNext}
          mode={buttonDisabled ? "disabled" : "primary"}
          style={{ borderWidth: 0, margin: 30 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 50,
    width: "100%",
    margin: 10,
    marginTop: "10%",
    alignSelf: "center",
  },
  text: {
    margin: 8,
    fontSize: 20,
    fontFamily: fonts.KarlaBold,
  },
  textinput: {
    width: "80%",
    margin: 8,
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "black",
    fontFamily: fonts.Karla,
  },
  button: {
    margin: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#ccd2d9",
  },
  errortext: {
    width: "80%",
    alignSelf: "center",
    color: "red",
    fontSize: 12,
    fontFamily: fonts.Karla,
  },
});

export default OnboardingScreen;
