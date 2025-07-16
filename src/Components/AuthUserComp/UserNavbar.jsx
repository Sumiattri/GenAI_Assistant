import { MdAutoAwesome } from "react-icons/md";

import ProfileDropdown from "./ProfileDropdown";
import { GiHamburgerMenu } from "react-icons/gi";

function UserNavbar({ expanded, setExpanded }) {
  return (
    <nav className="flex  justify-between items-center w-full pt-2 pl-4 pr-8">
      <div className="lg:hidden absolute ">
        <GiHamburgerMenu
          className="text-white text-[22px] cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
            console.log("btn clicked");
          }}
        />
      </div>
      <div className="text-white sm:text-xl text-2xl font-poppins font-medium lg:ml-0 ml-12 tracking-wider flex items-center gap-1">
        <MdAutoAwesome className="text-blue-400" />
        GenAI
      </div>
      <div className="">
        <ProfileDropdown />
      </div>
    </nav>
  );
}

export default UserNavbar;
