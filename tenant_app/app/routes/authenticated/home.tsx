import { AccountContext } from "context/account-context"
import { useContext } from "react"

export default function Home() {
  const account = useContext(AccountContext);

  return (
    <>
      <p>Account Id: {account.id}</p>
      <p>Account Name: {account.name}</p>
    </>
  )
}