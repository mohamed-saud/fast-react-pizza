import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem, getCurrntQuantityById } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";
/* eslint-disable react/prop-types */

function CartItem({ item }) {
  const dispach = useDispatch();

  const { pizzaId, name, quantity, totalPrice } = item;
  const getCurrntQuantity = useSelector(getCurrntQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} currntQuantity={getCurrntQuantity} />
        <Button type="small" onClick={() => dispach(deleteItem(pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
