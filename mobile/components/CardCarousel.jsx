import React, { useState } from "react";
import { View, Dimensions, FlatList, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import Card from "./Card";

const CardCarousel = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth * 0.8 }}>
      <Card
        title={item.title}
        description={item.description}
        imageUrl={item.imageUrl}
      />
    </View>
  );

  // Card especial "Ver más"
  const renderVerMasCard = () => (
    <View style={{ width: screenWidth * 0.8 }}>
      <Pressable
        style={styles.verMasCard}
        onPress={() => router.push("/Pictogramas")}
      >
        <Text style={styles.verMasCardTitle}>Ver más</Text>
        <Text style={styles.verMasCardDesc}>
          Explora todos los pictogramas disponibles
        </Text>
      </Pressable>
    </View>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth * 0.8));
    setActiveIndex(index);
  };

  // Agrega la card "Ver más" al final del array
  const dataWithVerMas = [...cards, { id: "ver-mas-card" }];

  return (
    <View style={styles.container}>
      <FlatList
        data={dataWithVerMas}
        renderItem={({ item, index }) =>
          item.id === "ver-mas-card"
            ? renderVerMasCard()
            : renderItem({ item, index })
        }
        keyExtractor={(item, idx) => (item.id ? item.id : `card-${idx}`)}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth * 0.8 + 20}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = {
  container: {
    marginVertical: 20,
  },
  listContent: {},
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
  },
  verMasCard: {
    flex: 1,
    backgroundColor: "#1976d2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginHorizontal: 10,
    minHeight: 180,
    elevation: 2,
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
};

export default CardCarousel;
