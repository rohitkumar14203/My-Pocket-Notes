import { useState } from "react";
import styles from "./AddBtn.module.css";
import Model from "../PopupModel/Model";
import PropTypes from "prop-types";

const AddBtn = ({ groups, updateGroups }) => {
  const [showModel, setShowModel] = useState(false);

  const closeModel = () => setShowModel(false);

  const handleUpdateGroup = (updatedGroups) => {
    updateGroups(updatedGroups);
  };

  return (
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
  );
};

AddBtn.propTypes = {
  groups: PropTypes.array.isRequired,
  updateGroups: PropTypes.func.isRequired,
};

export default AddBtn;
