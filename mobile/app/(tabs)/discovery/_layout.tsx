import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[postid]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
