import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add a new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpenModal((prev) => !prev)}>
//         Add a new Cabin
//       </Button>
//       {openModal ? (
//         <Modal onClose={() => setOpenModal(false)}>
//           <CreateCabinForm onClose={() => setOpenModal(false)} />
//         </Modal>
//       ) : null}
//     </>
//   );
// }

export default AddCabin;
