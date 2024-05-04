import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import LoadingSpiner from "../ui/LoadingSpiner";

function AppLayout() {
  const navegation = useNavigation();
  const loading = navegation.state === "loading";

  return (
    <div>
      {loading && <LoadingSpiner />}
      <Header />
      <Outlet />
      <CartOverview />
    </div>
  );
}

export default AppLayout;
