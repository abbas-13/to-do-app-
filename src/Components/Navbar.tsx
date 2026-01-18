import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  return (
    <div className="flex justify-between h-[54px] p-6 bg-[#FAFBFF] border-b-2 border-b-grey-400 items-center">
      <div className="flex gap-4 items-center">
        <img style={{ height: "30px" }} src="/check.png" />
        <h1 className="bg-gradient-to-r from-[#2097F3] to-[#60B4F5] bg-clip-text text-transparent text-transparent text-3xl font-semibold">
          to-do
        </h1>
      </div>
      <div>
        <SettingsIcon />
      </div>
    </div>
  );
};

export default Navbar;
