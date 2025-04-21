import { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  _View,
  Pressable,
} from "react-native";
import { Text, View } from "../Themed";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { validate } from "@/com/validate";
import { filterLocation } from "@/services/filterLocation";
import { GeoDBResponse } from "@/services/types";
import { DestinationBoxProp } from "./types";

export const DestinationBox = ({
  onSearchClick,
  location,
}: DestinationBoxProp) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [cities, setCities] = useState<GeoDBResponse>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearchClick = (city: string) => {
    onSearchClick(city);
    setQuery("");
  };

  const fetchCities = () => {
    try {
      validate.string(query, "location search");

      return filterLocation(query)
        .catch((error) => {
          Alert.alert(error.message);
        })
        .then((cities) => {
          setCities(cities!);
        });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  useEffect(() => {
    if (debouncedQuery) {
      fetchCities();
    }
  }, [debouncedQuery]);

  const handleInputChange = (text: string): void => {
    setQuery(text);
  };

  return (
    <View style={styles.container}>
      {location.length === 0 ? (
        <Text
          style={{
            paddingBottom: spacing.rem,
            fontWeight: Typography.fontWeight.bold,
          }}
        >
          Where to?
        </Text>
      ) : (
        <Text
          style={{
            paddingBottom: spacing.rem,
            fontWeight: Typography.fontWeight.bold,
          }}
        >
          {location}
        </Text>
      )}

      <TextInput
        placeholder="Search destinations"
        style={styles.input}
        placeholderTextColor={Colors.light.searchDestinationColor}
        onChangeText={handleInputChange}
        value={query}
      />
      {cities?.data?.length! > 0 && query.length > 0 && (
        <FlatList
          data={cities!.data}
          keyExtractor={(item, index) => `van-${index}`}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleSearchClick(item.city);
              }}
            >
              <Text style={styles.cityText}>{item.city}</Text>
              <Text style={styles.regionCountryText}>
                {item.region}, {item.country}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={styles.containerList}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: "white", // necessari perquè l'ombra es vegi
    borderRadius: 16,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android
    elevation: 4,
    marginBottom: spacing.md,
  },
  input: {
    borderColor: Colors.light.searchDestinationColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.rem * 0.8,
  },
  containerList: {
    borderEndEndRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cityText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: Typography.fontWeight.bolder,
  },
  regionCountryText: {
    fontSize: 16,
    color: "#94A3B8",
  },
});
