import { useState, useEffect } from "react";
import styles from "./AddBtn.module.css";
import Model from "../PopupModel/Model";

const AddBtn = ({ groups, updateGroups, selectedGroup, setSelectedGroup }) => {
  const [showModel, setShowModel] = useState(false);

  const closeModel = () => setShowModel(false);

  const handleUpdateGroup = (updatedGroups) => {
    updateGroups(updatedGroups);
  };

  const getInitials = (groupName) => {
    const words = groupName.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup((prev) => (prev?.id === group.id ? null : group));
  };

  return (
    <div>
      <div className={styles.button}>
        <a onClick={() => setShowModel(true)}>+</a>
        {showModel && (
          <Model
            closeModel={closeModel}
            createdGroups={groups}
            updateGroup={handleUpdateGroup}
          />
        )}
      </div>
      <div>
        <ul className={styles.groupList}>
          {groups.map((group) => (
            <li
              key={group.id}
              style={{ color: "black", cursor: "pointer", fontWeight: "500" }}
              onClick={() => handleSelectGroup(group)}
              className={selectedGroup?.id === group.id ? styles.selected : ""}
            >
              <span
                className={styles.outer}
                style={{ backgroundColor: group.color, color: "white" }}
              >
                <span className={styles.inner}>{getInitials(group.text)}</span>
              </span>
              {group.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddBtn;
