'use client'
import { createContext, ReactNode } from "react";

export type ProfileContextType = {
  tenantName?: string,
  accountId?: string
};

export const ProfileContext = createContext({} as ProfileContextType);

export default function ProfileContextProvider({ children, value }: {
  children: ReactNode,
  value: ProfileContextType
}) {
  return (
    <ProfileContext value={value}>
      {children}
    </ProfileContext>
  );
}