import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { product } from "../App";
import "./form.css";
import { Input } from "./input";
const featApi = (id: string | undefined) => {
  const response = fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json: product) => json);
  return response;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const { id } = useParams();
  let navigate = useNavigate();
  const { data, isLoading } = useQuery(["product", id], () => featApi(id));
  console.log("errors :>> ", errors);
  return (
    <div className="form-container">
      {!isLoading && data ? (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <button
            className="btn-back"
            onClick={() => {
              navigate("/");
            }}
          >
            back
          </button>

          <div>
            <Input
              name={data.title}
              register={register(data.title, { maxLength: 12 })}
              errorsMessage="too much long"
            />
          </div>
          <div>
            <label htmlFor="category">category: </label>
            <input defaultValue={data.category} {...register("category")} />
          </div>
          <div>
            <label htmlFor="price">price: </label>

            <input defaultValue={data.price} {...register("price")} />
          </div>
          <div>
            <label htmlFor="description">description: </label>

            <input
              defaultValue={data.description}
              {...register("description")}
            />
          </div>
          <img src={data.image} alt="" />
          {errors.exampleRequired && <span>This field is required</span>}
          <div>
            <button className="button-primary" type="submit">
              submit
            </button>
          </div>
        </form>
      ) : (
        "loading"
      )}
    </div>
  );
}
