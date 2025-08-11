import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";

const Card = ({ title, description, imageUrl }) => {
  const [showDescription, setShowDescription] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const pressTimer = useRef(null);
  const router = useRouter();
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const handlePressIn = () => {
    pressTimer.current = setTimeout(() => {
      setShowDescription(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, 500); // 500 ms para activar
  };

  const handlePressOut = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (showDescription) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setShowDescription(false));
    }
  };

  const handleCardPress = () => {
    router.push({
      pathname: "(tabs)/discovery/[postid]",
      params: { title, description, imageUrl },
    });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleCardPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.background,
          shadowColor: colorScheme === "dark" ? "#000" : "#000",
        },
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {showDescription && (
          <Animated.Text
            style={[
              styles.description,
              { color: theme.Gray?.Color54 || "#666", opacity },
            ]}
          >
            {description}
          </Animated.Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default Card;
