
import apiClient from "lib/api";
import type { Route } from "./+types/edit-contact";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AccountContext } from "context/account-context";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

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

type Inputs = {
  version: number,
  firstName: string,
  lastName: string,
  organization: string,
  email: string,
  phone: string
}

export default function EditContact({
  loaderData, params
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const { id: accountId } = useContext(AccountContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<Inputs>();
  const { contact } = loaderData;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await apiClient.PUT("/api/Accounts/{accountId}/Contacts/{id}", {
      params: {
        path: {
          accountId,
          id: params.id
        }
      },
      body: data
    });
    if (error) {
      throw error;
    }
    navigate(`/contacts/${params.id}`);
  };

  return (
      <div className="p-8 grow bg-white">
        <h1 className="font-bold text-4xl">Edit Contact</h1>
        <p>Some copy about contact records.</p>
        <form className="py-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" id="version" {...register('version', { value: contact.version })} />
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <InputText className="max-w-80" id="firstName" {...register('firstName', { required: true, maxLength: 50, value: contact.firstName })} invalid={!!errors.firstName} />
            {errors.firstName && (
              <small>
                First name is required.
              </small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <InputText className="max-w-80" id="lastName" {...register('lastName', { required: true, maxLength: 50, value: contact.lastName })} invalid={!!errors.lastName} />
            {errors.lastName && (
              <small>
                Last name is required.
              </small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="organization">Organization</label>
            <InputText className="max-w-80" id="organization" {...register('organization', { required: false, maxLength: 50, value: contact.organization ?? undefined })} invalid={!!errors.organization} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <InputText className="max-w-80" id="email" {...register('email', { required: true, maxLength: 50, value: contact.email })} invalid={!!errors.email} />
            {errors.email && (
              <small>
                Email is required.
              </small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <InputText className="max-w-80" id="phone" {...register('phone', { required: false, maxLength: 50, value: contact.phone ?? undefined })} invalid={!!errors.phone} />
          </div>
          <Button label="Save" type="submit" disabled={isLoading} />
        </form>
      </div>
    );
}