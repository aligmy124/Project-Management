import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Projects_URL, TASKS_URL, USERS_URL } from "../../../../Backend/URL";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisV } from "react-icons/fa"; // أيقونة النقاط الثلاث
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModeDelete from "../../../Shared/Components/ModelDelete/ModeDelete";
import { useForm } from "react-hook-form";
import NoData from "../../../Shared/Components/NoData/NoData";
import Loading from "../../../Shared/Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";
export default function Projects() {
  // context
  const { LoginData } = useContext(AuthContext);
  // navigite
  const navigate = useNavigate();
  // page
  const [currentPage, setCurrentPage] = useState(1);
  // Register
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // token
  const token = localStorage.getItem("token");
  // Id
  const [id, setId] = useState();
  // Loading
  const [Load, setLoad] = useState(true);
  // Model Delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };
  // Model Update
  const [showUpdate, setShowupdate] = useState(false);
  const handleupdateClose = () => setShowupdate(false);
  const handleupdateShow = (task) => {
    setId(task.id);
    reset({
      title: task.title,
      description: task.description,
      employeeId: task.employee?.id, // أو أي مسار يعيد الـ id
    });
    setShowupdate(true);
  };

  // list
  // Search State
  const [Arrayofpages, setArrayofpages] = useState([]);
  const [search, setSearch] = useState();

  // Project Api without Load
  const [tasks, setTasks] = useState([]);
  const getTasks = async (title, pageSize, pageNo) => {
    if (LoginData?.userGroup === "Manager") {
      try {
        let res = await axios.get(TASKS_URL.manager, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { pageNumber: pageNo, pageSize: pageSize, title: title },
        });

        setArrayofpages(
          Array(res.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        console.log(res);
        setTasks(res.data.data);
        setCurrentPage(pageNo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    } else {
      navigate("/dashboard/task_board");
    }
  };

  const statusColors = {
    ToDo: "rgba(239, 155, 40, 1)", // Orange
    InProgress: "rgba(66, 133, 244, 1)", // Blue
    Done: "rgba(52, 168, 83, 1)", // Green
  };
  // projects
  const [projectList, setprojectList] = useState([]);
  const getProjects = async () => {
    try {
      let res = await axios.get(Projects_URL.getAll, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setprojectList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  // users
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    setLoad(true);
    try {
      let res = await axios.get(USERS_URL.AllUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  // SearchElement

  const Searchelement = (input) => {
    setSearch(input.target.value);
    getTasks(input.target.value, 5, 1);
    setLoad(false);
  };
  // Delete without Load
  const DeleteItem = async () => {
    try {
      await axios.delete(TASKS_URL.delete(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks("", 5, 1);
      toast.success("Delete Successfully");
      handleClose();
    } catch (error) {
      toast.error("Delete Failed!");
      handleClose();
    }
  };
  // update without Load
  // حالة لتخزين القيم المختارة

  const Updateitem = async (data) => {
    try {
      let res = await axios.put(TASKS_URL.update(id), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks("", 5, 1);
      toast.success("Update Successfully");
      handleupdateClose();
    } catch (error) {
      toast.error("Update Failed!");
      handleupdateClose();
    }
  };

  useEffect(() => {
    getTasks("", 5, 1);
    getProjects();
    getUsers();
  }, []);
  return (
    <div className="projectContainer">
      <div className="title">
        <div className="title-info">
          <h2>Tasks</h2>
        </div>
        <button onClick={() => navigate("/dashboard/create_task")}>
          <i className="fa-regular fa-plus"></i> Add New Task
        </button>
      </div>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ModeDelete />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="border border-danger text-danger"
            onClick={DeleteItem}
          >
            Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update */}
      <Modal show={showUpdate} onHide={handleupdateClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="update_item">
            <form onSubmit={handleSubmit(Updateitem)}>
              <div className="form-group mb-4">
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  placeholder="title"
                  {...register("title", {
                    required: "title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="textArea">Description</label>
                <textarea
                  className="form-control"
                  id="textArea"
                  rows="3"
                  placeholder="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="employeeId">Assign to Employee</label>
                <select
                  className="form-control"
                  id="employeeId"
                  {...register("employeeId", {
                    required: "Employee is required",
                  })}
                >
                  <option value="">-- Select Employee --</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <p className="text-danger">{errors.employeeId.message}</p>
                )}
              </div>

              <Modal.Footer>
                <Button variant="success" onClick={handleupdateClose}>
                  Close
                </Button>
                <Button
                  variant="border border-danger text-danger"
                  type="submit"
                >
                  Update Item
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <form className="w-50 mb-4">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ height: "32px", cursor: "pointer" }}
            >
              <i className="fa-solid fa-magnifying-glass "></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            aria-label="title"
            aria-describedby="basic-addon1"
            style={{ height: "32px", borderRadius: "8px" }}
            onChange={Searchelement}
          />
        </div>
      </form>
      {/* Table */}
      {Load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <Loading />
        </div>
      ) : projectList.length == 0 ? (
        <NoData />
      ) : (
        <div className="table-container mt-4">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">userName</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.title}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: statusColors[item?.status] || "gray", // اللون حسب الحالة
                        padding: "10px 25px",
                        borderRadius: "16px",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {item?.status}
                    </button>
                  </td>

                  <td>{item?.project?.manager?.userName}</td>
                  <td>{item?.project?.description}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        as="span"
                        className="dropdown-toggle-custom"
                      >
                        <FaEllipsisV style={{ cursor: "pointer" }} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/edit"
                          onClick={() => handleupdateShow(item)}
                        >
                          <i className="fa-regular fa-pen-to-square text-success"></i>{" "}
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/delete"
                          onClick={() => handleShow(item.id)}
                        >
                          <i className="fa-solid fa-trash text-success"></i>{" "}
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container mt-3">
            <ul className="pagination">
              {/* Previous */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() =>
                  currentPage > 1 && getTasks(search, 5, currentPage - 1)
                }
              >
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {/* Page Numbers */}
              {Arrayofpages.map((pageNo) => (
                <li
                  key={pageNo}
                  className={`page-item ${
                    pageNo === currentPage ? "active" : ""
                  }`}
                  onClick={() => getTasks(search, 5, pageNo)}
                >
                  <a className="page-link" href="#">
                    {pageNo}
                  </a>
                </li>
              ))}

              {/* Next */}
              <li
                className={`page-item ${
                  currentPage === Arrayofpages.length ? "disabled" : ""
                }`}
                onClick={() =>
                  currentPage < Arrayofpages.length &&
                  getTasks(search, 5, currentPage + 1)
                }
              >
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
