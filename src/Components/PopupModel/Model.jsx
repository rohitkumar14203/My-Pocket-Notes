import React, { useState } from "react";
import { colors } from "../utils/Data";
import styles from "./Mod.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Model = ({ closeModel, createdGroups = [], updateGroup }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [groupName, setGroupName] = useState("");

  const handleCol = (index) => {
    setSelectedColor(colors[index]);
    setSelectedColorIndex(index);
  };

  const handelCreate = () => {
    if (!groupName || !selectedColor) {
      showError("Please enter a group name and select a color!");
      return;
    }

    const isDuplicate = createdGroups.some((group) => group.text === groupName);
    if (isDuplicate) {
      showError("Group name already exists!");
      return;
    }

    // Create new group object
    const newGroup = {
      id: createdGroups.length,
      text: groupName,
      color: selectedColor,
      notes: [],
    };

    const saveGroupsToLocalStorage = (groups) => {
      localStorage.setItem("groups", JSON.stringify(groups));
    };

    const updatedGroups = [...createdGroups, newGroup];
    updateGroup(updatedGroups);
    saveGroupsToLocalStorage(updatedGroups);
    resetModal();
    showSuccess("Group created successfully!");
  };

  const resetModal = () => {
    setGroupName("");
    setSelectedColor(null);
    setSelectedColorIndex(null);
    closeModel();
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showSuccess = (message) => {
    toast.success(message);
  };

  return (
    <>
      <div className={styles.modelWrapper} onClick={closeModel}></div>
      <div className={styles.modelContainer}>
        <h2>Create New Group</h2>
        <div className={styles.input}>
          <label htmlFor="group">
            Group Name
            <input
              type="text"
              name="group"
              placeholder="Enter group name"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </label>
        </div>
        <div className={styles.colorSection}>
          <h2>Choose Color</h2>
          <div className={styles.listColor}>
            {colors.map((color, index) => (
              <div key={index} className={styles.color}>
                <p
                  style={{
                    backgroundColor: `${color}`,
                    border:
                      selectedColorIndex === index ? "3px solid grey" : "none",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCol(index)}
                ></p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handelCreate}>Create</button>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </>
  );
};

export default Model;
