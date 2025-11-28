import { Box, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export const Appshell = ({ children }: AppShellProps) => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {!isSmallScreen ? (
        <div className="h-full flex">
          <Sidebar />
          <main className="flex-1 p-4 overflow-x-hidden">{children}</main>
        </div>
      ) : (
        <div className="h-screen flex">
          <Button onClick={() => toggleDrawer(true)}>
            <MenuIcon
              fontSize="large"
              style={{ position: "absolute", top: 10, left: 10 }}
            />
          </Button>
          <Box>
            {open && <MobileSidebar open={open} toggleDrawer={toggleDrawer} />}
          </Box>
          <main
            onClick={() => toggleDrawer(false)}
            className="flex-1 p-4 overflow-x-hidden"
          >
            {children}
          </main>
        </div>
      )}
    </>
  );
};
