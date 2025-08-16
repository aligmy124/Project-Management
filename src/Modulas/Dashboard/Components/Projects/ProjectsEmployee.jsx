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
    <div className="projectContainer">
      <div className="title">
        <div className="title-info">
          <h2>Projects</h2>
        </div>
      </div>
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
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Num Tasks</th>
                <th scope="col">ModificationDate</th>
                <th scope="col">CreationDate</th>
              </tr>
            </thead>
            <tbody>
              {projectList.map((item, index) => (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{item?.description}</td>
                  <td>{item?.task.length}</td>
                  <td>{new Date(item?.modificationDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(item?.task[0].creationDate).toLocaleDateString()}
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
                  onClick={() => getProjects(5,pageNo,search)}
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
