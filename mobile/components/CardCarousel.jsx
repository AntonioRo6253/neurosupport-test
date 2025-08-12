import { View, Dimensions, Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import Card from "./Card";

const { width: screenWidth } = Dimensions.get("window");

const VerMasCard = ({ onPress }) => (
  <View style={{ width: screenWidth }}>
    <Pressable
      style={styles.verMasCard}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Ver más pictogramas"
    >
      <Text style={styles.verMasCardTitle}>Ver más</Text>
      <Text style={styles.verMasCardDesc}>
        Explora todos los pictogramas disponibles
      </Text>
    </Pressable>
  </View>
);

const CardCarousel = ({ cards }) => {
  const router = useRouter();

  // Agrega la card "Ver más" al final del array
  const dataWithVerMas = [...cards, { id: "ver-mas-card" }];

  // Renderiza cada item
  const renderItem = ({ item }) =>
    item.id === "ver-mas-card" ? (
      <VerMasCard onPress={() => router.push("/Pictogramas")} />
    ) : (
      <View style={{ width: screenWidth }}>
        <Card
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      </View>
    );

  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "basic-layouts", name: "left-align" }}
    >
      <Carousel
        loop={false}
        width={screenWidth}
        height={258}
        snapEnabled
        pagingEnabled
        data={dataWithVerMas}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verMasCard: {
    flex: 1,
    backgroundColor: "#1976d2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    minHeight: 220,
    marginRight: 16,
  },
  verMasCardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 8,
  },
  verMasCardDesc: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CardCarousel;
