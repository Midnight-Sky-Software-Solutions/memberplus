'use client'

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Nullable } from "primereact/ts-helpers";
import { useActionState, useState } from "react";
import { updateContact } from "./action";

type ContactFormState = {
  firstName: string,
  middleName?: string,
  lastName: string,
  dateOfBirth: Nullable<Date>
}

export default function UpdateContactForm({
  accountId,
  contactId,
  contactVersion,
  contactFirstName,
  contactMiddleName,
  contactLastName,
  contactDateOfBirth
}: {
  accountId: string,
  contactId: string,
  contactVersion: number,
  contactFirstName: string,
  contactMiddleName?: string | null,
  contactLastName: string,
  contactDateOfBirth?: Date
}) {

  const [contactState, setContactState] = useState<ContactFormState>({
    firstName: contactFirstName,
    middleName: contactMiddleName || undefined,
    lastName: contactLastName,
    dateOfBirth: contactDateOfBirth ? new Date(contactDateOfBirth) : null
  })

  const [state, action, pending] = useActionState(updateContact, {});

  return (
    <form className="space-y-8" action={action}>
      {state.message && (
        <div>
          <Message severity="error" text={state.message} />
        </div>
      )}
      <input type="hidden" id="accountId" name="accountId" value={accountId} />
      <input type="hidden" id="id" name="id" value={contactId} />
      <input type="hidden" id="version" name="version" value={contactVersion} />
      <FloatLabel>
        <InputText 
          id="firstName" 
          name="firstName" 
          value={contactState.firstName} 
          onChange={(e) => setContactState({...contactState, firstName: e.target.value})} 
          required 
          maxLength={50} 
        />
        <label htmlFor="firstName">First Name *</label>
        {
          state.errors && state.errors["firstName"] && (
            <p className="p-error">{state.errors["firstName"]}</p>
          )
        }
      </FloatLabel>
      <FloatLabel>
        <InputText 
          id="middleName" 
          name="middleName" 
          value={contactState.middleName} 
          onChange={(e) => setContactState({...contactState, middleName: e.target.value})} 
          maxLength={50} 
        />
        <label htmlFor="middleName">Middle Name</label>
        {
          state.errors && state.errors["middleName"] && (
            <p className="p-error">{state.errors["middleName"]}</p>
          )
        }
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
        <label htmlFor="lastName">Last Name *</label>
        {
          state.errors && state.errors["lastName"] && (
            <p className="p-error">{state.errors["lastName"]}</p>
          )
        }
      </FloatLabel>
      <FloatLabel>
        <Calendar 
          id="dateOfBirth" 
          name="dateOfBirth" 
          value={contactState.dateOfBirth} 
          onChange={(e) => setContactState({...contactState, dateOfBirth: e.value})} 
        />
        <label htmlFor="dateOfBirth">Birth Date</label>
        {
          state.errors && state.errors["dateOfBirth"] && (
            <p className="p-error">{state.errors["dateOfBirth"]}</p>
          )
        }
      </FloatLabel>
      <Button type="submit" size="small" label="Save" disabled={pending} />
    </form>
  );
}