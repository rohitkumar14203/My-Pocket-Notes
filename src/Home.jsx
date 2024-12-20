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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(groups));
  }, [groups]);

  const updateGroups = (newGroups) => {
    setGroups(newGroups);
  };

  return (
    <div className="container">
      {isMobile && selectedGroup ? (
        <NotesDisplay
          group={selectedGroup}
          onBack={() => setSelectedGroup(null)}
        />
      ) : (
        <GroupSection
          groups={groups}
          updateGroups={updateGroups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      )}
      {!isMobile && selectedGroup && <NotesDisplay group={selectedGroup} />}
      {!isMobile && !selectedGroup && <NotesSection groups={groups} />}
    </div>
  );
};

export default Home;
