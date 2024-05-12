import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div>
      <Link className="text-lag mt-8 flex px-4 py-3 text-yellow-400" to="/menu">
        &larr; Back to menu
      </Link>

      <p className="mt-7 text-lg font-semibold text-stone-800">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
