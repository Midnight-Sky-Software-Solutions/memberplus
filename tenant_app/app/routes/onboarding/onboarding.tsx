import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function Onboard() {
  return (
    <div>
      <h1 className="text-xl font-bold">Welcome to Member Plus</h1>
      <p>We need a little bit of information before we get you started.</p>
      <form className="py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <InputText id="name" name="name" />
        </div>
        <Button label="Let's Go" />
      </form>
    </div>
  );
}