import { Alert, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { ExchangesFoldedItemProps } from "./types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { acceptTripRequest } from "@/services";

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
  return (
    <View style={styles.container}>
      <Text>Status: {status}</Text>
      <Text>Start: {startDate}</Text>
      <AntDesign name="arrowright" size={24} color="black" />
      <Text>End: {endDate}</Text>
      <Text>
        Van Owner: {owner?.name} {owner?.lastName}
      </Text>
      <Text>
        Renter: {renter?.name} {renter?.lastName}
      </Text>
      <Text>Price: {price}€</Text>
      {handleRequestButtons && (
        <View>
          <AntDesign
            name="checkcircleo"
            size={24}
            color="black"
            onPress={() => {
              handleAcceptTripClick();
            }}
          />
          <Entypo name="circle-with-cross" size={24} color="black" />
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.button,
  },
});

export default ExchangesFoldedItem;
