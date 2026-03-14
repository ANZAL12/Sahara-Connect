"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                
                <div className="flex-1 flex flex-col min-w-0 h-screen">
                    {/* Mobile Header */}
                    <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-gray-200 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -ml-2 rounded-lg hover:bg-gray-100"
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6 text-gray-700" />
                            </button>
                            <span className="font-serif font-bold text-xl text-gray-900 line-clamp-1">Admin</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
                            SC
                        </div>
                    </header>

                    <main className="flex-1 overflow-x-hidden overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}
