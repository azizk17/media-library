import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwindIndicator";
import { Navbar } from "@/app/components/Navbar";
import Providers from "./Providers";
import "ui/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout = async ({ children, modal }: RootLayoutProps) => {
  const session = await getServerSession(authOptions);
  const isAuth = !!session?.user;
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <MainLayout>
            {children}
            {modal}
          </MainLayout>

          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
