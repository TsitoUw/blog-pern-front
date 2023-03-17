import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Search from "@mui/icons-material/Search";

const NavBar = () => {
  const user = useContext(UserContext);
  return (
    <div className="navbar | p-2 bg-slate-900 flex justify-between w-full top-0 left-0 sticky backdrop-blur-md bg-opacity-80 z-10">
      <NavLink
        about="home"
        to={user?.currentUser ? "/" : "/welcome"}
        className="text-white p-2 w-2/12 flex items-center justify-start"
      >
        <GraphicEqIcon className="text-rose-600" /> Musicc
      </NavLink>
      {/* SearchBar */}
      <div className="search p-2 w-8/12 hidden md:flex items-center justify-center">
        <div className="dummy-serch | flex items-center justify-center border border-slate-600 p-2 rounded-full w-3/5">
          <input type="search" name="search" className="px-2 bg-transparent w-full" aria-label="search input" placeholder="Search..."/>
          <Search className="text-neutral-300 cursor-pointer" />
        </div>
      </div>
      <div className="user-search | p-2 w-2/12 flex md:gap-5 items-center justify-end">
        <NavLink aria-label="upload" to="/upload" className="text-white hover:text-rose-600 hidden md:block">
          Upload
        </NavLink>
        <NavLink aria-label="search" to="/search" className="flex md:hidden text-white mx-3">
          <Search />
        </NavLink>
        {user?.currentUser ? (
          <NavLink aria-label="user's section" to="/user" className="text-white ">
            <AccountCircleOutlinedIcon />
          </NavLink>
        ) : (
          <NavLink aria-label="user's section" to="/signin" className="text-white hover:text-rose-600">
            Signin
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
