import { useAuth } from "../../context/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import SpinnerOverlay from "../../utils/SpinnerOverlay";

const fallbackpng =
  "https://clone-gemini.vercel.app/assets/user_icon-BYrw3k3X.png";

function ProfileDropdown() {
  const { user } = useAuth();

  console.log(user);

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
        <MenuButton className="rounded-full  focus:outline-none ">
          <img
            src={user?.photoURL || fallbackpng}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover mt-1"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute pt-3 flex flex-col items-center  right-0 z-10 mt-2 w-90 origin-top-right rounded-3xl bg-[#272A2C] shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 ">
          <MenuItem className=" ">
            <a
              href="#"
              className="block  px-4 text-xs text-gray-200   data-focus:outline-hidden"
            >
              {user.email}
            </a>
          </MenuItem>

          <MenuItem className=" py-5  ">
            <div className="flex flex-col gap-2 items-center justify-center">
              <img
                src={user?.photoURL || fallbackpng}
                alt=""
                className="rounded-full h-20 w-20 object-cover"
              />
              <p className="text-gray-300 text-xl font-poppins">
                Hii {user.diaplayName}
              </p>
            </div>
          </MenuItem>

          <form action="#" method="POST">
            <MenuItem>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdown;
