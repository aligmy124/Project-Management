import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

import { Card, Row, Col, Container } from "react-bootstrap";
import Header from "../../../Shared/Components/Header/Header";
import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";
import { Projects_URL, TASKS_URL, USERS_URL } from "../../../../Backend/URL";

import axios from "axios";
export default function Home() {
  // context
  const { LoginData } = React.useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [project, setProject] = useState([]);
  const getProjects = async () => {
    let Url;
        if (LoginData?.userGroup === "Manager") {
          Url = Projects_URL.getAll;
        } else {
          Url = Projects_URL.getEmployee;
        }
    try {
      let res = await axios.get(Url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res, "pro");
      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      let res = await axios.get(USERS_URL.count, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [task, setTask] = useState([]);
  const getTasks = async () => {
    try {
      let res = await axios.get(TASKS_URL.manager, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res, "task");
      setTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [fetchTask, setFetchTask] = useState([]);
  const fetchTasks = async () => {
      try {
        const res = await axios.get(TASKS_URL.getallAssignedTask, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res,"employee");
        setFetchTask(res.data)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } 
    };
    const taskCount = LoginData.userGroup === "Manager"
  ? task?.totalNumberOfRecords || task?.length || 0
  : fetchTask.totalNumberOfRecords || 0;
  useEffect(() => {
    getTasks();
    getUsers();
    getProjects();
    fetchTasks()
  }, []);
  return (
    <>
      <Header />
      <Container className="home mt-5">
<Row className="justify-content-center my-4">
  {/* الكارد الأول: Projects & Tasks */}
  <Col xs={12} md={6} lg={5}>
    <Card className="p-3 shadow-sm h-100">
      <h5 className="fw-bold mb-3">Projects & Tasks Overview</h5>
      <div style={{ width: "100%", height: "300px" }}>
        <Bar
          data={{
            labels: ["Projects", "Tasks"],
            datasets: [
              {
                label: "Count",
                data: [
                  project?.totalNumberOfRecords || 0,
                  taskCount
                ],
                backgroundColor: ["#3C81F5", "#F69E0A"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </Card>
  </Col>

  {/* الكارد الثاني: Users */}
  {LoginData.userGroup === "Manager" && (
    <Col xs={12} md={6} lg={5}>
      <Card className="p-3 shadow-sm h-100">
        <h5 className="fw-bold mb-3">Users Overview</h5>
        <div style={{ width: "100%", height: "300px" }}>
          <Pie
            data={{
              labels: ["Active", "Inactive"],
              datasets: [
                {
                  data: [
                    users?.activatedEmployeeCount || 0,
                    users?.deactivatedEmployeeCount || 0,
                  ],
                  backgroundColor: ["#3C81F5", "#F69E0A"],
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </Card>
    </Col>
  )}
</Row>

      </Container>
    </>
  );
}
