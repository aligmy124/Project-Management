import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { TASKS_URL } from "../../../../Backend/URL";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Loading from "../../../Shared/Components/Loading/Loading";

const TaskBoard = () => {
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status colors mapping
  const statusColors = {
    ToDo: "rgba(239, 155, 40, 1)",       // Orange
    InProgress: "rgba(66, 133, 244, 1)",  // Blue
    Done: "rgba(52, 168, 83, 1)"          // Green
  };

  // Fetch assigned tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(TASKS_URL.getallAssignedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update task status on drag and drop
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Optimistic UI update
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // API call to update status
      await axios.put(
        `${TASKS_URL.change(taskId)}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating task:", error);
      // Revert UI if API call fails
      fetchTasks();
      setError("Failed to update task status. Please try again.");
    }
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // No change in position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Status changed
    if (source.droppableId !== destination.droppableId) {
      updateTaskStatus(Number(draggableId), destination.droppableId);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              textAlign: "center",
            }}
          >
            <Loading />
          </div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="title mb-5">
        <h2 style={{ fontSize: "28px", fontWeight: "500", color: "rgba(79, 79, 79, 1)" }}>
          Task Board
        </h2>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {["ToDo", "InProgress", "Done"].map((status) => (
            <div key={status} className="col-md-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="p-3 rounded shadow-sm"
                      style={{
                        minHeight: "500px",
                        backgroundColor: "rgba(245, 245, 245, 0.9)"
                      }}
                    >
                      <h5 className="text-center mb-4 p-2 rounded text-white"
                        style={{ backgroundColor: statusColors[status] }}>
                        {status === "ToDo" ? "To Do" : 
                         status === "InProgress" ? "In Progress" : "Done"}
                      </h5>
                      
                      {tasks
                        .filter(task => task.status === status)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={String(task.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-3 mb-3 rounded shadow-sm"
                                style={{
                                  backgroundColor: snapshot.isDragging 
                                    ? "rgba(255, 255, 255, 0.9)" 
                                    : "white",
                                  borderLeft: `4px solid ${statusColors[status]}`,
                                  ...provided.draggableProps.style
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <h6 className="mb-2">{task.title}</h6>
                                <p className="small text-muted mb-1">
                                  {task.description.replace(/<[^>]*>/g, '').substring(0, 80)}
                                  {task.description.length > 80 && '...'}
                                </p>
                                {task.project && (
                                  <span className="badge bg-secondary me-2">
                                    {task.project.title}
                                  </span>
                                )}
                                {task.employee && (
                                  <span className="badge bg-info">
                                    {task.employee.userName}
                                  </span>
                                )}
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;