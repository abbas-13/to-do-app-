import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound, LogOut } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        setUser({
          userId: "",
          name: "",
          email: "",
          displayName: "",
        });
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unkown error occurred";
      console.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-between h-[54px] p-6 bg-[#FAFBFF] border-b-2 border-b-grey-400 items-center">
      <div className="flex gap-4 items-center">
        <img style={{ height: "30px" }} src="/check.png" />
        <h1 className="bg-gradient-to-r from-[#2097F3] to-[#60B4F5] bg-clip-text text-transparent text-transparent text-3xl font-semibold">
          to-do
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 items-center">
            <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
              {user.name}
            </h4>
            <Avatar className="flex justify-center items-center border-2">
              <CircleUserRound size={26} />
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={logOut}>
              Logout <LogOut />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
