import UserButton from "@/features/auth/components/UserButton";
import WorkspacesSwitcher from "./WorkspacesSwitcher";

const Sidebar = () => {
  return (
    <aside className="min-w-[70px] bg-[#481349] gap-y-4 pt-[9px] pb-4 flex flex-col items-center ">
      <WorkspacesSwitcher />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto ">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
