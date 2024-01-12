import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="app h-screen flex items-center justify-center">
    <main className="flex flex-col items-center justify-center shadow-2xl border-8 border-gray-800 bg-center bg-no-repeat bg-cover overflow-hidden">
      {children}
    </main>
  </div>
);

export default Layout;
