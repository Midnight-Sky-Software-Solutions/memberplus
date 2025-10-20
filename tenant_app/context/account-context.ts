import { createContext } from "react";

type Account = {
  id: string,
  name: string,
};

export const AccountContext = createContext<Account>({ id: '', name: '' });