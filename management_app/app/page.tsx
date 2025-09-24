import { auth0 } from "@/lib/auth0";
import Image from "next/image";

export default async function Home() {

  const session = await auth0.getSession();

  const items: { id: string, name: string, externalId?: string}[] = await fetch('https://localhost:7122/tenant', {
    headers: {
      'Authorization': `Bearer ${session?.tokenSet.accessToken}` 
    }
  }).then(res => res.json());

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
