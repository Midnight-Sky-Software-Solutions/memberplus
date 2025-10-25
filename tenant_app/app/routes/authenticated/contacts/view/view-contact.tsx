import apiClient from "lib/api";
import type { Route } from "./+types/view-contact";
import { Link } from "react-router";

export async function clientLoader({
  params
}: Route.ClientLoaderArgs) {
  const { id: account } = JSON.parse(localStorage.getItem("account")!);
  const { data: contact } = await apiClient.GET("/api/Accounts/{accountId}/Contacts/{id}", {
    params: {
      path: {
        accountId: account,
        id: params.id
      }
    }
  });
  return {
    contact: contact!
  };
}

export default function ViewContact({
  loaderData, params
}: Route.ComponentProps) {
  const { contact } = loaderData;

  return (
    <div className="bg-white grow p-8">
      <div className="flex gap-2">
        <Link to={`/contacts/${params.id}/edit`} className="p-button font-bold">Edit contact</Link>
      </div>
      <div className="my-8">
        <h1 className="font-bold text-4xl">{contact.firstName} {contact.lastName}</h1>
        <h2 className="text-gray-700">{contact.id}</h2>
      </div>
      <div className="text-gray-700">
        <p>{contact.email}</p>
        <p>Last login {contact.lastLogin ? contact.lastLogin : 'Never'}</p>
        <p>Profile last updated {contact.dateUpdated ? contact.dateUpdated : 'Never'}</p>
      </div>
    </div>
  );
}