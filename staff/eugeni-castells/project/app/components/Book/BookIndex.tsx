import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "../Themed";
import BookCalendar from "./BookCalendar";
import { useLocalSearchParams } from "expo-router";
import { BookIndexProps } from "./types";
import TripSummary from "./TripSummary";
import { differenceInDays } from "date-fns";
import { generateTripRequest } from "@/services/generateTripRequest";

export const BookIndex = ({
  onVanDetailScreenNavigation,
  price,
  location,
}: BookIndexProps) => {
  const [displayCalendar, setDisplayCalendar] = useState<boolean>(true);

  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const { id } = useLocalSearchParams();

  const router = useRouter();

  useEffect(() => {
    if (selectedDates.start !== null && selectedDates.end !== null) {
      const diff = differenceInDays(selectedDates.end, selectedDates.start);

      setTotalPrice(price * diff);
    }
  }, [selectedDates]);

  const handleAcceptTripRequest = () => {
    // Alert.alert(
    //   "Confirm trip request",
    //   "Are you sure you want to request this trip?",
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //       onPress: () => {},
    //     },
    //     {
    //       text: "Confirm",
    //       style: "default",
    //       onPress: () => {
    //         handleTripConfirmed();
    //       },
    //     },
    //   ],
    //   { cancelable: true }
    // );
    handleTripConfirmed();
  };

  const handleTripConfirmed = async () => {
    try {
      if (selectedDates.start && selectedDates.end && typeof id === "string") {
        const tripInfo = {
          selectedDates: {
            startDate: selectedDates.start,
            endDate: selectedDates.end,
          },
          totalPrice: totalPrice!,
        };
        return generateTripRequest(tripInfo, id)
          .then(() => {
            router.push("/(tabs)/exchanges");
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleDateSelection = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => {
    setSelectedDates({ start: startDate, end: endDate });
    setDisplayCalendar(false);
  };

  const handleCalendarNavigation = () => {
    setDisplayCalendar(true);
  };

  const handleBackClick = () => {
    onVanDetailScreenNavigation();
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        handleBackClick();
      }}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.contentContainer}>
          {displayCalendar ? (
            <BookCalendar
              onReturnClick={handleBackClick}
              onAcceptButton={handleDateSelection}
            />
          ) : (
            <TripSummary
              tripInfo={{
                startDate: selectedDates.start!,
                endDate: selectedDates.end!,
                totalPrice: totalPrice!,
                location: location,
                onDatesClick: handleCalendarNavigation,
                onRequestTripClick: handleAcceptTripRequest,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "absolute",
    bottom: 0,
    zIndex: 4,
    justifyContent: "flex-end",
  },
  contentContainer: {
    height: "50%",
  },
});

export default BookIndex;
