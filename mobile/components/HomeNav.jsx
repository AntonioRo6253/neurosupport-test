import ViveVector from "@/assets/texture/ViveVector";
import { Colors } from "@/constants/Colors";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";

const HomeNav = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <View
      style={[styles.navContainer, { backgroundColor: theme.gray.Color55 }]}
    >
      <ViveVector
        style={styles.viveVectorBg}
        width="200%"
        height="200%"
        preserveAspectRatio="none"
      />
      <View style={styles.mainNav}>
        <Pressable
          style={[
            styles.navButton,
            {
              backgroundColor: theme.primary.Color20,
              shadowColor: theme.primary.Color40,
            },
          ]}
          onPress={() =>
            router.push({
              pathname: "../discovery",
              params: { category: "pictogramas" },
            })
          }
        >
          <Text
            style={[styles.navButtonText, { color: theme.primary.Color53 }]}
          >
            Pictogramas
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.navButton,
            {
              backgroundColor: theme.primary.Color20,
              shadowColor: theme.primary.Color40,
            },
          ]}
          onPress={() =>
            router.push({
              pathname: "../chatia",
              params: { category: "chatia" },
            })
          }
        >
          <Text
            style={[styles.navButtonText, { color: theme.primary.Color53 }]}
          >
            Chat IA
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.translatorButton,
          {
            backgroundColor: theme.primary.Color10,
            shadowColor: theme.primary.Color40,
          },
        ]}
        onPress={() => router.push("/talk")}
      >
        <Text
          style={[
            styles.translatorButtonText,
            { color: colorScheme === "dark" ? theme.text : "white" },
          ]}
        >
          Traductor de Pictogramas
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingLeft: 16,
    paddingBottom: 16,
    marginTop: -12,
    zIndex: 0,
    overflow: "hidden", // <-- Añade esto para recortar el SVG
  },
  mainNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 16,
  },
  viveVectorBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.8,
  },
  navButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Nunito-Bold",
  },
  translatorButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  translatorButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Nunito-Bold",
  },
});

export default HomeNav;
