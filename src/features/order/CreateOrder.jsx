import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";
import Loader from "../../ui/Loader";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totaleprice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();
  const { username, status, address, error, position } = useSelector(
    (state) => state.user
  );
  function handelFetchAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }
  useEffect(() => {
    setUserAddress(address);
  }, [address]);

  const isLoading = status === "loading";

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>
      {isLoading && <Loader />}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" relative mb-5 flex flex-col gap-2 pb-[60px] sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              onChange={(e) => setUserAddress(e.target.value)}
              value={userAddress}
            />
          </div>
          {!userAddress && (
            <Button type="small" onClick={(e) => handelFetchAddress(e)}>
              get Address
            </Button>
          )}
          {status === "error" && (
            <p className="error text-md absolute bottom-0 right-0 w-[100%]  rounded-full bg-red-200 p-3 font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order...."
              : "Order now for " + formatCurrency(totaleprice)}
          </Button>
        </div>
      </Form>
    </div>
  );
}
/// this action working whene you submit the form
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
