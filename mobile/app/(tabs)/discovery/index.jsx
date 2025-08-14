import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DiscoveryScreen() {
  const { category } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, color: "white" }}>Discovery</Text>
      <Text style={{ marginTop: 16, color: "white" }}>
        Categoría: {category}
      </Text>
    </View>
  );
}
