import { Colors } from "@/constants/Colors";
import { Text, TextProps, View } from "../Themed";

export function StyledLandingHeader(props: TextProps) {
  return (
    <View
      style={[
        {
          position: "absolute",
          top: 150,
          zIndex: 1,
          backgroundColor: "transparent",
          minWidth: "100%",
        },
      ]}
    >
      <Text
        {...props}
        style={[
          props.style,
          {
            fontFamily: "Inter",
            fontSize: 32,
            fontWeight: 700,
            color: Colors.light.headingText,
            textAlign: "center",
          },
        ]}
      />
    </View>
  );
}
