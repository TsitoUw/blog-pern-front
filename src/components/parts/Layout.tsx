import { Outlet } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import NavBar from "./NavBar";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className="relative">
      <NavBar />
      {/* Content */}
      <div className="px-2 md:px-4 pb-16 z-0">
        <Outlet />
      </div>

     
      {/* Audio controller */}
      <AudioPlayer className="bottom-0 left-0 fixed z-10" />
    </div>
  );
};

export default Layout;
