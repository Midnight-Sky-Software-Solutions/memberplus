'use client'

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Nullable } from "primereact/ts-helpers";
import { useActionState, useState } from "react";
import { updateContact } from "./action";

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

  const [firstName, setFirstName] = useState(contactFirstName);
  const [middleName, setMiddleName] = useState(contactMiddleName);
  const [lastName, setLastName] = useState(contactLastName);
  const [dateOfBirth, setDateOfBirth] = useState(contactDateOfBirth ? new Date(contactDateOfBirth) : undefined as Nullable<Date>);

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
        <InputText id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required maxLength={50} />
        <label htmlFor="firstName">First Name *</label>
      </FloatLabel>
      {
        state.errors && state.errors["firstName"] && (
          <p className="p-error">{state.errors["firstName"]}</p>
        )
      }
      <FloatLabel>
        <InputText id="middleName" name="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} maxLength={50} />
        <label htmlFor="middleName">Middle Name</label>
      </FloatLabel>
      {
        state.errors && state.errors["middleName"] && (
          <p className="p-error">{state.errors["middleName"]}</p>
        )
      }
      <FloatLabel>
        <InputText id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={50} required />
        <label htmlFor="lastName">Last Name *</label>
      </FloatLabel>
      {
        state.errors && state.errors["lastName"] && (
          <p className="p-error">{state.errors["lastName"]}</p>
        )
      }
      <FloatLabel>
        <Calendar id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.value)} />
        <label htmlFor="dateOfBirth">Birth Date</label>
      </FloatLabel>
      {
        state.errors && state.errors["dateOfBirth"] && (
          <p className="p-error">{state.errors["dateOfBirth"]}</p>
        )
      }
      <Button type="submit" size="small" label="Save" disabled={pending} />
    </form>
  );
}