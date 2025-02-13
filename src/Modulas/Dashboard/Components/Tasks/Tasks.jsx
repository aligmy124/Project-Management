import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TASKS_URL } from "../../../../Backend/URL";
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
  // Register
  const {
    register,
    handleSubmit,
    formState: { errors },
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
  const handleupdateShow = (id) => {
    setId(id);
    setShowupdate(true);
  };
  // list
  const [projectList, setprojectList] = useState([]);
  // Search State
  const [Arrayofpages, setArrayofpages] = useState([]);
  const [search, setSearch] = useState();

  // project api

  // const getProjects = async (title, pageSize, pageNo) => {
  //   setLoad(true);
  //   try {
  //     let res = await axios.get(Projects_URL.getAll, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: { title: title, pageSize: pageSize, pageNumber: pageNo },
  //     });
  //     setArrayofpages(
  //       Array(res.data.totalNumberOfPages)
  //         .fill()
  //         .map((_, i) => i + 1)
  //     );
  //     console.log(res.data.data);
  //     setprojectList(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     setLoad(false);
  //   } finally {
  //     setLoad(false);
  //   }
  // };

  // Project Api without Load
  const getProjects = async (title, pageSize, pageNo) => {
    if(LoginData?.userGroup==="Manager"){
          try {
      let res = await axios.get(TASKS_URL.manager, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { title, pageSize, pageNumber: pageNo },
      });

      setArrayofpages(
        Array(res.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );

      console.log(res);
      setprojectList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
    }
    else{
      navigate("/dashboard/task_board")
    }

  };

  // SearchElement

  const Searchelement = (input) => {
    setSearch(input.target.value);
    getProjects(input.target.value, 5, 1);
    setLoad(false);
  };

  // delete item
  // const DeleteItem = async () => {
  //   try {
  //     let res = await axios.delete(Projects_URL.delete(id), {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     getProjects();
  //     toast.success("Delete Successfully");
  //     handleClose();
  //   } catch (error) {
  //     toast.error("Delete Failed!");
  //     handleClose();
  //   }
  // };

  // Delete without Load
  const DeleteItem = async () => {
    try {
      await axios.delete(TASKS_URL.delete(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setprojectList((prevList) => prevList.filter((item) => item.id !== id));

      toast.success("Delete Successfully");
      handleClose();
    } catch (error) {
      toast.error("Delete Failed!");
      handleClose();
    }
  };

  // Update Item
  // const Updateitem = async (data) => {
  //   try {
  //     let res = await axios.put(Projects_URL.update(id), data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     getProjects();
  //     toast.success("Update Successfully");
  //     handleupdateClose();
  //   } catch (error) {
  //     toast.error("Update Failed!");
  //     handleupdateClose();
  //   }
  // };

  // update without Load
    // حالة لتخزين القيم المختارة
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
  const Updateitem = async (data) => {
    try {
      let res = await axios.put(TASKS_URL.update(id), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setprojectList((prevList) =>
        prevList.map((item) => (item.id === id ? { ...item, ...data } : item))
      );

      toast.success("Update Successfully");
      handleupdateClose();
    } catch (error) {
      toast.error("Update Failed!");
      handleupdateClose();
    }
  };

  useEffect(() => {
    getProjects();
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
      {/* Model Delete */}
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
      {/* Model Update */}
      <Modal show={showUpdate} onHide={handleupdateClose} centered>
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold text-dark">Update Task</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="card shadow-lg p-4 w-100 m-auto rounded-4 border-0">
      <form onSubmit={handleSubmit(Updateitem)}>
        {/* حقل العنوان */}
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label ">
            Title
          </label>
          <input
            type="text"
            className="form-control border-0 shadow-sm p-3 rounded-3"
            placeholder="Enter task title"
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <span className="text-danger">{errors.title.message}</span>}
        </div>

        {/* حقل الوصف */}
        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label ">
            Description
          </label>
          <textarea
            className="form-control border-0 shadow-sm p-3 rounded-3"
            placeholder="Enter task description"
            id="description"
            rows="3"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <span className="text-danger">{errors.description.message}</span>}
        </div>

        <div className="row">
          {/* اختيار المستخدم */}
          <div className="col-md-6 mb-3">
            <label htmlFor="employeeId" className="form-label ">
              Assigned User
            </label>
            <select
              className="form-select border-0 shadow-sm p-3 rounded-3"
              {...register("employeeId", { required: "User is required" })}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a User</option>
              {projectList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.employee.userName}
                </option>
              ))}
            </select>
            {errors.employeeId && <span className="text-danger">{errors.employeeId.message}</span>}
          </div>

          {/* اختيار المشروع */}
          <div className="col-md-6 mb-3">
            <label htmlFor="projectId" className="form-label ">
              Project
            </label>
            <select
              className="form-select border-0 shadow-sm p-3 rounded-3"
              {...register("projectId", { required: "Project is required" })}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select a Project</option>
              {projectList.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project.title}
                </option>
              ))}
            </select>
            {errors.projectId && <span className="text-danger">{errors.projectId.message}</span>}
          </div>
        </div>

        {/* الأزرار */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/tasks")}
            className="btn btn-outline-secondary px-4 py-2 rounded-3 "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn text-white px-4 py-2 rounded-3 "
            style={{
              backgroundColor: "#EF9B28",
              border: "none",
              transition: "0.3s ease-in-out",
            }}
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  </Modal.Body>
</Modal>

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
              {projectList.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.title}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor:"rgba(239, 155, 40, 0.64)",
                        padding: "10px 25px",
                        borderRadius: "16px",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td>{item?.employee.userName}</td>
                  <td>{item?.project.description}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        as="span"
                        className="dropdown-toggle-custom"
                      >
                        <FaEllipsisV style={{ cursor: "pointer" }} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/view">
                          <i className="fa-regular fa-eye text-success "></i>{" "}
                          View
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/edit"
                          onClick={() => handleupdateShow(item.id)}
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
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {Arrayofpages.map((pageNo) => (
                <li
                  key={pageNo}
                  className="page-item"
                  onClick={() => getProjects(search, 5, pageNo)}
                >
                  <a className="page-link" href="#">
                    {pageNo}
                  </a>
                </li>
              ))}
              <li className="page-item">
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
