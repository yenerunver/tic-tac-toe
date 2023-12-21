import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="app h-screen flex items-center justify-center">
    <main className="flex flex-col items-center justify-center shadow-2xl border-8 mobile-screen border-gray-800 rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden">
      {children}
    </main>
  </div>
);

export default Layout;
