import { TbLayoutSidebar } from "react-icons/tb";

function UserSidebar() {
  return (
    <div className=" w-full h-full flex flex-col gap-10 py-5 px-5 flex-wrap">
      <div className="text-white text-xl ">
        <TbLayoutSidebar />
      </div>
      <div></div>
    </div>
  );
}

export default UserSidebar;
