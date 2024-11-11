import React from "react";
import style from "./GroupSection.module.css";
import AddBtn from "../AddBtn/AddBtn";

const GroupSection = ({
  groups,
  updateGroups,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <div className={style.left}>
      <h1>Pocket Notes</h1>
      <AddBtn
        groups={groups}
        updateGroups={updateGroups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
    </div>
  );
};

export default GroupSection;
