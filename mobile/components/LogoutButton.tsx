import React from "react";
import { Button } from "react-native";
import { useAuth } from "./AuthContext";

export default function LogoutButton() {
  const { signOut } = useAuth();
  return <Button title="Cerrar sesión" onPress={signOut} />;
}
