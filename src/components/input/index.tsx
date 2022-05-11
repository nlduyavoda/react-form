export function Input({ name, register, errors, errorsMessage }: any) {
  return (
    <div>
      <label>{name}</label>
      <input defaultValue={name} type="text" {...register} />
    </div>
  );
}
