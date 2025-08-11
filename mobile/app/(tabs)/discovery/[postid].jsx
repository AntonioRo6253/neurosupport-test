import React, { useRef } from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { WebView } from "react-native-webview";
import Markdown from "react-native-markdown-display";

const { width } = Dimensions.get("window");

const carouselItems = [
  {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=ZDoiMLqWz2E",
  },
  {
    type: "image",
    source: { uri: "https://picsum.photos/300/200?random=1" },
  },
  {
    type: "image",
    source: { uri: "https://picsum.photos/300/200?random=2" },
  },
];

const title = "Título del Carrusel";
const subtitle = "Subtítulo atractivo";
const description = `
# Descripción en Markdown

- Puedes usar **negritas**
- _Cursivas_
- [Enlaces](https://reactnative.dev)
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  media: {
    width: width * 0.85,
    height: 220,
    borderRadius: 12,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 18,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
    marginBottom: 10,
    textAlign: "center",
  },
});

const markdownStyles = {
  body: { textAlign: "center", fontSize: 15, color: "#444" },
};

export const renderItem = ({ item }) => {
  if (item.type === "youtube") {
    return (
      <WebView
        source={{ uri: item.url }}
        style={styles.media}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
      />
    );
  }
  return <Image source={item.source} style={styles.media} resizeMode="cover" />;
};

export default function CardInfoScreen() {
  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        width={width * 0.85}
        height={220}
        data={carouselItems}
        renderItem={({ item }) => renderItem({ item })}
        style={{ marginBottom: 10 }}
        loop
        autoPlay={false}
        pagingEnabled
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Markdown style={markdownStyles}>{description}</Markdown>
    </View>
  );
}
