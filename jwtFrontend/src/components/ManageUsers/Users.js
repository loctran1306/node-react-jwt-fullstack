import React, { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../services/userService";

import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModalDel, setIsShowModalDel] = useState(false);
  const [isShowModalUser, setIsShowModalUser] = useState({
    show: false,
    title: "",
    user: {},
    type: "",
  });

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchUsers = async () => {
    const response = await getAllUser(currentPage, currentLimit);
    if (response && response.data && +response.data.EC === 0) {
      setListUser(response.data.DT.users);
      setTotalPage(response.data.DT.totalPage);
    }
  };

  //DELETE USER
  const [userDelete, setUserDelete] = useState({});
  const handleDeleteUser = async (user) => {
    setIsShowModalDel(true);
    setUserDelete(user);
  };
  const onClickYesModalDelete = async (user) => {
    const response = await deleteUser(user.id);
    if (response && +response.data.EC === 0) {
      toast.success(response.data.EM);
      // setCurrentPage(1);
      fetchUsers();
    } else {
      toast.error(response.data.EM);
    }
    setIsShowModalDel(false);
  };

  //PANIGATION
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title">
              <h3>Table users</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success">
                <div
                  onClick={() => {
                    fetchUsers();
                  }}
                >
                  Refresh
                </div>
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  setIsShowModalUser({
                    show: true,
                    title: "Create new user",
                    user: {},
                    type: "create",
                  })
                }
              >
                Add new user
              </button>
            </div>
            <div className="body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Group</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser && listUser.length > 0 ? (
                    <>
                      {listUser.map((user, index) => {
                        return (
                          <tr key={`row-${index}`}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.phone}</td>
                            <td>{user.Group ? user.Group.name : ""}</td>
                            <td>
                              <button
                                className="btn btn-warning mx-3"
                                onClick={() =>
                                  setIsShowModalUser({
                                    show: true,
                                    title: "Edit User",
                                    user: user,
                                    type: "edit",
                                  })
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(user)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td>User not found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
      {isShowModalDel && (
        <ModalDelete
          isShowModalDel={isShowModalDel}
          setIsShowModalDel={() => {
            setIsShowModalDel(false);
            setUserDelete({});
          }}
          userDelete={userDelete}
          onClickYesModalDelete={onClickYesModalDelete}
        />
      )}

      {isShowModalUser.show && (
        <ModalUser
          isShowModalUser={isShowModalUser}
          setIsShowModalUser={() =>
            setIsShowModalUser({ show: false, title: "", user: {}, type: "" })
          }
          refreshListUser={() => fetchUsers()}
        />
      )}
    </>
  );
};
export default Users;
