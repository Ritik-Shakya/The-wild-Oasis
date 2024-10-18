import Button from "../../ui/Button";
import styled from "styled-components";
import { useDeleteBooking } from "./useDeleteBooking";

const Modal = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 30px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: right;
  gap: 17px;
`;

const Em = styled.strong`
  color: red;
`;

function ConfirmBookingDelete({ bookingId, onClose }) {
  const { DeleteBooking, isLoading } = useDeleteBooking();
  return (
    <Modal>
      <div>
        <h2>Delete</h2>
        <p>
          Are you sure , you want to <Em>delete</Em> Booking {bookingId}{" "}
          permanently? This action cannot be undone.
        </p>
      </div>
      <Div>
        <Button
          onClick={() => DeleteBooking(bookingId)}
          disabled={isLoading}
          variation="danger"
        >
          Delete
        </Button>
        <Button onClick={() => onClose()} variation="secondary">
          Cancel
        </Button>
      </Div>
    </Modal>
  );
}

export default ConfirmBookingDelete;
