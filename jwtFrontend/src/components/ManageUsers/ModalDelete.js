import { Button, Modal } from "react-bootstrap";

const ModalDelete = (props) => {
  const {
    isShowModalDel,
    setIsShowModalDel,
    userDelete,
    onClickYesModalDelete,
  } = props;

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={isShowModalDel} centered>
        <Modal.Header closeButton onClick={setIsShowModalDel}>
          <Modal.Title>DELETE USER</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure delete {userDelete.username}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={setIsShowModalDel}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => onClickYesModalDelete(userDelete)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalDelete;
