import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { SearchBar } from "@/components/Home/SearchBar";
import { useState, useEffect } from "react";
import { getVans } from "@/services/getVans";
import { ReturnedVansType } from "@/com/types";
import VanList from "@/components/Home/VanList";
import { spacing } from "@/constants/Paddings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";

import { useAuthRedirect } from "@/custom-hooks/useAuthRedirect";
import FilterMenu from "@/components/Home/FilterMenu";
import { FilterStateType } from "@/components/Home/types";

export default function HomeScreen() {
  useAuthRedirect();
  const [originalVans, setOriginalVans] = useState<ReturnedVansType[]>([]);

  const [vans, setVans] = useState<ReturnedVansType[]>([]);
  const [formattedStartDate, setFormattedStartDate] = useState<string | null>(
    null
  );
  const [formattedEndDate, setFormattedEndDate] = useState<string | null>(null);
  const [displayFilterMenu, setDisplayFilterMenu] = useState<boolean>(false);

  const { longitude, latitude, startDate, endDate, travellers } =
    useLocalSearchParams();
  //The params we receive are strings. We want to keep it that way so it's easier to generate the queryString in the fetchVans request

  const filterVans = (vans: ReturnedVansType[], filters: FilterStateType) => {
    const booleanFilterMap: {
      [K in keyof FilterStateType]?: keyof ReturnedVansType;
    } = {
      accessible: "accessible",
      shower: "shower",
      heat: "heating",
      kitchen: "insideKitchen",
      airConditioning: "airConditioning",
      fridge: "fridge",
    };

    const activeBooleanKeys = Object.entries(booleanFilterMap)
      .filter(([filterKey]) => filters[filterKey as keyof FilterStateType])
      .map(([_, vanKey]) => vanKey!);

    return vans.filter((van) => {
      const matchesBasicFilters =
        (!filters.beds || van.bedCount >= parseInt(filters.beds)) &&
        (!filters.travellers ||
          van.maxTravellers >= parseInt(filters.travellers)) &&
        (!filters.toilet ||
          filters.toilet === "all" ||
          van.toilet === filters.toilet) &&
        (!filters.fuelType ||
          filters.fuelType === "all" ||
          van.fuelType === filters.fuelType);

      const matchesBooleanFilters =
        activeBooleanKeys.length === 0 ||
        activeBooleanKeys.every((key) => van[key]);

      return matchesBasicFilters && matchesBooleanFilters;
    });
  };

  useEffect(() => {
    const fetchVans = async () => {
      try {
        //we have to do all this formatting because the localParams can return either a string or an array of strings so we have to be sura we are sending strings alone
        let notArrayLongitude;
        if (!Array.isArray(longitude)) notArrayLongitude = longitude;
        let notArrayLatitude;
        if (!Array.isArray(latitude)) notArrayLatitude = latitude;
        let notArrayStartDate;
        if (!Array.isArray(startDate)) notArrayStartDate = startDate;
        let notArrayEndDate;
        if (!Array.isArray(endDate)) notArrayEndDate = endDate;
        let notArrayTravellers;
        if (!Array.isArray(travellers)) notArrayTravellers = travellers;

        const vans = await getVans(
          notArrayLongitude!,
          notArrayLatitude!,
          notArrayStartDate!,
          notArrayEndDate!,
          notArrayTravellers!
        );
        setVans(vans);
        setOriginalVans(vans); // ➕ guarda la llista completa
      } catch (error) {
        Alert.alert((error as Error).message);
      }
    };

    fetchVans();

    if (typeof startDate === "string") {
      const date = new Date(startDate);
      if (!isNaN(date.getTime())) {
        setFormattedStartDate(
          date.toLocaleDateString("ca-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      } else {
        setFormattedStartDate("all");
      }
    }

    if (typeof endDate === "string") {
      const date = new Date(endDate);
      if (!isNaN(date.getTime())) {
        setFormattedEndDate(
          date.toLocaleDateString("ca-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      } else {
        setFormattedEndDate("all");
      }
    }
  }, []);

  const handleResetFilters = () => {
    setVans(originalVans);
    setDisplayFilterMenu(false);
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: displayFilterMenu ? { display: "none" } : undefined,
    });
  }, [displayFilterMenu]);

  const handleHomeNavigation = () => {
    setDisplayFilterMenu(false);
  };
  return (
    <>
      <View style={styles.container}>
        <SearchBar />
        <View style={styles.filterContainer}>
          <View>
            {formattedStartDate && formattedEndDate && (
              <Text>
                Dates: {formattedStartDate}-{formattedEndDate}
              </Text>
            )}
            <Text>Travellers: {travellers} </Text>
          </View>
          <Ionicons
            name="options-sharp"
            size={24}
            color="black"
            onPress={() => {
              setDisplayFilterMenu(!displayFilterMenu);
            }}
          />
        </View>

        {vans.length > 0 && <VanList vans={vans} />}
        {vans.length === 0 && (
          <View style={styles.noVanContainer}>
            <Text style={styles.noVanText}>No van matched the filters!</Text>
          </View>
        )}
      </View>
      {displayFilterMenu && (
        <FilterMenu
          onLeftArrowClick={() => {
            handleHomeNavigation();
          }}
          onResetFilters={handleResetFilters}
          onAcceptFilters={(filters) => {
            const filtered = filterVans(originalVans, filters);
            setVans(filtered);
            handleHomeNavigation();
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.rem * 2,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vanList: {
    flex: 1,
  },
  vanCardWrapper: {
    flex: 1,
  },
  noVanContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noVanText: {
    fontSize: 24,
  },
});
