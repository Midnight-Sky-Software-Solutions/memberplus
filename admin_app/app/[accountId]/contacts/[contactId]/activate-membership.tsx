'use client'

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";
import { activateContact } from "./action";

type ActivateMembershipState = {
  memberStatus: string,
  selectedMembershipLevelId?: string
} & ({
    status: 'idle'
  }| {
    status: 'working'
  }| {
    status: 'prompting',
  }
);

export default function ActivateMembership({
  memberStatus,
  contactId,
  accountId,
  membershipLevels
} : {
  memberStatus: string,
  contactId: string,
  accountId: string,
  membershipLevels: {
    name: string,
    id: string
  }[]
}) {

  const [state, setState] = useState<ActivateMembershipState>({ status: 'idle', memberStatus });

  const showPrompt = () => {
    setState({...state, status: 'prompting'});
  }

  const activateMembership = async () => {
    setState({...state, status: 'working'});
    await activateContact(accountId, contactId, state.selectedMembershipLevelId!);
    setState({memberStatus: 'Active', status: 'idle'})
  }

  return (
    <div>
      <h2 className="text-gray-600">Membership</h2>
      <p className="font-bold">
        {
          state.memberStatus === 'Active' ?
            <>{state.memberStatus}</>
            : state.status === 'working' ?
              <>Activating...</>
              : <a className="cursor-pointer text-blue-500" onClick={showPrompt}>Activate</a>
        }
      </p>
      <Dialog 
        header="Activate Membership" 
        style={{ width: '50vw' }}
        onHide={() => setState({...state, status: 'idle'})}
        visible={state.status === 'prompting'}
      >
        <div className="space-y-5">
          <FloatLabel>
            <Dropdown
              inputId="membershipLevelId"
              name="membershipLevelId"
              options={membershipLevels}
              optionLabel="name"
              optionValue="id"
              className="w-61"
              value={state.selectedMembershipLevelId}
              onChange={e => setState({...state, selectedMembershipLevelId: e.value})}
            />
            <label htmlFor="membershipLevelId">Membership Level</label>
          </FloatLabel>
          <Button onClick={activateMembership} disabled={!state.selectedMembershipLevelId}>Activate</Button>
        </div>
      </Dialog>
    </div>
  );
}