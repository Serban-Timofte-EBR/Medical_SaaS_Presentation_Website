import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const categories = [
  "All",
  "Oncology Research",
  "Patient Care",
  "AI in Medicine",
  "Medical Breakthroughs",
];

interface FiltersProps {
  selectedCategory: string;
  searchTerm: string;
  onFilterChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  searchTerm,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 4,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <TextField
        select
        label="Category"
        value={selectedCategory}
        onChange={(e) => onFilterChange(e.target.value)}
        sx={{ width: "200px" }}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Search Articles"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: "250px" }}
      />
    </Box>
  );
};

export default Filters;
