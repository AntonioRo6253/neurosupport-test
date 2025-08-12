import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { WebView } from "react-native-webview";
import Markdown from "react-native-markdown-display";
import { Colors } from "../../../constants/Colors"; // Ajusta la ruta si es necesario

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

const title = "Título del Consejo";
const subtitle = "Subtítulo";
const description = `
Lorem ipsum dolor sit amet consectetur. Sed risus laoreet risus aliquam velit in. Quam tellus est elit phasellus amet iaculis erat. Ornare dolor consequat laoreet et. Nisi egestas ornare consequat facilisi. Lorem adipiscing at sit suspendisse scelerisque sapien. Quis sit porttitor diam habitant pulvinar dignissim nec pulvinar eu. Sed arcu id lobortis purus.Lorem ipsum dolor sit amet consectetur. Sed risus laoreet risus aliquam velit in. Quam tellus est elit phasellus amet iaculis erat. Ornare dolor consequat laoreet et. Nisi egestas ornare consequat facilisi. Lorem adipiscing at sit suspendisse scelerisque sapien. Quis sit porttitor diam habitant pulvinar dignissim nec pulvinar eu. Sed arcu id lobortis purus.

## Subtitulo

Lorem ipsum dolor sit amet consectetur. Sed risus laoreet risus aliquam velit in. Quam tellus est elit phasellus amet iaculis erat. Ornare dolor consequat laoreet et. Nisi egestas ornare consequat facilisi. Lorem adipiscing at sit suspendisse scelerisque sapien. Quis sit porttitor diam habitant pulvinar dignissim nec pulvinar eu. Sed arcu id lobortis purus.Lorem ipsum dolor sit amet consectetur. Sed risus laoreet risus aliquam velit in. Quam tellus est elit phasellus amet iaculis erat. Ornare dolor consequat laoreet et. Nisi egestas ornare consequat facilisi. Lorem adipiscing at sit suspendisse scelerisque sapien. Quis sit porttitor diam habitant pulvinar dignissim nec pulvinar eu. Sed arcu id lobortis purus.

[Link](https://reactnative.dev)  [Link](https://reactnative.dev)  [Link](https://reactnative.dev)
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: Colors.light.primary.Color90,
  },
  card: {
    backgroundColor: Colors.light.primary.Color70,

    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    minHeight: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  media: {
    width: width,
    height: 220,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.primary.Color10,
    marginBottom: 8,
    fontFamily: "sans-serif-condensed",
    textShadowColor: "rgba(0,0,0,0.08)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary.Color40,
    marginBottom: 8,
    marginTop: 8,
    fontFamily: "sans-serif",
  },
});

const markdownStyles = {
  body: {
    color: Colors.light.primary.Color50,
    fontSize: 15,
    textAlign: "left",
    fontFamily: "sans-serif",
    marginBottom: 0,
  },
  heading1: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.primary.Color10,
    marginBottom: 8,
    marginTop: 0,
    fontFamily: "sans-serif-condensed",
  },
  heading2: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary.Color40,
    marginBottom: 8,
    marginTop: 16,
    fontFamily: "sans-serif",
  },
  strong: { fontWeight: "bold", color: Colors.light.primary.Color10 },
  em: { fontStyle: "italic", color: Colors.light.primary.Color20 },
  link: {
    color: Colors.light.primary.Color10,
    textDecorationLine: "underline",
    marginHorizontal: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  bullet_list: { marginLeft: 16, marginBottom: 4 },
  list_item: { flexDirection: "row", alignItems: "flex-start" },
  bullet: { color: Colors.light.primary.Color10, fontSize: 18 },
  paragraph: { marginBottom: 10, textAlign: "left" },
};

export const renderItem = ({ item }) => {
  if (item.type === "youtube") {
    // Extraer el ID del video de YouTube
    const match = item.url.match(
      /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = match ? match[1] : null;
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}?controls=1&showinfo=0&modestbranding=1&rel=0`
      : item.url;

    return (
      <WebView
        source={{ uri: embedUrl }}
        style={styles.media}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        // Elimina el fondo blanco por defecto
        containerStyle={{ backgroundColor: "#000" }}
        // Opcional: evita el scroll dentro del WebView
        scrollEnabled={false}
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
        width={width}
        height={220}
        data={carouselItems}
        renderItem={({ item }) => renderItem({ item })}
        style={{ marginBottom: 0 }}
        loop
        autoPlay={false}
        pagingEnabled
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Markdown style={markdownStyles}>{description}</Markdown>
        </View>
      </ScrollView>
    </View>
  );
}
