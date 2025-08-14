import { View, Text, StyleSheet } from "react-native";
import LogoutButton from "@/components/LogoutButton";

export default function AgendaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuracion</Text>
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
