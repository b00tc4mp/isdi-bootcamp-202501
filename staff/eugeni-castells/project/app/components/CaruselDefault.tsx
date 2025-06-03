import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  Alert,
  DimensionValue,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { getNumericStylePercentage } from "@/app/utils";

//El genèric definirà el tipat que ha de tenir slides i l'item del render item (que és el què retorna cada punt del map), també haurà de tenir aquest tipat
type CaruselDefaultProps<T> = {
  slides: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  showDots?: boolean;
  caruselWidth?: number;
  dotsHeight?: number | string;
};

export function CaruselDefault<T>({
  slides,
  renderItem,
  showDots = true,
  caruselWidth,
  dotsHeight = "20%",
}: CaruselDefaultProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const caruselItemWidth = caruselWidth || Dimensions.get("window").width;

  //Com que bottom ha de ser un DimensionValue i no una funció que retorni un DimensionValue fem una IIFE
  const numericBottom = ((): DimensionValue => {
    try {
      return getNumericStylePercentage(dotsHeight);
    } catch (error) {
      const err = error as Error;

      Alert.alert(err.message);

      return 0;
    }
  })();

  const dynamicDotsWrapperStyle = {
    ...styles.dotsWrapper,
    bottom: numericBottom,
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(
      event.nativeEvent.contentOffset.x / caruselItemWidth
    );
    setActiveIndex(pageIndex);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ width: caruselItemWidth * slides?.length }}
      >
        {slides?.map((slide, index) => (
          <View key={index} style={{ width: caruselItemWidth }}>
            {renderItem(slide, index)}
          </View>
        ))}
      </ScrollView>

      {showDots && (
        <View style={dynamicDotsWrapperStyle}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 15,
    marginTop: 12,
    position: "absolute",

    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.inactiveDot,
  },
  dotActive: {
    backgroundColor: Colors.light.activeDot,
    width: 10,
    height: 10,
  },
});
