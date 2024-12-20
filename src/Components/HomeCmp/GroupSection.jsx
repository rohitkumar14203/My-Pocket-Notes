import PropTypes from "prop-types";
import style from "./GroupSection.module.css";
import AddBtn from "../AddBtn/AddBtn";

const GroupSection = ({
  groups,
  updateGroups,
  selectedGroup,
  setSelectedGroup,
}) => {
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
    <div className={style.left}>
      <h1>Pocket Notes</h1>
      <div className={style.groupList}>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              onClick={() => handleSelectGroup(group)}
              className={selectedGroup?.id === group.id ? style.selected : ""}
            >
              <span
                className={style.groupIcon}
                style={{ backgroundColor: group.color }}
              >
                {getInitials(group.text)}
              </span>
              <span className={style.groupName}>{group.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <AddBtn groups={groups} updateGroups={updateGroups} />
    </div>
  );
};

GroupSection.propTypes = {
  groups: PropTypes.array.isRequired,
  updateGroups: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  setSelectedGroup: PropTypes.func.isRequired,
};

export default GroupSection;
