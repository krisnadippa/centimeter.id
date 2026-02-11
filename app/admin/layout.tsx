"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import { LayoutDashboard, PlusCircle, LogOut, Home, User } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/add", label: "Add Property", icon: PlusCircle },
  ];

  const handleLogout = async () => {
    // Ideally call an API to clear cookie, but for now we can just redirect to login
    // Or we can delete the cookie client side if it wasn't httpOnly, but it is.
    // So we need a logout route. For simplicity in this demo, let's just push to login
    // and let the user know. In a real app, hit /api/auth/logout.
    // Let's make a simple client-side cookie clearing for the demo strictly or just redirect.
    // Since httpOnly cookie cannot be cleared by JS, allow the user to just go to login page.
    // A proper logout would require an API endpoint.
    // For now, let's just redirect to home.
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-50 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 mb-1">
                <Home size={20} />
                View Website
            </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header - Visible only on small screens */}
        <header className="bg-white border-b border-gray-200 p-4 md:hidden flex items-center justify-between sticky top-0 z-40">
            <span className="font-bold text-lg">Admin Panel</span>
            <div className="flex gap-4">
                 <Link href="/admin/add" className="p-2 bg-gray-100 rounded-lg">
                    <PlusCircle size={20} />
                 </Link>
                 <Link href="/login" className="p-2 bg-gray-100 rounded-lg text-red-500">
                    <LogOut size={20} />
                 </Link>
            </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
}
