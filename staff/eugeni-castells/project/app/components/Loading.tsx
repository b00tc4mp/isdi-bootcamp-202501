import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "./Themed";

type LoadingProps = {
  isLoading: boolean; // Condició per mostrar l'spinner
  size?: "small" | "large";
  color?: string;
};

export const Loading = ({
  isLoading,
  size = "large",
  color = "#000",
}: LoadingProps) => {
  if (!isLoading) return null; // Si no està carregant, no es mostra res

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
