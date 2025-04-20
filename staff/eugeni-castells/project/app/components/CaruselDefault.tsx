import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Paddings";

const { width } = Dimensions.get("window");

//El genèric definirà el tipat que ha de tenir slides i l'item del render item (que és el què retorna cada punt del map), també haurà de tenir aquest tipat
type CaruselDefaultProps<T> = {
  slides: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  showDots?: boolean;
};

export function CaruselDefault<T>({
  slides,
  renderItem,
  showDots = true,
}: CaruselDefaultProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
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
        contentContainerStyle={{ width: width * slides?.length }}
      >
        {slides?.map((slide, index) => (
          <View key={index} style={{ width }}>
            {renderItem(slide, index)}
          </View>
        ))}
      </ScrollView>

      {showDots && (
        <View style={styles.dotsWrapper}>
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
    marginTop: 12,
    gap: spacing.lg,
    position: "absolute",
    bottom: "20%",
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
