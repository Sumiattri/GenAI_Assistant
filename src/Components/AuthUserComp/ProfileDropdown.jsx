import { useAuth } from "../../context/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import SpinnerOverlay from "../../utils/SpinnerOverlay";
import { MdLogout } from "react-icons/md";

const fallbackpng =
  "https://clone-gemini.vercel.app/assets/user_icon-BYrw3k3X.png";

function ProfileDropdown() {
  const { user } = useAuth();

  // console.log(user);

  const firstName = user?.displayName?.split(" ")[0];

  const [loader, setLoader] = useState();
  const handleLogout = async () => {
    setLoader(true);
    setTimeout(async () => {
      await signOut(auth);
      setLoader(false);
    }, 600);
  };

  if (loader) {
    return <SpinnerOverlay />;
  }

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton className="rounded-full  focus:outline-none cursor-pointer  ">
          <img
            src={user?.photoURL || fallbackpng}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover mt-1 active:outline-5"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute pt-3 flex flex-col items-center  right-0 z-10 mt-2 w-90 origin-top-right rounded-3xl bg-[#272A2C] shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 ">
          <MenuItem className="">
            <div className="flex justify-center text-[13px] text-gray-300 tracking-wide">
              {user.email}
            </div>
          </MenuItem>

          <MenuItem className=" py-5  ">
            <div className="flex flex-col gap-2 items-center justify-center">
              <img
                src={user?.photoURL || fallbackpng}
                alt=""
                className="rounded-full h-20 w-20 object-cover"
              />
              <p className="text-gray-300 text-[18px] font-poppins font-light ">
                Hii, {firstName} !
              </p>
            </div>
          </MenuItem>

          <MenuItem className=" mb-5 ">
            <div className=" mx-5 flex items-center justify-center py-2 cursor-pointer bg-[#1B1B1B] hover:bg-[#1B1B1B]/80 rounded-4xl ">
              <MdLogout className="text-gray-300 text-2xl" />
              <button
                onClick={handleLogout}
                className=" block  px-4 py-2 text-left text-sm text-white cursor-pointer font-light"
              >
                Sign out
              </button>
            </div>
          </MenuItem>

          <MenuItem>
            <div className=" flex items-center justify-center py-2 cursor-pointer text-xs text-gray-300 gap-2 ">
              <p>Privacy Policy</p>
              <span>|</span>
              <p>Terms of Service</p>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdown;
