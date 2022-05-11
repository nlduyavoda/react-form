import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./fieldArray.css";

type input = {
  test_personInfor: {
    inputFirstName?: string;
    inputLastName?: string;
  };
};
const addition = {
  PREPEND: "PREPEND",
  APPEND: "APPEND",
  INSERT: "INSERT",
};
const initialData = [
  { firstName: "Bill", lastName: "ish" },
  { firstName: "alisa", lastName: "osen" },
];
const FieldArray = () => {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      personInfor: initialData,
    },
  });
  const [status, setStatus] = useState(false);

  const {
    control: test_control,
    register: test_register,
    handleSubmit: hanlde_submit,
  } = useForm({
    defaultValues: {
      test_personInfor: { inputFirstName: "ajax", inputLastName: "william" },
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "personInfor",
    }
  );

  const on_submit = ({ test_personInfor }: input) =>
    append({
      firstName: test_personInfor.inputFirstName,
      lastName: test_personInfor.inputLastName,
    });

  const handleSwap = () => {
    swap(0, 1);
  };
  const handleAdd = (props: string) => {
    const number = Math.random().toFixed(3).toString();
    switch (props) {
      case addition.APPEND:
        append({ firstName: `${number}`, lastName: `appended-${number}` });
        break;
      case addition.PREPEND:
        prepend({ firstName: `${number}`, lastName: `prepended-${number}` });
        break;
      case addition.INSERT:
        insert(2, { firstName: `${number}`, lastName: `inserted-${number}` });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="table">
        <div className="header">
          <div>stt</div>
          <div className="firstName">First Name</div>
          <div className="lastName">Last Name</div>
          <div className=""></div>
        </div>

        <div>
          {fields.map((field: any, index: number) => {
            return (
              <div key={field.id} className="row-item">
                <label>{index + 1}</label>
                <div>
                  <input {...register(`personInfor.${index}.firstName`)} />
                </div>
                <div>
                  <input {...register(`personInfor.${index}.lastName`)} />
                </div>
                <div onClick={() => remove(index)}>x</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="tool-table">
        {/* <form onSubmit={hanlde_submit(on_submit)}>
          <div className="inputfields">
            <input {...test_register(`test_personInfor.inputFirstName`)} />
            <input {...test_register(`test_personInfor.inputLastName`)} />
            <button className="button-primary" type="submit">
              add to fields
            </button>
          </div>
        </form> */}
        <div className="buttons-option">
          <div className="button-primary" onClick={() => handleSwap()}>
            swap index 0 - 1
          </div>
          <div
            className="button-primary"
            onClick={() => handleAdd(addition.APPEND)}
          >
            append
          </div>
          <div
            className="button-primary"
            onClick={() => handleAdd(addition.PREPEND)}
          >
            prepend
          </div>
          <div
            className="button-primary"
            onClick={() => handleAdd(addition.INSERT)}
          >
            insert at [3]
          </div>
          <div
            className="button-primary"
            onClick={() => {
              move(1, 2);
            }}
          >
            move index [1-2]
          </div>
          <div
            className="button-primary"
            onClick={() => {
              reset({ personInfor: initialData });
            }}
          >
            reset
          </div>
        </div>
      </div>
    </div>
  );
};
export default FieldArray;
