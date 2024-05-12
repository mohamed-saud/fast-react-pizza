import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreseItemeQuantity, increseItemeQuantity } from "./cartSlice";
/* eslint-disable react/prop-types */

function UpdateItemQuantity({ id, currntQuantity }) {
  const dispach = useDispatch();
  return (
    <div className="flex items-center justify-between gap-1">
      <Button type="round" onClick={() => dispach(decreseItemeQuantity(id))}>
        -
      </Button>
      <p>{currntQuantity}</p>
      <Button type="round" onClick={() => dispach(increseItemeQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
