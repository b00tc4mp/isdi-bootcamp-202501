import { useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { Pressable, StyleSheet, Alert } from "react-native";
import { View, Text } from "@/components/Themed";
import { format, addDays, isSameDay, isBefore, isAfter } from "date-fns";
import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Paddings";
import { Typography } from "@/constants/Typography";
import { BookCalendarProps } from "./types";

export default function BookCalendar({
  onReturnClick,
  onAcceptButton,
  occupiedDates,
}: BookCalendarProps) {
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const formatOccupiedDates = (dateStrings: string[]) => {
    return dateStrings.map((dateStr) =>
      format(new Date(dateStr), "yyyy-MM-dd")
    );
  };

  const getDisabledDateMarks = (disabledDates: string[]) => {
    const result: Record<string, any> = {};
    disabledDates.forEach((date) => {
      result[date] = {
        disabled: true,
        disableTouchEvent: true,
      };
    });
    return result;
  };

  const disabledDateKeys = formatOccupiedDates(occupiedDates ?? []);
  const disabledMarks = getDisabledDateMarks(disabledDateKeys);

  const [markedDates, setMarkedDates] = useState(disabledMarks);

  const handleDayPress = (day: DateData) => {
    const selectedDate = new Date(day.dateString);

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: selectedDate, end: null });

      const dateStr = format(selectedDate, "yyyy-MM-dd");
      setMarkedDates({
        ...disabledMarks,
        [dateStr]: {
          startingDay: true,
          color: Colors.light.button,
          textColor: "white",
        },
      });
    } else if (isBefore(selectedDate, selectedRange.start)) {
      setSelectedRange({ start: selectedDate, end: null });

      const dateStr = format(selectedDate, "yyyy-MM-dd");
      setMarkedDates({
        ...disabledMarks,
        [dateStr]: {
          startingDay: true,
          color: Colors.light.button,
          textColor: "white",
        },
      });
    } else {
      const start = selectedRange.start;
      const end = selectedDate;

      const range = generateRangeWithFns(start, end);
      setSelectedRange({ start, end });
      setMarkedDates({
        ...range,
        ...disabledMarks,
      });
    }
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
    <View style={styles.container} id="dvd">
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
            if (selectedRange.start && selectedRange.end) {
              onAcceptButton({
                startDate: selectedRange.start,
                endDate: selectedRange.end,
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
    height: "100%",
    position: "relative",
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
