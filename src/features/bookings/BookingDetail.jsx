import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "./useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmBookingDelete from "./ConfirmBookingDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isLoading: isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleDelete() {}

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          {status === "unconfirmed" && (
            <>
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check-IN
              </Button>
              <Modal.Open opens="deleteBooking">
                <Button variation="danger" onClick={handleDelete}>
                  Delete Booking
                </Button>
              </Modal.Open>
            </>
          )}
          <Modal.Window name="deleteBooking">
            <ConfirmBookingDelete bookingId={bookingId} inside={true} />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkout(bookingId);
            }}
            disabled={isCheckingOut}
          >
            Check-OUT
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
