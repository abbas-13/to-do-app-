import { Box, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";
import styles from "./Appshell.module.css";

interface AppShellProps {
  children: React.ReactNode;
}

export const Appshell = ({ children }: AppShellProps) => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      {!isSmallScreen ? (
        <div className={styles["appshell-md"]}>
          <Sidebar />
          <main className={styles["children-container"]}>{children}</main>
        </div>
      ) : (
        <div className="h-screen flex">
          <Button onClick={() => toggleDrawer(true)} sx={{ height: "64px" }}>
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
            className={styles["children-container"]}
          >
            {children}
          </main>
        </div>
      )}
    </>
  );
};
