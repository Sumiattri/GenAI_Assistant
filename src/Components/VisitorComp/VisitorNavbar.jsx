import { MdAutoAwesome } from "react-icons/md";
import { useGoogleLogin } from "../../auth/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { resetChat, setChatId } from "../../redux/chatSlice";
import { useDispatch } from "react-redux";

function VisitorNavbar({ expanded, setExpanded }) {
  const handleGoogleLogin = useGoogleLogin();

  const dispatch = useDispatch();

  return (
    <nav className="flex  justify-between items-center w-full pt-2 pl-4 pr-8">
      <div className="lg:hidden absolute ">
        <GiHamburgerMenu
          className="text-white text-[22px] cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
      </div>
      <div className="text-white text-xl font-poppins font-medium tracking-wider lg:ml-0 ml-12 flex items-center gap-1">
        <MdAutoAwesome className="text-blue-400" />
        GenAI
      </div>
      <button
        className="bg-blue-300 px-5 py-[7px] rounded text-sm font-normal mt-2 cursor-pointer hover:bg-blue-300/90"
        onClick={() => {
          handleGoogleLogin();
          dispatch(resetChat());
          dispatch(setChatId(null));
          localStorage.removeItem("activeChatId");
        }}
      >
        Sign in
      </button>
    </nav>
  );
}

export default VisitorNavbar;
