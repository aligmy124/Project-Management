import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { USERS_URL } from "../../../../Backend/URL";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisV } from "react-icons/fa";
import NoData from "../../../Shared/Components/NoData/NoData";
import Loading from "../../../Shared/Components/Loading/Loading";

// 📌 Helper function for debounce
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default function Users() {
  const token = localStorage.getItem("token");

  const [Load, setLoad] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Arrayofpages, setArrayofpages] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Get Users API
  const getUsers = async (pageSize, pageNo, title) => {
    if (pageNo === 1 && !title) setLoad(true); // Loading بس أول مرة أو بحث فاضي
    try {
      let res = await axios.get(USERS_URL.AllUsers, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          userName: title,
        },
      });

      setArrayofpages(
        Array(res.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsers(res.data.data);
      setCurrentPage(pageNo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  // ✅ Debounced Search
  const debouncedSearch = useCallback(
    debounce((value) => {
      getUsers(200, 1, value);
    }, 500),
    []
  );

  const Searchelement = (input) => {
    const value = input.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  // ✅ Toggle Status
  const ToggleUsersStatus = async (id, isActivated) => {
    try {
      await axios.put(
        USERS_URL.toggle(id),
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setUsers((prevList) =>
        prevList.map((user) =>
          user.id === id ? { ...user, isActivated: !user.isActivated } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(200, 1, "");
  }, []);

  return (
    <div className="projectContainer">
      <div className="title">
        <div className="title-info">
          <h2>Users</h2>
        </div>
      </div>

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
      ) : users.length === 0 ? (
        <NoData />
      ) : (
        <div className="table-container mt-4">
          {/* ✅ Search Box */}
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
                value={search}
                onChange={Searchelement}
              />
            </div>
          </form>

          {/* ✅ Table */}
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
              {users.map((item, index) => (
                <tr key={item.id}>
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

          {/* ✅ Pagination */}
          <div className="pagination-container mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() =>
                  currentPage > 1 && getUsers(200, currentPage - 1, search)
                }
              >
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {Arrayofpages.map((pageNo) => (
                <li
                  key={pageNo}
                  className={`page-item ${
                    pageNo === currentPage ? "active" : ""
                  }`}
                  onClick={() => getUsers(200, pageNo, search)}
                >
                  <a className="page-link" href="#">
                    {pageNo}
                  </a>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === Arrayofpages.length ? "disabled" : ""
                }`}
                onClick={() =>
                  currentPage < Arrayofpages.length &&
                  getUsers(200, currentPage + 1, search)
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
