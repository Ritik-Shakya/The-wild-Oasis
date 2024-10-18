import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDuplicateCabin } from "./useDuplicateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmCabinDelete from "./ConfirmCabinDelete";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  padding-left: 5px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  // const { cabinDeletion, isLoading } = useDeleteCabin();
  const { duplicationCabin, isLoading: isDuplicating } = useDuplicateCabin();

  const { image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  function handleDuplicate() {
    duplicationCabin({
      image,
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} alt="cabin-image" />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={handleDuplicate} disabled={isDuplicating}>
            <HiSquare2Stack />
          </button>
          {/* <button onClick={() => setShowEditForm((prev) => !prev)}>
            <HiPencil />
          </button> */}
          <button>
            <Modal>
              <Modal.Open opens="edit">
                <HiPencil />
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateCabinForm cabin={cabin} />
              </Modal.Window>
            </Modal>
          </button>
          {/* <button onClick={() => cabinDeletion(cabin.id)} disabled={isLoading}>
            <HiTrash />
          </button> */}
          <button>
            <Modal>
              <Modal.Open opens="deleteConfirm">
                <HiTrash />
              </Modal.Open>
              <Modal.Window name="deleteConfirm">
                <ConfirmCabinDelete cabin={cabin} />
              </Modal.Window>
            </Modal>
          </button>
        </div>
      </Table.Row>
      {/* {showEditForm && (
        <CreateCabinForm cabin={cabin} setShowEditForm={setShowEditForm} />
      )} */}
    </>
  );
}

export default CabinRow;
