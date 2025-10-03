'use client'

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { ReactNode, useActionState, useState } from "react";
import { createContact } from "./action";
import { Message } from "primereact/message";
import { useRouter } from "next/navigation";

type ContactFormState = {
  firstName: string,
  middleName?: string,
  lastName: string,
  dateOfBirth: Nullable<Date>
}

export default function CreateContactForm({ accountId }: {
  accountId: string
}) {

  const [contactState, setContactState] = useState<ContactFormState>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: null as Nullable<Date>
  })

  const [state, action, pending] = useActionState(createContact, {});

  const router = useRouter();

  return (
    <form className="space-y-8" action={action}>
      {state.message && (
        <div>
          <Message severity="error" text={state.message} />
        </div>
      )}
      <input type="hidden" id="accountId" name="accountId" value={accountId} />
      <FloatLabel>
        <InputText 
          id="firstName" 
          name="firstName" 
          value={contactState.firstName} 
          onChange={(e) => setContactState({...contactState, firstName: e.target.value})} 
          required 
          maxLength={50} 
        />
        {
          state.errors && state.errors['firstName'] && (
            <ErrorText>{state?.errors['firstName'][0]}</ErrorText>
          )
        }
        <label htmlFor="firstName">First Name *</label>
      </FloatLabel>
      <FloatLabel>
        <InputText 
          id="middleName" 
          name="middleName" 
          value={contactState.middleName} 
          onChange={(e) => setContactState({...contactState, middleName: e.target.value})} 
          maxLength={50} 
        />
        {
          state.errors && state.errors['middleName'] && (
            <ErrorText>{state?.errors['middleName'][0]}</ErrorText>
          )
        }
        <label htmlFor="middleName">Middle Name</label>
      </FloatLabel>
      <FloatLabel>
        <InputText 
          id="lastName" 
          name="lastName" 
          value={contactState.lastName} 
          onChange={(e) => setContactState({...contactState, lastName: e.target.value})} 
          maxLength={50} 
          required 
        />
        {
          state.errors && state.errors['lastName'] && (
            <ErrorText>{state?.errors['lastName'][0]}</ErrorText>
          )
        }
        <label htmlFor="lastName">Last Name *</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar 
          id="dateOfBirth" 
          name="dateOfBirth" 
          value={contactState.dateOfBirth} 
          onChange={(e) => setContactState({...contactState, dateOfBirth: e.value})} 
        />
        {
          state.errors && state.errors['dateOfBirth'] && (
            <ErrorText>{state?.errors['dateOfBirth'][0]}</ErrorText>
          )
        }
        <label htmlFor="dateOfBirth">Birth Date</label>
      </FloatLabel>
      <div className="flex gap-3">
        <Button type="submit" size="small" label="Save" disabled={pending} />
        <Button onClick={() => router.back()} severity="secondary" size="small" label="Cancel" />
      </div>
    </form>
  );
}

function ErrorText({ children } : {
  children?: ReactNode
}) {
  return (
    <p className="p-error">{children}</p>
  );
}