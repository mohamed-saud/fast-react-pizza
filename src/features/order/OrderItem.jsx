import { formatCurrency } from "../../utils/helpers";
/* eslint-disable react/prop-types */

// function OrderItem({ item, isLoadingIngredients, ingredients }) {
function OrderItem({ item, ingredient, isLoadingIngredint }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <div className="flex gap-3 space-x-2 text-sm font-light italic">
        {isLoadingIngredint
          ? ingredient?.map((ing) => <p key={ing}>{ing}</p>)
          : "Loading..."}
      </div>
    </li>
  );
}

export default OrderItem;
