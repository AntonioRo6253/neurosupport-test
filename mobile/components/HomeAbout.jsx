import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  Pressable,
  Linking,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JalisVector from "@/assets/texture/JalisVector";
import socialLinks from "@/localdata/socialLinks.json";

const HomeAbout = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <View
      style={[
        styles.aboutContainer,
        {
          backgroundColor: themeColors.gray.Color55,
          shadowColor: themeColors.primary.Color40,
        },
      ]}
    >
      <JalisVector
        style={styles.jalisVectorBg}
        width="200%"
        height="200%"
        preserveAspectRatio="none"
      />
      <Text style={[styles.aboutTitle, { color: themeColors.primary.Color70 }]}>
        ¿Quiénes somos?
      </Text>
      <Text
        style={[styles.aboutDescription, { color: themeColors.gray.Color53 }]}
      >
        NeuroSupport es una plataforma dedicada a mejorar la comunicación y
        calidad de vida de personas con necesidades especiales a través de
        pictogramas y herramientas digitales accesibles.
      </Text>

      <View style={styles.socialIconsContainer}>
        {socialLinks.socialLinks.map((item) => (
          <Pressable
            key={item.name}
            onPress={() => Linking.openURL(item.url)}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            accessibilityLabel={item.name}
          >
            <Ionicons
              name={item.name}
              size={32}
              color={themeColors.primary.Color40}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    padding: 24,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: "hidden",
    position: "relative",
  },
  jalisVectorBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.5,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "Nunito-Bold",
  },
  aboutDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: "Nunito-Regular",
  },
  socialIconsContainer: {
    flexDirection: "row",
    gap: 24,
  },
});

export default HomeAbout;
