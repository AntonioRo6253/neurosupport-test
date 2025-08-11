import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import MainLogo from "../assets/icons/MainLogo";

const HomeHeader = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <View
      style={[styles.header, { backgroundColor: themeColors.gray.Color58 }]}
    >
      <Text style={[styles.appTitle, { color: themeColors.primary.Color60 }]}>
        {["Neuro", "Support"].map((word, idx) => (
          <Text key={idx}>
            <Text
              style={[
                styles.appTitleFirstLetter,
                { color: themeColors.primary.Color40 },
              ]}
            >
              {word[0]}
            </Text>
            {word.slice(1)}
            {idx === 0 ? " " : ""}
          </Text>
        ))}
      </Text>
      <MainLogo height={60} width={60} viewBox={"0 0 215 285"} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    flexShrink: 0,
    flex: 1,
    flexWrap: "wrap",
    padding: 8,
    paddingTop: 36,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 1,
  },
  appTitle: {
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 44,
  },
  appTitleFirstLetter: {
    fontFamily: "Nunito",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "700",
  },
});

export default HomeHeader;
