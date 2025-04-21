import { useEffect, useState } from "react"
import { Slot, router } from "expo-router"

import { getUserRole } from "@/services/session"
import type { UserRole } from "../../../api/src/data/types"

export default function ModLayout() {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const validateAccess = async () => {
      const data = await getUserRole()
      const role: UserRole = data?.role ?? "unknown"

      if (role === "mod") {
        setAuthorized(true)
        return
      }

      if (role === "regular") {
        router.replace("/(tabs)")
      } else {
        router.replace("/(anonym)")
      }
    }

    validateAccess()
  }, [])

  if (!authorized) return null

  return <Slot />
}