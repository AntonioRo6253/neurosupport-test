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
  const [longPressActive, setLongPressActive] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current; // Empieza 30px abajo
  const pressTimer = useRef(null);
  const router = useRouter();
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const handlePressIn = () => {
    setLongPressActive(false);
    pressTimer.current = setTimeout(() => {
      setLongPressActive(true);
      setShowDescription(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  };

  const handlePressOut = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (showDescription) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowDescription(false));
    }
  };

  const handleCardPress = () => {
    if (!longPressActive) {
      router.push({
        pathname: "(tabs)/discovery/[postid]",
        params: { title, description, imageUrl },
      });
    }
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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Título siempre visible */}
        <View style={styles.titleOverlay}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>
        {/* Descripción animada */}
        {showDescription && (
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity,
                transform: [{ translateY }],
                backgroundColor: theme.background + "ee",
              },
            ]}
          >
            <Text
              style={[
                styles.description,
                { color: theme.Gray?.Color54 || "#666" },
              ]}
            >
              {description}
            </Text>
          </Animated.View>
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
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1.6, // Ajusta la altura de la tarjeta
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.3)", // Fondo semitransparente opcional
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
  },
  description: {
    fontSize: 14,
  },
});

export default Card;
