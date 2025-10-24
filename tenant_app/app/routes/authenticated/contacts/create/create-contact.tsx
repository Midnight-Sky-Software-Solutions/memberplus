import { AccountContext } from "context/account-context";
import apiClient from "lib/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  password: string,
  firstName: string,
  lastName: string,
  organization: string,
  email: string,
  phone: string
}

export default function CreateContact() {
  const { id: accountId } = useContext(AccountContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => apiClient.POST("/api/Accounts/{accountId}/Contacts", {
    params: {
      path: {
        accountId
      }
    },
    body: data
  });

  return (
    <div className="p-8 grow bg-white">
      <h1 className="font-bold text-4xl">Add Contact</h1>
      <p>Some copy about contact records.</p>
      <form className="py-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <InputText className="max-w-80" id="password" {...register('password', { required: true, maxLength: 100 })} invalid={!!errors.password} />
          {errors.password && (
            <small>
              A password is required.
            </small>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <InputText className="max-w-80" id="firstName" {...register('firstName', { required: true, maxLength: 100 })} invalid={!!errors.firstName} />
          {errors.firstName && (
            <small>
              First name is required.
            </small>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <InputText className="max-w-80" id="lastName" {...register('lastName', { required: true, maxLength: 100 })} invalid={!!errors.lastName} />
          {errors.lastName && (
            <small>
              Last name is required.
            </small>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="organization">Organization</label>
          <InputText className="max-w-80" id="organization" {...register('organization', { required: false, maxLength: 100 })} invalid={!!errors.organization} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <InputText className="max-w-80" id="email" {...register('email', { required: true, maxLength: 100 })} invalid={!!errors.email} />
          {errors.email && (
            <small>
              Email is required.
            </small>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone</label>
          <InputText className="max-w-80" id="phone" {...register('phone', { required: false, maxLength: 100 })} invalid={!!errors.phone} />
        </div>
        <Button label="Save" disabled={isLoading} />
      </form>
    </div>
  );
}