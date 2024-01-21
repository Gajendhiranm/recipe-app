import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import SizesChips from "../Chip/Chip";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState(""); //storing the search value from the input
  const exampleTags = ["Chicken", "Fish", "Egg"];

  // Call the parent component's onSearch callback to store the search value
  const handleSearch = () => {
    console.log(searchTerm);
    onSearch(searchTerm);
  };

  // Call onSearch callback whenever the input changes
  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };


  return (
    <div className="search-bar">
      <div component="form" className="form-input">
        <InputBase
          sx={{ ml: 1, flex: 1, width: 400 }}
          placeholder="Search Recipe"
          value={searchTerm}
          onChange={handleChange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="example-info">
        <p>Example : </p>
        {exampleTags.map((tag, index) => (
          <SizesChips key={index} name={tag}/>
        ))}
      </div>
    </div>
  );
}
