'use client'

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useActionState, useState } from "react";
import { updateMembershipLevel } from "./action";
import { Message } from "primereact/message";

export default function UpdateMembershipLevelForm({ 
  accountId,
  renewalPeriods,
  membershipLevel 
}: {
  accountId: string,
  renewalPeriods: {
    id: number,
    name: string
  }[],
  membershipLevel: {
    id: string,
    version: number,
    name: string,
    price: number,
    renewalPeriodId: number
  }
}) {

  const [formData, setFormData] = useState(membershipLevel);
  const [state, action, pending] = useActionState(updateMembershipLevel, {});

  return (
    <form className="space-y-8" action={action}>
      <input type="hidden" name="accountId" value={accountId} />
      <input type="hidden" id="id" name="id" value={formData.id} />
      <input type="hidden" id="version" name="version" value={formData.version} />
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
      {
        state.message?.name && (
          <Message severity="error" text={state.message.name} />
        )
      }
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
      {
        state.message?.price && (
          <Message severity="error" text={state.message.price} />
        )
      }
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
      {
        state.message?.renewalPeriodId && (
          <Message severity="error" text={state.message.renewalPeriodId} />
        )
      }
      <Button type="submit" size="small" label="Save" disabled={pending} />
    </form>
  );
}