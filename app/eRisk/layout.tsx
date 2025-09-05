import type { Metadata } from "next";
import "@/app/globals.css";
import { BasicSideBar } from "./_eRisk/components/sidebar";
import { SystemHeader } from "./_eRisk/components/header";

export const metadata: Metadata = {
  title: "eRisk Module",
  description: "Module for track and monitor risk",
};

export default function RootERiskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-svw h-svh flex flex-col overflow-hidden">
      <header className="bg-sidebar">
        <SystemHeader />
      </header>
      <section className="flex-1 flex h-[calc(100svh-56px)]">
        <section role="menu" className="bg-sidebar relative">
          <BasicSideBar />
        </section>
        <main
          role="main"
          className="pl-[60px] w-[calc(100svw-0px)]  flex h-[calc(100svh-56px)]">
          {children}
        </main>
      </section>
    </section>
  );
}
