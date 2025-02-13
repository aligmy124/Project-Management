import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { TASKS_URL } from "../../../../Backend/URL";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Tasks = () => {
  // token
  const token = localStorage.getItem("token");

  // Assigned Tasks
  const [assign, setAssign] = useState([]);

  // Fetch Assigned Tasks
  useEffect(() => {
    const AssignedTask = async () => {
      try {
        let res = await axios.get(TASKS_URL.getallAssignedTask, {
          headers: { Authorization: `${token}` },
        });
        setAssign(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    AssignedTask();
  }, []);

  // Update task status when dropped
  const changeStatus = async (taskId, newStatus) => {
    try {
      // تحديث الحالة محليًا قبل الطلب للسيرفر لتحسين تجربة المستخدم
      setAssign((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // إرسال الطلب للسيرفر
      await axios.put(
        `${TASKS_URL.change}/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `${token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Drag & Drop Event
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      changeStatus(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="container mt-5">
      <div className="title mb-5">
        <h2 style={{ fontSize: "28px", fontWeight: "500", color: "rgba(79, 79, 79, 1)" }}>
          Task Board
        </h2>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row justify-content-center">
          {["ToDo", "InProgress", "Done"].map((status, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="text-white p-3 rounded"
                    style={{ minHeight: "400px", backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                  >
                    <h5 className="text-center mb-3">
                      {status === "ToDo" ? "To Do" : status}
                    </h5>
                    {assign
                      .filter((item) => item.status === status)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="text-dark p-2 mb-2 rounded"
                              style={{
                                backgroundColor: "rgba(239, 155, 40, 1)",
                                transition: "transform 0.2s ease-in-out",
                              }}
                            >
                              {task.taskName}
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </motion.div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
