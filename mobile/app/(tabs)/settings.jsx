import { View, Text, StyleSheet } from "react-native";

export default function AgendaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuracion</Text>
      {/* Contenido de la agenda aquí */}
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
