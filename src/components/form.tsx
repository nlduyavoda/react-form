import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { product } from "../App";
import "./form.css";
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
  return (
    <div className="form-container">
      <button
        className="btn-back"
        onClick={() => {
          navigate("/");
        }}
      >
        back
      </button>
      {!isLoading && data ? (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">title: </label>
            <input defaultValue={data.title} {...register("title")} />
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

          <input type="submit" />
        </form>
      ) : (
        "loading"
      )}
    </div>
  );
}
