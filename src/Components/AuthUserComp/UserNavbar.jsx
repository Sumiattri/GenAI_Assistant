import { MdAutoAwesome } from "react-icons/md";

import ProfileDropdown from "./ProfileDropdown";

function UserNavbar() {
  return (
    <nav className="flex  justify-between w-full pt-2 pl-4 pr-8">
      <div className="text-white text-xl font-poppins font-medium tracking-wider flex items-center gap-1">
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
