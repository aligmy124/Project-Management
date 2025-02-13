import React, { useEffect, useState } from "react";
import axios from "axios";
import { USERS_URL } from "../../../../Backend/URL";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisV } from "react-icons/fa"; // أيقونة النقاط الثلاث
import { useForm } from "react-hook-form";
import NoData from "../../../Shared/Components/NoData/NoData";
import Loading from "../../../Shared/Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Users() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 150; // عدد العناصر في كل صفحة

  // usenavigate
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
  // list
  const [projectList, setprojectList] = useState([]);
  // Search State
  const [Arrayofpages, setArrayofpages] = useState([]);
  const [search, setSearch] = useState();
  // project api
  const getProjects = async (userName = "", pageNo = 1) => {
    setLoad(true);
    try {
      let res = await axios.get(USERS_URL.AllUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userName, pageSize, pageNumber: pageNo },
      });

      setTotalPages(res.data.totalNumberOfPages); // تحديث عدد الصفحات
      setprojectList(res.data.data);
      setCurrentPage(pageNo); // تحديث الصفحة الحالية
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  // SearchElement
  const Searchelement = (input) => {
    setSearch(input.target.value);
    getProjects(input.target.value, 200, 1);
    setLoad(false);
  };

  // Toggle Status
  const ToggleUsersStatus = async (id, isActivated) => {
    try {
      let response = await axios.put(
        USERS_URL.toggle(id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setprojectList((prevList) =>
        prevList.map((user) =>
          user.id === id ? { ...user, isActivated: !user.isActivated } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="projectContainer">
      <div className="title">
        <div className="title-info">
          <h2>Users</h2>
        </div>
        {/* <button onClick={() => navigate("/dashboard/create_users")}>
          <i className="fa-regular fa-plus"></i> Add New User
        </button> */}
      </div>
      {/* Table */}
      {Load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            textAlign: "center",
          }}
        >
          <Loading />
        </div>
      ) : projectList.length === 0 ? (
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
                placeholder="userName"
                aria-label="userName"
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
                <th scope="col">Username</th>
                <th scope="col">Status</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {projectList.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.userName}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: item.isActivated
                          ? "rgba(0, 146, 71, 1)"
                          : "rgba(146, 46, 37, 0.7)",
                        padding: "10px 25px",
                        borderRadius: "16px",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        ToggleUsersStatus(item.id, item.isActivated)
                      }
                    >
                      {item.isActivated ? "Active" : "NotActive"}
                    </button>
                  </td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
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
                          onClick={() =>
                            ToggleUsersStatus(item.id, item.isActivated)
                          }
                        >
                          {item.isActivated ? (
                            <i className="fa-solid fa-ban text-success"></i>
                          ) : (
                            <i className="fa-regular fa-eye text-success"></i>
                          )}{" "}
                          {item.isActivated ? "Block" : "Unblock"}
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
              {/* زر السابق */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() =>
                  currentPage > 1 && getProjects(search, currentPage - 1)
                }
              >
                <a className="page-link" href="#">
                  «
                </a>
              </li>

              {/* أزرار الصفحات */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNo) => (
                  <li
                    key={pageNo}
                    className={`page-item ${
                      currentPage === pageNo ? "active" : ""
                    }`}
                    onClick={() => getProjects(search, pageNo)}
                  >
                    <a className="page-link" href="#">
                      {pageNo}
                    </a>
                  </li>
                )
              )}

              {/* زر التالي */}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() =>
                  currentPage < totalPages &&
                  getProjects(search, currentPage + 1)
                }
              >
                <a className="page-link" href="#">
                  »
                </a>
              </li>
            </ul>
            <p className="text-center mt-2">
              Showing <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong> pages
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
