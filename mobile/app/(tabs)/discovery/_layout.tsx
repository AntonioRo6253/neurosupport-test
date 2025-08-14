import { Stack } from "expo-router";
import { useAuthState } from "@/utils/authState";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function StackLayout() {
  const { isLoggedIn } = useAuthState();
  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
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
      </Stack.Protected>
    </Stack>
  );
}
