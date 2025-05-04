import { SystemError } from "@/com/errors";
import { data } from "@/data";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      let token;
      try {
        token = await data.getToken();
      } catch (error) {
        throw new SystemError((error as Error).message);
      }

      if (!token) {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);
}
