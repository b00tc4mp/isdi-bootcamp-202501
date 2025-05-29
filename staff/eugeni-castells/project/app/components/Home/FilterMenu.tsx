import { useState } from "react";
import { FilterMenuProps, FilterStateType } from "./types";
import { Text, View } from "../Themed";
import {
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import ButtonBack from "../ButtonBack";

const FilterMenu = ({
  onAcceptFilters,
  onLeftArrowClick,
  onResetFilters,
}: FilterMenuProps) => {
  const [filters, setFilters] = useState<FilterStateType>({
    beds: "1",
    travellers: "2",
    toilet: "all",
    fuelType: "all",
    accessible: false,
    shower: false,
    heat: false,
    kitchen: false,
    airConditioning: false,
    fridge: false,
  });

  const handleBackClick = () => {
    onLeftArrowClick();
  };

  const handleResetFilter = () => {
    onResetFilters();
  };
  const handleChange = (key: keyof FilterStateType, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.headerContainer}>
        <ButtonBack
          onPress={() => {
            handleBackClick();
          }}
        />
        <Text style={styles.headerText}>Filters</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputGroup}>
          <FontAwesome5 name="bed" size={20} color="black" />
          <Text style={styles.label}>Beds</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={filters.beds}
            onChangeText={(text) => handleChange("beds", text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <MaterialIcons name="people" size={20} color="black" />
          <Text style={styles.label}>Travellers</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={filters.travellers}
            onChangeText={(text) => handleChange("travellers", text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome5 name="toilet" size={20} color="black" />
          <Text style={styles.label}>Toilet</Text>
          <View style={styles.optionsRow}>
            {["none", "portable", "fixed", "all"].map((option) => (
              <Pressable
                key={option}
                onPress={() =>
                  handleChange("toilet", option as FilterStateType["toilet"])
                }
                style={[
                  styles.optionButton,
                  filters.toilet === option && styles.optionSelected,
                ]}
              >
                <Text
                  style={
                    filters.toilet === option
                      ? styles.selectedOptionText
                      : undefined
                  }
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome5 name="gas-pump" size={20} color="black" />
          <Text style={styles.label}>Fuel Type</Text>
          <View style={styles.optionsRow}>
            {["petrol", "diesel", "electric", "hybrid", "all"].map((option) => (
              <Pressable
                key={option}
                onPress={() =>
                  handleChange(
                    "fuelType",
                    option as FilterStateType["fuelType"]
                  )
                }
                style={[
                  styles.optionButton,
                  filters.fuelType === option && styles.optionSelected,
                ]}
              >
                <Text
                  style={
                    filters.fuelType === option
                      ? styles.selectedOptionText
                      : undefined
                  }
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {[
          {
            key: "accessible",
            label: "Accessible",
            icon: <MaterialIcons name="accessible" size={20} color="black" />,
          },
          {
            key: "shower",
            label: "Shower",
            icon: <FontAwesome5 name="shower" size={20} color="black" />,
          },
          {
            key: "heat",
            label: "Heating",
            icon: <MaterialIcons name="fireplace" size={20} color="black" />,
          },
          {
            key: "kitchen",
            label: "Kitchen",
            icon: <FontAwesome5 name="utensils" size={20} color="black" />,
          },
          {
            key: "airConditioning",
            label: "A/C",
            icon: <Entypo name="air" size={20} color="black" />,
          },
          {
            key: "fridge",
            label: "Fridge",
            icon: <FontAwesome5 name="snowflake" size={20} color="black" />,
          },
        ].map(({ key, label, icon }) => (
          <View key={key} style={styles.inputGroup}>
            <View style={styles.switchRow}>
              {icon}
              <Text style={styles.label}>{label}</Text>
              <Switch
                value={filters[key as keyof FilterStateType] as boolean}
                thumbColor="white" // el botó rodó
                trackColor={{ false: "#ccc", true: "black" }} // la barra de fons
                onValueChange={(val) =>
                  handleChange(key as keyof FilterStateType, val)
                }
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footerContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            handleResetFilter();
          }}
        >
          <Text style={styles.buttonText}>Clear Filters</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => onAcceptFilters(filters)}
        >
          <Text style={styles.buttonText}>Apply Filters</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.light.background,
    zIndex: 10,
  },
  headerContainer: {
    width: "100%",
    padding: spacing.lg * 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.secondaryText,
  },
  headerText: {
    fontSize: 30,
    fontWeight: Typography.fontWeight.bold,
    textAlign: "center",
  },
  scrollContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: spacing.md,
    fontWeight: Typography.fontWeight.bolder,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: spacing.sm,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Colors.light.button,
    padding: spacing.md,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.light.buttonText,
    fontWeight: Typography.fontWeight.bolder,
  },
  optionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  optionSelected: {
    backgroundColor: "black",
    borderColor: "black",
  },
  selectedOptionText: {
    color: "white",
    fontWeight: Typography.fontWeight.bolder,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerContainer: {
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light.secondaryText,
  },
});

export default FilterMenu;
