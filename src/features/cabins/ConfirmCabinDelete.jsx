import Button from "../../ui/Button";
import { useDeleteCabin } from "./useDeleteCabin";
import styled from "styled-components";

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

function ConfirmCabinDelete({ cabin, onClose }) {
  const { cabinDeletion, isLoading } = useDeleteCabin();

  return (
    <Modal>
      <div>
        <h2>Delete</h2>
        <p>
          Are you sure , you want to <Em>delete</Em> {cabin.name} cabin
          permanently? This action cannot be undone.
        </p>
      </div>
      <Div>
        <Button
          onClick={() => {
            cabinDeletion(cabin.id);
          }}
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

export default ConfirmCabinDelete;
