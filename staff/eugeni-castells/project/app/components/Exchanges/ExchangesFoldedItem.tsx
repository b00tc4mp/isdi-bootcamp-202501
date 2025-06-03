import { Alert, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { ExchangesFoldedItemProps } from "./types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { acceptTripRequest } from "@/services";
import { rejectTripRequest } from "@/services/rejectTripRequest";
import { MaterialIcons } from "@expo/vector-icons";
import { getFormattedDate } from "@/app/utils";

const ExchangesFoldedItem = ({
  status,
  startDate,
  endDate,
  renter,
  owner,
  price,
  handleRequestButtons,
  id,
  onConfirm,
}: ExchangesFoldedItemProps) => {
  const handleonConfirmNavigation = () => {
    onConfirm!();
  };
  const handleAcceptTripClick = () => {
    try {
      acceptTripRequest(id)
        .then(() => {
          handleonConfirmNavigation();
        })
        .catch((error) => {
          Alert.alert((error as Error).message);
        });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleRejectTripClick = () => {
    try {
      rejectTripRequest(id)
        .then(() => {
          handleonConfirmNavigation();
        })
        .catch((error) => {
          Alert.alert((error as Error).message);
        });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.date}>
            From {getFormattedDate(new Date(startDate)).number}{" "}
            {getFormattedDate(new Date(startDate)).month}{" "}
            {getFormattedDate(new Date(startDate)).year}
          </Text>
          <Text style={styles.date}>
            To {getFormattedDate(new Date(endDate)).number}{" "}
            {getFormattedDate(new Date(endDate)).month}{" "}
            {getFormattedDate(new Date(endDate)).year}
          </Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Owner</Text>
        <Text style={styles.value}>
          {owner.name} {owner.lastName}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Renter</Text>
        <Text style={styles.value}>
          {renter.name} {renter.lastName}
        </Text>
      </View>

      {handleRequestButtons && (
        <View style={styles.actionContainer}>
          <Pressable
            style={[styles.actionButton, styles.reject]}
            onPress={handleRejectTripClick}
          >
            <Entypo name="cross" size={16} color="#fff" />
            <Text style={styles.actionText}>Reject</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.accept]}
            onPress={handleAcceptTripClick}
          >
            <AntDesign name="check" size={16} color="#fff" />
            <Text style={styles.actionText}>Accept</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.rowRight}>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  rowRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  value: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },
  statusBox: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999, // pill shape
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  accept: {
    backgroundColor: "#2ecc71", // verd més fresc
  },

  reject: {
    backgroundColor: "#e74c3c", // vermell suau
  },

  actionText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 15,
  },
});
export default ExchangesFoldedItem;
