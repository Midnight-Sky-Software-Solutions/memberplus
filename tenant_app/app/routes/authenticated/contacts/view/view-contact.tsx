import apiClient from "lib/api";
import type { Route } from "./+types/view-contact";
import { Link } from "react-router";
import type { components } from "lib/api.d";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

export async function clientLoader({
  params
}: Route.ClientLoaderArgs) {
  const { id: account } = JSON.parse(localStorage.getItem("account")!);
  const contactPromise = apiClient.GET("/api/Accounts/{accountId}/Contacts/{id}", {
    params: {
      path: {
        accountId: account,
        id: params.id
      }
    }
  });
  const membershipLevelsPromise = apiClient.GET("/api/Accounts/{accountId}/MembershipLevels", {
    params: {
      path: {
        accountId: account
      }
    }
  });
  const [{ data: contact }, { data: membershipLevels }] = await Promise.all([contactPromise, membershipLevelsPromise]);
  return {
    contact: contact!,
    membershipLevels: membershipLevels!
  };
}

type ViewContactState = {
  contact: components["schemas"]["ReadContactDto"]
} & ({
  status: 'idle'
}| {
  status: 'assigning'
});

type Inputs = {
  membershipLevelId: string
};

export default function ViewContact({
  loaderData, params
}: Route.ComponentProps) {
  const [state, setState] = useState<ViewContactState>({ contact: loaderData.contact, status: 'idle' });
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  }

  return (
    <div className="bg-white grow p-8">
      <div className="flex gap-2">
        <Link to={`/contacts/${params.id}/edit`} className="p-button font-bold">Edit contact</Link>
        <Button outlined label="Assign membership" onClick={() => setState({...state, status: 'assigning'})} />
      </div>
      <Dialog
        onHide={() => setState({...state, status: 'idle'})}
        visible={state.status == 'assigning'}
        header="Assign membership"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="membershipLevel">Membership Level</label>
            <Controller
              name="membershipLevelId"
              control={control}
              rules={{ required: true }}
              render={({field}) => (
                <Dropdown
                  id="membershipLevel"
                  options={loaderData.membershipLevels}
                  optionLabel="name"
                  optionValue="id"
                  {...field}
                />
              )}
            />
            {errors.membershipLevelId && (
              <small>Please specify a membership level.</small>
            )}
          </div>
          <Button label="Save" />
        </form>
      </Dialog>
      <div className="my-8">
        <h1 className="font-bold text-4xl">{state.contact.firstName} {state.contact.lastName}</h1>
        <h2 className="text-gray-700">{state.contact.id}</h2>
      </div>
      <div className="text-gray-700">
        <p>{state.contact.email}</p>
        <p>Last login {state.contact.lastLogin ? state.contact.lastLogin : 'Never'}</p>
        <p>Profile last updated {state.contact.dateUpdated ? (new Date(state.contact.dateUpdated)).toLocaleDateString() : 'Never'}</p>
      </div>
    </div>
  );
}