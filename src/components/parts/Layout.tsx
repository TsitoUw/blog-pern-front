import { Outlet } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
type Props = {};

const Layout = (props: Props) => {
  return (
    <div className="relative">
      <div className="navbar | p-2 bg-slate-900 flex w-full" >
        <div className="p-2 w-2/12 flex items-center justify-start"><GraphicEqIcon className='text-amber-500'/> Musicc</div>
        <div className="search p-2 w-8/12 flex items-center justify-center">search</div>
        <div className="user | p-2 w-2/12 flex items-center justify-end">user</div>
      </div>
      <div className="px-4">
        <Outlet />
      </div>

      <AudioPlayer className="bottom-0 left-0 fixed" />
    </div>
  );
};

export default Layout;
