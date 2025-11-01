import apiClient from "lib/api";
import type { Route } from "./+types/view-contact";
import { Link } from "react-router";
import type { components } from "lib/api.d";
import { useContext, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { AccountContext } from "context/account-context";
import { Calendar } from "primereact/calendar";

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
} | {
  status: 'assigning'
}| {
  status: 'canceling'
});

type Inputs = {
  membershipLevelId: string,
  startDate: Date
};

export default function ViewContact({
  loaderData, params
}: Route.ComponentProps) {
  const [state, setState] = useState<ViewContactState>({ contact: loaderData.contact, status: 'idle' });
  const { id: accountId } = useContext(AccountContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await apiClient.POST("/api/Accounts/{accountId}/Contacts/{id}/membership", {
      params: {
        path: {
          accountId,
          id: state.contact.id
        }
      },
      body: {
        ...data,
        startDate: data.startDate.toJSON()
      }
    });
    const { data: contact } = await apiClient.GET("/api/Accounts/{accountId}/Contacts/{id}", {
      params: {
        path: {
          accountId: accountId,
          id: state.contact.id
        }
      }
    });
    setState({ ...state, status: 'idle', contact: contact! });
  }

  const onCancel = async() => {
    setState({...state, status: 'canceling'});
    await apiClient.DELETE('/api/Accounts/{accountId}/Contacts/{id}/membership', {
      params: {
        path: {
          accountId,
          id: state.contact.id
        }
      },
    });
    const { data: contact } = await apiClient.GET("/api/Accounts/{accountId}/Contacts/{id}", {
      params: {
        path: {
          accountId: accountId,
          id: state.contact.id
        }
      }
    });
    setState({ ...state, status: 'idle', contact: contact! });
  }

  return (
    <div className="bg-white grow p-8">
      <div className="flex gap-2">
        <Link to={`/contacts/${params.id}/edit`} className="p-button font-bold">Edit contact</Link>
        {(state.contact.memberStatusCode === 'MS01' || state.contact.memberStatusCode === 'MS04' || state.contact.memberStatusCode === 'MS05') ? (
          <Button outlined label="Assign membership" onClick={() => setState({ ...state, status: 'assigning' })} />
        ) : (
          <Button outlined label="Cancel membership" onClick={onCancel} disabled={state.status === 'canceling'} />
        )}
      </div>
      <Dialog
        onHide={() => setState({ ...state, status: 'idle' })}
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
              render={({ field }) => (
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
            <label htmlFor="startDate">Start Date</label>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: true }}
              render={({field}) => (
                <Calendar
                  id="startDate"
                  {...field}
                />
              )}
            />
            {errors.startDate && (
              <small>Please specify a start date.</small>
            )}
          </div>
          <Button label="Save" disabled={isLoading} />
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
      <h2 className="text-2xl my-8 font-bold">Membership</h2>
      <table className="border-separate border-spacing-x-3">
        <tr>
          <td className="text-right text-gray-500">Membership level</td>
          <td>{state.contact.membershipLevelName}</td>
        </tr>
        <tr>
          <td className="text-right text-gray-500">Membership status</td>
          <td>{state.contact.memberStatusName}</td>
        </tr>
        <tr>
          <td className="text-right text-gray-500">Start date</td>
          <td>{state.contact.subscriptionStartDate ? new Date(state.contact.subscriptionStartDate).toLocaleDateString() : ''}</td>
        </tr>
        <tr>
          <td className="text-right text-gray-500">End date</td>
          <td>{state.contact.subscriptionEndDate ? new Date(state.contact.subscriptionEndDate).toLocaleDateString() : ''}</td>
        </tr>
      </table>
    </div>
  );
}