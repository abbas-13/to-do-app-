import { useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "./ui/sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";
import Navbar from "./Navbar";
import styles from "./Appshell.module.css";

interface AppShellProps {
  children: React.ReactNode;
}

export const Appshell = ({ children }: AppShellProps) => {
  const isSmallScreen = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {!isSmallScreen ? (
        <>
          <Navbar />
          <div className={styles["appshell-md"]}>
            <SidebarProvider open={open} onOpenChange={setOpen}>
              <Sidebar />
              <main className={styles["children-container"]}>{children}</main>
            </SidebarProvider>
          </div>
        </>
      ) : (
        <div className="h-screen flex">
          <div className="bg-[#F5FAFE] pt-6 pl-4">
            <SidebarProvider open={open} onOpenChange={setOpen}>
              <MobileSidebar />
            </SidebarProvider>
          </div>
          <main className={styles["mobile-children-container"]}>
            {children}
          </main>
        </div>
      )}
    </>
  );
};
