'use client'

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useActionState, useEffect, useRef, useState } from "react";
import { updateTenant } from "./action";
import { Toast } from "primereact/toast";
import { useToast } from "@/components/toast-provider";


const initialState = {
  message: '',
  success: false
};

export default function UpdateTenantForm({
  id,
  name,
  externalId
}: {
  id: string,
  name: string,
  externalId: string
}) {

  const [state, formAction, pending] = useActionState(updateTenant, initialState);
  const [tenantName, setTenantName] = useState(name);
  const [tenantExternalId, setTenantExternalId] = useState(externalId);
  const toast = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        severity: "success",
        summary: "Saved",
        detail: 'The tenant was updated successfully!'
      })
    }
  }, [state])

  return (
    <form className="space-y-10 pt-10" action={formAction}>
      {state.message && (
        <div>
          <Message severity="error" text={state.message} />
        </div>
      )}
      <input type="hidden" name="id" value={id} />
      <FloatLabel>
        <InputText id="name" name="name" value={tenantName} onChange={e => setTenantName(e.target.value)} className="w-full" required />
        <label htmlFor="name">Name</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="externalId" name="externalId" value={tenantExternalId} onChange={e => setTenantExternalId(e.target.value)} className="w-full" required />
        <label htmlFor="externalId">External Id</label>
      </FloatLabel>
      <Button label="Save" type="submit" disabled={pending} size="small" />
    </form>
  )
}