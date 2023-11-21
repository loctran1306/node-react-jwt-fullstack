import { Button, Modal } from "react-bootstrap";
import "./Users.scss";
import { useEffect, useState } from "react";
import {
  createNewUser,
  getAllGroup,
  updateUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUser = (props) => {
  const { isShowModalUser, setIsShowModalUser, refreshListUser } = props;
  const defaultDataUser =
    isShowModalUser.type === "edit"
      ? {
          email: isShowModalUser.user.email || "",
          password: isShowModalUser.user.password || "",
          username: isShowModalUser.user.username || "",
          address: isShowModalUser.user.address || "",
          sex: isShowModalUser.user.sex || "Male",
          phone: isShowModalUser.user.phone || "",
          groupId:
            (isShowModalUser.user.Group && isShowModalUser.user.Group.id) || "",
        }
      : {
          email: "",
          password: "",
          username: "",
          address: "",
          sex: "Male",
          phone: "",
          groupId: "",
        };
  const ValidDefaultDataUser = {
    email: true,
    password: true,
    username: true,
    address: true,
    sex: true,
    phone: true,
    groupId: true,
  };
  const [dataUser, setDataUser] = useState(defaultDataUser);
  const [validInputDataUser, setValidInputDataUser] =
    useState(ValidDefaultDataUser);
  const [listGroup, setListGroup] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let response = await getAllGroup();
    if (response && response.data && +response.data.EC === 0) {
      setListGroup(response.data.DT);
      if (
        response.data.DT &&
        response.data.DT &&
        isShowModalUser.type !== "edit"
      ) {
        let _dataUser = _.cloneDeep(dataUser);
        _dataUser["groupId"] = response.data.DT[0].id;
        setDataUser(_dataUser);
      }
    } else {
      toast.error(response?.data.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    let _dataUser = _.cloneDeep(dataUser);
    _dataUser[name] = value;
    setDataUser(_dataUser);
    let _validDataUser = _.cloneDeep(validInputDataUser);
    _validDataUser[name] = true;
    setValidInputDataUser(_validDataUser);
  };

  const checkValidate = () => {
    setValidInputDataUser(validInputDataUser);
    let arr = ["email", "phone", "password", "groupId"];
    let check = true;
    for (let i = 0; i <= arr.length - 1; i++) {
      if (!dataUser[arr[i]]) {
        let _validDataUser = _.cloneDeep(validInputDataUser);
        _validDataUser[arr[i]] = false;
        setValidInputDataUser(_validDataUser);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleClickConfirm = async () => {
    let check = isShowModalUser.type === "edit" ? true : checkValidate();
    if (check) {
      let response =
        isShowModalUser.type === "edit"
          ? await updateUser(isShowModalUser.user.id, dataUser)
          : await createNewUser(dataUser);
      if (response && response.data && +response.data.EC === 0) {
        toast.success(response.data.EM);
        refreshListUser();
        setDataUser(defaultDataUser);
        setIsShowModalUser();
      } else {
        toast.error(response.data.EM);
      }
    }
  };
  return (
    <>
      <Modal show={isShowModalUser.show} size="lg" className="modal-user">
        <Modal.Header closeButton onClick={setIsShowModalUser}>
          <Modal.Title>{isShowModalUser.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address (<span className="red">*</span>)
              </label>
              <input
                disabled={isShowModalUser.type === "edit" ? true : false}
                type="email"
                className={
                  validInputDataUser.email
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={dataUser.email}
                onChange={(e) => handleOnchangeInput(e.target.value, "email")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>)
              </label>
              <input
                disabled={isShowModalUser.type === "edit" ? true : false}
                type="text"
                className={
                  validInputDataUser.phone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={dataUser.phone}
                onChange={(e) => handleOnchangeInput(e.target.value, "phone")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={dataUser.username}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "username")
                }
              />
            </div>
            <div
              hidden={isShowModalUser.type === "edit" ? true : false}
              className="col-12 col-sm-6 form-group"
            >
              <label>
                Password (<span className="red">*</span>)
              </label>
              <input
                type="password"
                className={
                  validInputDataUser.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={dataUser.password}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "password")
                }
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={dataUser.address}
                onChange={(e) => handleOnchangeInput(e.target.value, "address")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                className="form-select"
                value={dataUser.sex}
                onChange={(e) => handleOnchangeInput(e.target.value, "sex")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Orther">Orther</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>)
              </label>
              <select
                className={
                  validInputDataUser.groupId
                    ? "form-select"
                    : "form-select is-invalid"
                }
                value={dataUser.groupId}
                onChange={(e) => handleOnchangeInput(e.target.value, "groupId")}
              >
                {listGroup.length > 0 &&
                  listGroup.map((group, index) => {
                    return (
                      <option key={index} value={group.id}>
                        {group.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={setIsShowModalUser}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClickConfirm()}>
            {isShowModalUser.type === "edit" ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUser;
