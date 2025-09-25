import PageTitle from "@/components/page-title";
import CreateTenantForm from "./create-tenant-form";


export default function CreateTenantPage() {

  return (
    <div className="space-y-5">
      <PageTitle>New Tenant</PageTitle>
      <CreateTenantForm />
    </div>
  )
}