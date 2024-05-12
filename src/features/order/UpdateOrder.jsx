import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder as updateorder } from "../../services/apiRestaurant";
/* eslint-disable react/prop-types */

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  if (order.priority) return;
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Update priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateorder(params.orderId, data);
  return null;
}
export default UpdateOrder;
