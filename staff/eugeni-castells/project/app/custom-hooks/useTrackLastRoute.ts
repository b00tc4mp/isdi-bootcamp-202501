import { useEffect, useRef } from "react";
import { usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTrackLastRoute = () => {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const excluded = ["/", "/(auth)", "/modal"];
    if (!excluded.includes(pathname)) {
      AsyncStorage.setItem("lastRoute", pathname);
    }
  }, [pathname]);
};
