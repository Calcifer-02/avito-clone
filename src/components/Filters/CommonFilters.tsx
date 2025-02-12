import React from "react";
import { Input } from "antd";

const CommonFilters: React.FC<{
   searchQuery: string;
   setSearchQuery: (value: string) => void;
}> = ({ searchQuery, setSearchQuery }) => {
   return (
      <Input
         placeholder="Поиск..."
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         style={{ marginBottom: "20px", maxWidth: "300px" }}
      />
   );
};

export default CommonFilters;
