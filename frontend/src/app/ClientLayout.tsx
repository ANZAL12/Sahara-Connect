"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    const isAdminDashboard = pathname?.startsWith("/admin") && pathname !== "/admin/login";

    return (
        <>
            {!isAdminDashboard && <Navbar />}
            {children}
        </>
    );
}
