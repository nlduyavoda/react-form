import { useQuery } from "react-query";
import { fetchApi, product } from "../App";

export default function Home({ onHandleEdit }: any) {
  const { data, isLoading } = useQuery(["products"], () => fetchApi());
  return (
    <div>
      {!isLoading ? (
        <div className="App">
          {data.map((item: product) => {
            return (
              <div className="product" key={item.id}>
                <div>{item.title} </div>
                <div onClick={() => onHandleEdit(item.id)}>edit</div>
              </div>
            );
          })}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
