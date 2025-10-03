'use client'

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { useActionState, useState } from "react";
import { onboardTenant } from "./action";

export default function OnboardTenantForm() {

  const [organizationName, setOrganizatinoName] = useState('');
  const [state, formAction, isPending] = useActionState(onboardTenant, {});

  return (
    <form className="space-y-8" action={formAction}>
      <h1 className="text-4xl font-bold">Welcome to MemberPlus</h1>
      <p className="text-gray-600">
        We just need some basic information before getting started.
      </p>
      <FloatLabel>
        <InputText id="name" name="name" value={organizationName} onChange={(e) => setOrganizatinoName(e.target.value)} />
        <label htmlFor="Organization Name">Organization Name</label>
      </FloatLabel>
      <Button
        size="small"
        type="submit"
        label="Confirm"
        disabled={isPending}
      />
    </form>
  )
}