'use client'

import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useActionState, useState } from "react";
import { createMembershipLevel } from "./action";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useRouter } from "next/navigation";

type CreateMembershipLevelFormData = {
  accountId: string,
  name: string,
  price: number,
  renewalPeriodId: number,
}

export default function CreateMembershipLevelForm({
  accountId,
  renewalPeriods
}: {
  accountId: string,
  renewalPeriods: {
    id: number,
    name: string
  }[]
}) {

  const initialCreateMembershipLevelFormData: CreateMembershipLevelFormData = {
    accountId,
    name: '',
    price: 0.0,
    renewalPeriodId: 1
  };

  const [formData, setFormData] = useState(initialCreateMembershipLevelFormData);
  const [state, action, pending] = useActionState(createMembershipLevel, {});

  const router = useRouter();

  return (
    <form className="space-y-8" action={action}>
      <input type="hidden" name="accountId" value={formData.accountId} />
      <FloatLabel>
        <InputText 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
          maxLength={50} 
        />
        <label htmlFor="name">Name *</label>
      </FloatLabel>
      <FloatLabel>
        <InputNumber 
          id="price" 
          name="price"
          minFractionDigits={2} 
          maxFractionDigits={5}
          value={formData.price} 
          onValueChange={(e) => setFormData({...formData, price: e.value!})} 
          required 
        />
        <label htmlFor="price">Price *</label>
      </FloatLabel>
      <FloatLabel>
        <Dropdown
          inputId="renewalPeriodId"
          name="renewalPeriodId"
          options={renewalPeriods}
          optionLabel="name"
          optionValue="id"
          value={formData.renewalPeriodId} 
          onChange={(e) => setFormData({...formData, renewalPeriodId: e.value})}
          className="w-61"
          required
        />
        <label htmlFor="renewalPeriodId">Renewal Period</label>
      </FloatLabel>
      <div className="flex gap-3">
        <Button type="submit" size="small" label="Save" disabled={pending} />
        <Button onClick={() => router.back()} severity="secondary" size="small" label="Cancel" />
      </div>
    </form>
  )
}