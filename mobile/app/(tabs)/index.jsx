import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import CardCarousel from "@/components/CardCarousel";
import { Colors } from "@/constants/Colors";
import HomeHeader from "@/components/HomeHeader";
import HomeNav from "@/components/HomeNav";
import HomeAbout from "@/components/HomeAbout";
import cardsJson from "@/localdata/cardsData.json";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];
  const cardsData = cardsJson.cardsData;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.gray.Color58 }]}
      contentContainerStyle={styles.contentContainer}
    >
      <HomeHeader />
      <HomeNav />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary.Color40 }]}>
          Herramientas de Apoyo
        </Text>
        <CardCarousel cards={cardsData} />
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary.Color40 }]}>
          Consejos
        </Text>
        <CardCarousel cards={cardsData} />
      </View>

      <HomeAbout />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // El color de fondo se asigna dinámicamente
  },
  contentContainer: { paddingBottom: 20 },

  section: {
    marginBottom: 32,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    // El color se asigna dinámicamente
    fontFamily: "Nunito-Bold",
  },
});
