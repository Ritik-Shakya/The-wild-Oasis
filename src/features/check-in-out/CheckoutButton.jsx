import Button from "../../ui/Button";
import { useCheckout } from "../bookings/useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkout, isLoading } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
