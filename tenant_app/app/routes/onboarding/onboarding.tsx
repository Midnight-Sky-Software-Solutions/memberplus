import apiClient from "lib/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string
};

export default function Onboard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => apiClient.POST('/api/Onboarding', {
    body: data
  });

  return (
    <div>
      <h1 className="text-xl font-bold">Welcome to MemberPlus</h1>
      <p>We need a little bit of information before we get you started.</p>
      <form className="py-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <InputText id="name" {...register('name', { required: true, maxLength: 100 })} />
          {errors.name && (
            <small>
              A name is required.
            </small>
          )}
        </div>
        <Button label="Let's Go" disabled={isLoading} />
      </form>
    </div>
  );
}