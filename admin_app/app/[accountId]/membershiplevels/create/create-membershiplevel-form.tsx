'use client'

import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useActionState, useState } from "react";
import { createMembershipLevel } from "./action";
import { Button } from "primereact/button";

type CreateMembershipLevelFormData = {
  accountId: string,
  name: string,
  price: number,
  renewalPeriodId: number
}

export default function CreateMembershipLevelForm({
  accountId
}: {
  accountId: string
}) {

  const initialCreateMembershipLevelFormData: CreateMembershipLevelFormData = {
    accountId,
    name: '',
    price: 0.0,
    renewalPeriodId: 1
  };

  const [formData, setFormData] = useState(initialCreateMembershipLevelFormData);
  const [state, action, pending] = useActionState(createMembershipLevel, {});

  return (
    <form className="space-y-8" action={action}>
      <input type="hidden" name="accountId" value={formData.accountId} />
      <input type="hidden" name="renewalPeriodId" value={formData.renewalPeriodId} onChange={() => undefined} />
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
      <Button type="submit" size="small" label="Save" disabled={pending} />
    </form>
  )
}