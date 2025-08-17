import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Projects_URL } from "../../../../Backend/URL";
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
export default function ProjectsAdmin() {
  // Context
  const { LoginData } = useContext(AuthContext);
  // navigite
  const navigate = useNavigate();
  // Register
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
  const handleupdateShow = (item) => {
     reset({
      title: item.title,
      description: item.description,
    });
    setId(item.id);
    setShowupdate(true);
  };
  // list
  const [projectList, setprojectList] = useState([]);
  // Search State
  const [Arrayofpages, setArrayofpages] = useState([]);
  const [search, setSearch] = useState();
  // Project Api without Load
  const getProjects = async (title, pageSize, pageNo) => {
    console.log("Params:", { title, pageSize, pageNumber: pageNo });

    try {
      let res = await axios.get(Projects_URL.getAll, {
        headers: { Authorization: `Bearer ${token}` },
        params: { title, pageSize: pageSize, pageNumber: pageNo },
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
  };

  // SearchElement

  const Searchelement = (input) => {
    setSearch(input.target.value);
    getProjects(input.target.value, 5, 1);
    setLoad(false);
  };

  // Delete without Load
  const DeleteItem = async () => {
    try {
      await axios.delete(Projects_URL.delete(id), {
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

  // update without Load
  const Updateitem = async (data) => {
    try {
      let res = await axios.put(Projects_URL.update(id), data, {
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
    if (LoginData?.userGroup) {
      getProjects("", 5, 1);
    }
  }, [LoginData]);

  return (
<div className="projectContainer container-fluid p-3">
  {/* Title & Add Project */}
  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
    <div className="title-info">
      <h2 className="fs-4 fw-semibold mb-0">Projects</h2>
    </div>
    {LoginData?.userGroup === "Manager" && (
      <button
        className="btn text-white fw-medium px-3 py-2 rounded-3"
        style={{backgroundColor:"rgba(239, 155, 40, 1)"}}
        onClick={() => navigate("/dashboard/create_project")}
      >
        <i className="fa-regular fa-plus me-2"></i> Add New Project
      </button>
    )}
  </div>

  {/* Delete Modal */}
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <ModeDelete />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleClose}>
        Close
      </Button>
      <Button variant="outline-danger" onClick={DeleteItem}>
        Delete Item
      </Button>
    </Modal.Footer>
  </Modal>

  {/* Update Modal */}
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
              {...register("title", { required: "title is required" })}
            />
            {errors.title && <p className="text-danger">{errors.title.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="textArea">Description</label>
            <textarea
              className="form-control"
              id="textArea"
              rows="3"
              placeholder="description"
              {...register("description", { required: "description is required" })}
            ></textarea>
            {errors.description && <p className="text-danger">{errors.description.message}</p>}
          </div>
          <Modal.Footer>
            <Button variant="success" onClick={handleupdateClose}>
              Close
            </Button>
            <Button variant="outline-success" type="submit">
              Update Item
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </Modal.Body>
  </Modal>

  {/* Search Form */}
  <form className="col-12 col-md-8 col-lg-6 mb-4">
    <div className="input-group">
      <span className="input-group-text" style={{ cursor: "pointer" }}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search by title"
        aria-label="title"
        onChange={Searchelement}
      />
    </div>
  </form>

  {/* Table */}
  {Load ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <Loading />
    </div>
  ) : projectList.length === 0 ? (
    <NoData />
  ) : (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-bordered text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Num Tasks</th>
            <th scope="col">Description</th>
            {LoginData.userGroup === "Manager" && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {projectList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item?.title}</td>
              <td>{item.task.length}</td>
              <td className="text-truncate" style={{ maxWidth: "200px" }}>
                {item.description}
              </td>
              {LoginData.userGroup === "Manager" && (
                <td>
                  <Dropdown>
                    <Dropdown.Toggle as="span" className="dropdown-toggle-custom">
                      <FaEllipsisV style={{ cursor: "pointer" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleupdateShow(item)}>
                        <i className="fa-regular fa-pen-to-square text-success me-2"></i>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShow(item.id)}>
                        <i className="fa-solid fa-trash text-success me-2"></i>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Pagination */}
  <div className="d-flex justify-content-center mt-3">
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

  );
}
