import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";
import {
  CalendarPropsType,
  ReturnedFormattedDay,
  GeneratedDayByCalendar,
} from "./types";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";

export default function CalendarFilter({ onAcceptDates }: CalendarPropsType) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<GeneratedDayByCalendar[]>();

  const [selectedRange, setSelectedRange] = useState<{
    start: ReturnedFormattedDay | null;
    end: ReturnedFormattedDay | null;
  }>({
    start: null,
    end: null,
  });

  const formatDate = (date: Date) => {
    return {
      date: new Date(date),
      month: format(date, "MMM"),
      number: format(date, "d"),
    };
  };

  const handleAcceptDates = () => {
    onAcceptDates(selectedRange);
  };
  const handleDateSelect = (date: Date) => {
    const { start, end } = selectedRange;

    if (!start || (start && end)) {
      setSelectedRange({ start: formatDate(date), end: null });
    } else if (isBefore(date, start.date)) {
      setSelectedRange({ start: formatDate(date), end: null });
    } else {
      setSelectedRange({ start, end: formatDate(date) });
    }
  };

  useEffect(() => {
    const generatedDays = generateCalendar();
    setDays(generatedDays);
  }, [currentMonth]);

  const generateCalendar = (): GeneratedDayByCalendar[] => {
    //Obtenim quin dia comença el mes actual
    const start = startOfMonth(currentMonth);

    //Obtenim quin dia acaba el mes actual
    const end = endOfMonth(currentMonth);

    //Trobem quins dies hi ha entre l'interval del primer dia del mes i l'últim
    const days = eachDayOfInterval({ start, end });

    let formattedDays: ReturnedFormattedDay[];

    formattedDays = days.map((day) => {
      return {
        date: day,
        month: format(day, "MMM"),
        number: format(day, "d"),
      };
    });

    //Calculem quants espais ha de deixar en blanc al principi del mes
    const nullDays = start.getDay(); // 0 (Sunday) - 6 (Saturday)

    //Creem un nou array amb  length igual al nombre de dies null
    const nullArray = new Array(nullDays);

    //Fem que a cada item de l'array li assignem null com a valor
    for (let i = 0; i < nullArray.length; i++) {
      nullArray[i] = null;
    }

    //Concatenem aquest array amb el dels dies. Així, al principi tindrem els null i després seguiran els altres.
    const aggregatedDays = nullArray.concat(days);

    return aggregatedDays;
  };

  const isInRange = (date: Date) => {
    const { start, end } = selectedRange;
    if (!start || !end) return false;
    return isAfter(date, start.date) && isBefore(date, end.date);
  };

  const isStart = (date: Date) =>
    selectedRange.start && isSameDay(date, selectedRange.start.date);
  const isEnd = (date: Date) =>
    selectedRange.end && isSameDay(date, selectedRange.end.date);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <Text style={styles.arrow}>{"<"}</Text>
        </Pressable>
        <Text style={styles.month}>{format(currentMonth, "MMMM yyyy")}</Text>
        <Pressable onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>
      </View>
      <View style={styles.dayWrapper}>
        <View style={styles.weekdays}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <Text key={index} style={styles.weekday}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {days?.map((date, index) => {
            const isSelectedStart = date && isStart(date);
            const isSelectedEnd = date && isEnd(date);
            const isBetween = date && isInRange(date);

            return (
              <Pressable
                key={index}
                style={[
                  styles.day,
                  isBetween && styles.betweenDay,
                  isSelectedStart && styles.startDay,
                  isSelectedEnd && styles.endDay,
                ]}
                onPress={() => date && handleDateSelect(date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    (isSelectedStart || isSelectedEnd) &&
                      styles.selectedDayText,
                  ]}
                >
                  {date ? format(date, "d") : ""}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            handleAcceptDates();
          }}
        >
          <Text style={styles.buttonText}>Accept</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xsmd,
  },
  month: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    color: "#64748B",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  weekday: {
    textAlign: "center",
    color: "#94A3B8",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 16,
  },
  dayText: {
    color: "#0F172A",
  },
  selectedDayText: {
    color: "white",
  },
  startDay: {
    backgroundColor: "#3B82F6",
  },
  endDay: {
    backgroundColor: "#3B82F6",
  },
  betweenDay: {
    backgroundColor: "#DBEAFE",
    borderRadius: 0,
  },
  dayWrapper: {
    padding: spacing.md,
  },
  bottomContainer: {
    padding: spacing.md,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.xsmd,
    paddingBottom: spacing.xsmd,
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
