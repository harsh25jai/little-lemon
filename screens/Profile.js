import { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";

import { images } from "../constants/Image";
import { colors } from "../constants/Colors";
import { fonts } from "../constants/Fonts";
import AppContext from "../context/AppContext";

const ProfileScreen = ({ navigation, route }) => {
  const { setOnboardingCompleted, updateUser } = useContext(AppContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailNotification, setEmailNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    news: false,
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("emailNotification");

      updateUser({});
      setOnboardingCompleted(false);
    } catch (err) {
      console.log("ProfileScreen onLogout Error", err);
    }
  };

  const onSaveChanges = async () => {
    try {
      let user = { firstName, email, lastName, phoneNo };
      await AsyncStorage.setItem("user", JSON.stringify(user));

      updateUser(user);

      await AsyncStorage.setItem(
        "emailNotification",
        JSON.stringify(emailNotification)
      );
    } catch (err) {
      console.log("ProfileScreen onSaveChanges Error", err);
    }
  };

  const onLoadUser = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user");
      let user = JSON.parse(userInfo);

      const notification = await AsyncStorage.getItem("emailNotification");
      let emailInfo = JSON.parse(notification);

      user?.firstName != undefined ? setFirstName(user?.firstName) : null;
      user?.lastName != undefined ? setLastName(user?.lastName) : null;
      user?.email != undefined ? setEmail(user?.email) : null;
      user?.phoneNo != undefined ? setPhoneNo(user?.phoneNo) : null;
      emailInfo != null ? setEmailNotifications(emailInfo) : null;

      setFirstNameError("");
      setEmailError("");
    } catch (err) {
      console.log("ProfileScreen onLoadUser Error", err);
    }
  };

  useEffect(() => {
    onLoadUser();
  }, []);

  const CheckboxItem = ({ checked = false, onPress, label }) => {
    return (
      <Pressable
        style={{
          width: "100%",
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
          {checked && <FontAwesome5 name="check" size={20} color="white" />}
        </View>

        <Text style={[styles.textLabel, { marginBottom: 8 }]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        onBackPress={() => navigation.goBack()}
        right={
          <Image
            source={images.Profile}
            style={{ margin: 10, width: 50, height: 50 }}
            resizeMethod="auto"
            resizeMode="contain"
          />
        }
      />

      <ScrollView
        style={{
          flex: 1,
          borderRadius: 8,
          borderColor: "black",
          borderWidth: 0.5,
        }}
      >
        <Text style={[styles.text]}>Personal Information</Text>

        <Text style={[styles.textLabel]}>Avatar</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Image
            source={images.Profile}
            style={{ margin: 10, width: 80, height: 80 }}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <AppButton title={"Change"} />

          <AppButton
            mode="secondary"
            title={"Remove"}
            style={{ borderRadius: 0 }}
          />
        </View>

        <Text style={styles.textLabel}>First Name</Text>
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

        <Text style={styles.textLabel}>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          keyboardType="default"
          style={styles.textinput}
        />

        <Text style={styles.textLabel}>Email</Text>
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

        <Text style={styles.textLabel}>Phone number</Text>
        <TextInput
          value={phoneNo}
          onChangeText={setPhoneNo}
          keyboardType="number-pad"
          style={styles.textinput}
        />

        <Text style={[styles.text]}>Email Notifications</Text>
        <CheckboxItem
          label={"Order statuses"}
          checked={emailNotification.orderStatuses}
          onPress={() =>
            setEmailNotifications({
              ...emailNotification,
              orderStatuses: !emailNotification.orderStatuses,
            })
          }
        />
        <CheckboxItem
          label={"Password changes"}
          checked={emailNotification.passwordChanges}
          onPress={() =>
            setEmailNotifications({
              ...emailNotification,
              passwordChanges: !emailNotification.passwordChanges,
            })
          }
        />
        <CheckboxItem
          label={"Special offers"}
          checked={emailNotification.specialOffers}
          onPress={() =>
            setEmailNotifications({
              ...emailNotification,
              specialOffers: !emailNotification.specialOffers,
            })
          }
        />
        <CheckboxItem
          label={"News"}
          checked={emailNotification.news}
          onPress={() => {
            console.log("email", emailNotification);
            setEmailNotifications({
              ...emailNotification,
              news: !emailNotification.news,
            });
          }}
        />

        <AppButton
          onPress={onLogout}
          title={"Log out"}
          style={{
            marginVertical: 30,
            padding: 4,
            backgroundColor: colors.YELLOW,
            borderColor: colors.ORANGE,
          }}
          textStyle={{ color: colors.BLACK, fontFamily: fonts.KarlaBold }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <AppButton
            mode="secondary"
            title={"Discard changes"}
            onPress={onLoadUser}
          />

          <AppButton title={"Save changes"} onPress={onSaveChanges} />
        </View>

        <View style={{ margin: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 8,
    fontSize: 20,
    fontFamily: fonts.KarlaBold,
  },
  textLabel: {
    margin: 8,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: fonts.Karla,
  },
  textinput: {
    width: "90%",
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccd2d9",
  },
  errortext: {
    width: "90%",
    alignSelf: "center",
    color: "red",
    fontSize: 12,
    fontFamily: fonts.Karla,
  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.GREEN,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: colors.GREEN,
  },
});

export default ProfileScreen;
