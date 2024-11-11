import { useState, useEffect } from "react";
import GroupSection from "./Components/HomeCmp/GroupSection";
import NotesSection from "./Components/HomeCmp/NotesSection";
import NotesDisplay from "./Components/NotesDisplay/NotesDisplay";

const Home = () => {
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("createdGroups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(groups));
  }, [groups]);

  const updateGroups = (newGroups) => {
    setGroups(newGroups);
  };

  return (
    <div className="container">
      <GroupSection
        groups={groups}
        updateGroups={updateGroups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      {selectedGroup ? (
        <NotesDisplay group={selectedGroup} />
      ) : (
        <NotesSection groups={groups} />
      )}
    </div>
  );
};

export default Home;
