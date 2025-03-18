import React, { useState } from "react";
import TopAppBar from "../../components/topBar/TopBar";
import UserList from "../../components/userList/userList";
import SortModal from "../../components/sortModal/sortModal";
import useDebounce from "../../components/useDebounce/useDebounce";

const Main: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortType, setSortType] = useState<"alphabet" | "birthday">("alphabet");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (dept: string) => {
    setDepartment(dept);
  };

  const handleSort = () => {
    setIsSortModalOpen(true);
  };

  const handleSortChange = (type: "alphabet" | "birthday") => {
    setSortType(type);
    setIsSortModalOpen(false);
  };

  return (
    <div>
      <TopAppBar
        onSearch={handleSearch}
        onTabChange={handleTabChange}
        onSort={handleSort}
      />
      <UserList
        searchQuery={debouncedSearchQuery}
        department={department}
        sortType={sortType}
      />
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default Main;
