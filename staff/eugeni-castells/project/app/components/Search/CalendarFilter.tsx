import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { format, isSameDay, isBefore, isAfter, addDays } from "date-fns";
import { CalendarPropsType, ReturnedFormattedDay } from "./types";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { getFormattedDate } from "@/app/utils";

export default function CalendarFilter({ onAcceptDates }: CalendarPropsType) {
  const [selectedRange, setSelectedRange] = useState<{
    start: ReturnedFormattedDay;
    end: ReturnedFormattedDay;
  }>({
    start: {
      date: null,
      number: null,
      month: null,
    },
    end: null,
  });

  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day: DateData) => {
    const selectedDate = new Date(day.dateString);
    const formatted = getFormattedDate(selectedDate);

    // Si no hi ha cap data o ja s’ha seleccionat un rang complet
    if (
      !selectedRange?.start?.date ||
      (selectedRange.start.date && selectedRange.end?.date)
    ) {
      setSelectedRange({
        start: formatted,
        end: null,
      });

      const dateStr = format(selectedDate, "yyyy-MM-dd");
      setMarkedDates({
        [dateStr]: {
          startingDay: true,
          color: Colors.light.button,
          textColor: "white",
        },
      });

      return;
    }

    // Si seleccionem una data abans de la data d'inici
    if (isBefore(selectedDate, selectedRange.start.date)) {
      setSelectedRange({
        start: formatted,
        end: null,
      });

      const dateStr = format(selectedDate, "yyyy-MM-dd");
      setMarkedDates({
        [dateStr]: {
          startingDay: true,
          color: Colors.light.button,
          textColor: "white",
        },
      });

      return;
    }

    // Si seleccionem una data posterior i volem completar el rang
    const range = generateRangeWithFns(selectedRange.start.date!, selectedDate);
    setSelectedRange({
      start: selectedRange.start,
      end: getFormattedDate(selectedDate),
    });
    setMarkedDates(range);
  };

  const generateRangeWithFns = (start: Date, end: Date) => {
    const marked: any = {};
    let current = start;

    while (!isAfter(current, end)) {
      const dateStr = format(current, "yyyy-MM-dd");

      marked[dateStr] = {
        color: Colors.light.button,
        textColor: "white",
        startingDay: isSameDay(current, start),
        endingDay: isSameDay(current, end),
      };

      current = addDays(current, 1);
    }

    return marked;
  };

  const handleClearClick = () => {
    setSelectedRange({ start: null, end: null });
    setMarkedDates({});
  };

  return (
    <View style={styles.container}>
      <Calendar
        showScrollIndicator={true}
        markingType="period"
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />

      <View style={styles.footerContainer}>
        <Pressable
          style={styles.bookButton}
          onPress={() => {
            handleClearClick();
          }}
        >
          <Text style={styles.buttonText}>Clear dates</Text>
        </Pressable>
        <Pressable
          style={styles.bookButton}
          onPress={() => {
            if (selectedRange.start?.date && selectedRange.end?.date) {
              onAcceptDates({
                start: {
                  date: selectedRange.start.date,
                  month: selectedRange.start.month,
                  number: selectedRange.start.number,
                },
                end: {
                  date: selectedRange.end.date,
                  month: selectedRange.end.month,
                  number: selectedRange.end.number,
                },
              });
            } else {
              Alert.alert("Select a range of dates");
            }
          }}
        >
          <Text style={styles.buttonText}>Select Dates</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: "white",
    borderRadius: 12,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    zIndex: 1,
  },
  footerContainer: {
    width: "100%",
    padding: spacing.lg,
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 3,
  },
  bookButton: {
    padding: spacing.md,
    backgroundColor: Colors.light.button,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.light.buttonText,
    fontWeight: Typography.fontWeight.bold,
  },
});

/*methods used from date-fns
format,
isBefore,
isAfter,
addMonths,

*/
