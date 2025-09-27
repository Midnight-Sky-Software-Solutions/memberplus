'use client'

import { ProfileContext } from "@/hooks/profile-context"
import { useContext } from "react"

export default function WelcomeComponent() {

  const profile = useContext(ProfileContext);

  return (
    <h2 className="text-4xl">
      Welcome, {profile.tenantName}!
    </h2>
  )
}