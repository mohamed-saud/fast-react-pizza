import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const navegate = useNavigate();
  function handelSubmet(e) {
    e.preventDefault();
    if (!searchQuery) return;
    navegate(`/order/${searchQuery}`);
    setSearchQuery("");

    console.log(searchQuery);
  }
  return (
    <form onSubmit={handelSubmet}>
      <input
        type="text"
        placeholder="Search order # "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
