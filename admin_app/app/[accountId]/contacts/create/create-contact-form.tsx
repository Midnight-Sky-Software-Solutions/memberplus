'use client'

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { useActionState, useState } from "react";
import { createContact } from "./action";
import { Message } from "primereact/message";

export default function CreateContactForm({ accountId }: {
  accountId: string
}) {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null as Nullable<Date>);

  const [state, action, pending] = useActionState(createContact, {});

  return (
    <form className="space-y-8" action={action}>
      {state.message && (
        <div>
          <Message severity="error" text={state.message} />
        </div>
      )}
      <input type="hidden" id="accountId" name="accountId" value={accountId} />
      <FloatLabel>
        <InputText id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required maxLength={50} />
        <label htmlFor="firstName">First Name *</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="middleName" name="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} maxLength={50} />
        <label htmlFor="middleName">Middle Name</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={50} required />
        <label htmlFor="lastName">Last Name *</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.value)} />
        <label htmlFor="dateOfBirth">Birth Date</label>
      </FloatLabel>
      <Button type="submit" size="small" label="Save" disabled={pending} />
    </form>
  );
}