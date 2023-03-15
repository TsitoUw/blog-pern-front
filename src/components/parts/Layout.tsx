import { Outlet, NavLink } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Search from "@mui/icons-material/Search";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
type Props = {};

const Layout = (props: Props) => {
  const user = useContext(UserContext);
  return (
    <div className="relative">
      <div className="navbar | p-2 bg-slate-900 flex justify-between w-full top-0 left-0 sticky backdrop-blur-md bg-opacity-80 z-10" >
        <NavLink about="home" to={user?.currentUser?"/":"/welcome"} className="text-white p-2 w-2/12 flex items-center justify-start"><GraphicEqIcon className='text-rose-600'/> Musicc</NavLink>
        <div className="search p-2 w-8/12 hidden md:flex items-center justify-center">
          <div className="dummy-serch | flex items-center justify-center border border-slate-600 p-1 rounded-md w-3/5">
            <input type="search" name="search" className="px-2 bg-transparent w-full" aria-label="search input"/>
            <Search className="text-neutral-300 cursor-pointer"/>
          </div>
        </div>
        <div className="user-search | p-2 w-2/12 flex items-center justify-end">

          <NavLink aria-label="search" to="/search" className="flex md:hidden text-white mx-3"><Search /></NavLink>
          <NavLink aria-label="upload" to="/users" className="text-white "><AccountCircleOutlinedIcon /></NavLink>
        </div>
      </div>
      <div className="px-2 md:px-4 pb-16 z-0">
        <Outlet />
      </div>

      <AudioPlayer className="bottom-0 left-0 fixed z-10" />
    </div>
  );
};

export default Layout;
