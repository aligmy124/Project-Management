import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Projects_URL } from "../../../../Backend/URL";
import NoData from "../../../Shared/Components/NoData/NoData";
import Loading from "../../../Shared/Components/Loading/Loading";

export default function ProjectsEmployee() {
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

  // Project Api without Load
  const getProjects = async (pageSize, pageNo,title) => {
    try {
      let res = await axios.get(Projects_URL.getEmployee, {
        headers: { Authorization: `Bearer ${token}` },
        params: {pageSize:pageSize,pageNumber:pageNo,title:title},
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
    getProjects( 5, 1,input.target.value);
    setLoad(false);
  };

  useEffect(() => {
    getProjects(5, 1,"");
  }, []);

  return (
<div className="projectContainer container-fluid p-3">
  <div className="title mb-4">
    <div className="title-info">
      <h2 className="fs-4 fw-semibold">Projects</h2>
    </div>
  </div>

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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <Loading />
    </div>
  ) : projectList.length === 0 ? (
    <NoData />
  ) : (
    <div className="table-container mt-4 table-responsive">
      <table className="table table-striped table-bordered text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Num Tasks</th>
            <th scope="col">Modification Date</th>
            <th scope="col">Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((item, index) => (
            <tr key={index}>
              <td>{item?.title}</td>
              <td className="text-truncate" style={{ maxWidth: "200px" }}>
                {item?.description}
              </td>
              <td>{item?.task.length}</td>
              <td>{new Date(item?.modificationDate).toLocaleDateString()}</td>
              <td>
                {item?.task.length > 0
                  ? new Date(item?.task[0].creationDate).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container mt-3 d-flex justify-content-center">
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
              onClick={() => getProjects(5, pageNo, search)}
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
