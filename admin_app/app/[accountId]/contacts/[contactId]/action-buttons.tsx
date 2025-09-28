'use client'
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import { deleteContact } from "./action";

export default function ActionButtons({ accountId, contactId }: {
  accountId: string,
  contactId: string
}) {

  const [disable, setDisable] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const deleteRecord = () => {
    setDisable(true);
    deleteContact(accountId, contactId).then(() => redirect(`/${accountId}/contacts`));
  };

  return (
    <div className="flex gap-3">
      <ConfirmDialog
        onHide={() => setConfirmationVisible(false)}
        message="Are you sure you want to delete this record? This cannot be undone."
        visible={confirmationVisible}
        accept={deleteRecord}
      />
      <Link 
        href={`/${accountId}/contacts/${contactId}/edit`} 
        className="p-button p-button-sm font-bold"
      >
        Edit
      </Link>
      <Button
        onClick={() => setConfirmationVisible(true)}
        label='Delete' 
        size="small" 
        severity="secondary"
        disabled={disable}
      />
    </div>
  )
}