import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AppHeader from "../components/AppHeader";
import { images } from "../constants/Image";
import { colors } from "../constants/Colors";
import { MenuUrl } from "../constants/URL";
import { fonts } from "../constants/Fonts";

const HomeScreen = ({ navigation, route }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchMenuItems = () => {
    fetch(MenuUrl)
      .then((res) => res.json())
      .then((res) => {
        setMenuItems(res.menu);

        const category = Array.from(
          new Set(res.menu.map((item) => item.category))
        );
        setCategories(category);
      })
      .catch((err) => console.log("fetchMenuItems Error", err));
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const HeroSection = ({ setSearchInput, disableSearch }) => {
    return (
      <View style={styles.heroSection}>
        <Text style={styles.heroLL}>Little Lemon</Text>
        <Text style={styles.heroChicago}>Chicago</Text>
        <View style={styles.heroDescImageContainer}>
          <Text style={styles.heroDescription}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
          <Image source={images.HeroImage} style={styles.heroImage} />
        </View>

        {showSearch ? (
          <View style={styles.searchBarContainer}>
            <Image source={images.SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              onChangeText={setSearchInput}
            />
          </View>
        ) : (
          <Pressable style={styles.searchContainer} onPress={() => setShowSearch(true)}>
            <Image source={images.SearchIcon} style={styles.searchHomeIcon} />
          </Pressable>
        )}
      </View>
    );
  };

  const MenuItemComponent = ({ title, description, price, image }) => {
    return (
      <View style={styles.menuItem}>
        <View style={styles.menuDetails}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text numberOfLines={2} style={styles.itemDescription}>
            {description}
          </Text>
          <Text style={styles.itemPrice}>${price}</Text>
        </View>
        <View style={styles.itemImageContainer}>
          <Image source={{ uri: image }} style={styles.menuImage} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        showBack={false}
        right={
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={images.Profile}
              style={{ margin: 10, width: 50, height: 50 }}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </Pressable>
        }
      />

      <ScrollView style={{ flex: 1 }}>
        <HeroSection />
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => item.name + index}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                width: "90%",
                backgroundColor: "grey",
                alignSelf: "center",
              }}
            />
          )}
          renderItem={({ item }) => (
            <MenuItemComponent
              title={item.name}
              description={item.description}
              price={item.price}
              image={`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}
            />
          )}
        />

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

  heroSection: {
    padding: 10,
    backgroundColor: colors.GREEN,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "#f2f2f2",
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchHomeIcon: {
    width: 28,
    height: 28,
  },
  searchContainer: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 20,
    borderRadius: 28,
    backgroundColor: colors.LIGHT_GREY,
  },
  heroLL: {
    fontSize: 60,
    fontFamily: fonts.Markazi,
    color: colors.YELLOW,
  },
  heroChicago: {
    fontSize: 40,
    fontFamily: fonts.Markazi,
    marginTop: -20,
    color: colors.GRAY,
  },
  heroDescImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroDescription: {
    fontSize: 15,
    color: colors.GRAY,
    maxWidth: 200,
    fontFamily: fonts.Karla,
    marginTop: 10,
    marginBottom: 10,
  },
  heroImage: {
    height: 140,
    width: 120,
    marginTop: -30,
    borderRadius: 20,
  },

  menuItem: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  menuDetails: {
    flex: 1,
    gap: 10,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: fonts.KarlaBold,
  },
  itemDescription: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: fonts.Karla,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: fonts.Karla,
  },
  itemImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: "black",
  },
  menuImage: {
    resizeMode: "cover",
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
