'use client'

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useActionState, useState } from "react";
import { createTenant } from "./action";
import { Message } from "primereact/message";

const initialState = {
  message: ''
};

export default function CreateTenantForm() {

  const [state, formAction, pending] = useActionState(createTenant, initialState);
  const [tenantId, setTenantId] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [tenantExternalId, setTenantExternalId] = useState('');

  return (
    <form className="space-y-10 pt-10" action={formAction}>
      {state.message && (
        <div>
          <Message severity="error" text={state.message} />
        </div>
      )}
      <FloatLabel>
        <InputText id="id" name="id" value={tenantId} onChange={e => setTenantId(e.target.value)} required />
        <label htmlFor="id">Id</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="name" name="name" value={tenantName} onChange={e => setTenantName(e.target.value)} required />
        <label htmlFor="name">Name</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="externalId" name="externalId" value={tenantExternalId} onChange={e => setTenantExternalId(e.target.value)} required />
        <label htmlFor="externalId">External Id</label>
      </FloatLabel>
      <Button label="Save" type="submit" disabled={pending} size="small" />
    </form>
  );

}