import { MdAutoAwesome } from "react-icons/md";
import { useGoogleLogin } from "../../auth/auth";

function VisitorNavbar() {
  const handleGoogleLogin = useGoogleLogin();

  return (
    <nav className="flex  justify-between w-full pt-2 pl-4 pr-8">
      <div className="text-white text-xl font-poppins font-medium tracking-wider flex items-center gap-1">
        <MdAutoAwesome className="text-blue-400" />
        GenAI
      </div>
      <button
        className="bg-blue-300 px-5 py-[7px] rounded text-sm font-normal mt-2 cursor-pointer hover:bg-blue-300/90"
        onClick={handleGoogleLogin}
      >
        Sign in
      </button>
    </nav>
  );
}

export default VisitorNavbar;
