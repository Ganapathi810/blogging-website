import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { auth } from "@/lib/auth";
import { DeleteBlogContextProvider } from "@/contexts/delete-blog-context";
import { AlertInfoContextProvider } from "@/contexts/alert-info-context";
import GlobalDeleteBlogAlertDialog from "@/components/global-delete-blog-dialog";
import GlobalAlertMessage from "@/components/global-alert-message";
import { AppSidebar } from "@/components/app-sidebar";
import TopBar from "@/components/top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { getAllBlogsOfUser } from "@/lib/db/blog";
import { LoadingContextProvider } from "@/contexts/loading";
import AuthGuard from "@/components/auth-guard";
import { Blog } from "@prisma/client";

export const metadata: Metadata = {
  title: "Blogging website",
  description: "A blog website to share insights on anything",
  icons : {
    icon : '/favicon.ico'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  let blogsPromise: Promise<Blog[]>;

  if (session?.user?.id) {
      try {
          blogsPromise = getAllBlogsOfUser(Number(session.user.id));
      } catch (error) {
          console.error("Failed to fetch blogs in RootLayout:", error);
          blogsPromise = Promise.resolve([]);
      }
  } else {
      blogsPromise = Promise.resolve([]);
  }
  
  
  return (
    <html lang="en">
      <body>
          <Providers session={session}>
            <AlertInfoContextProvider>
              <DeleteBlogContextProvider>
                <LoadingContextProvider>
                  <SidebarProvider defaultOpen={defaultOpen}>
                    <div className="flex h-screen w-screen">
                        <GlobalDeleteBlogAlertDialog />
                        <GlobalAlertMessage />
                        <AuthGuard>
                          <AppSidebar blogs={blogsPromise} />
                            <div className="flex-1 flex flex-col bg-green-100">
                                <TopBar />
                                <main className="overflow-y-auto">{children}</main>
                            </div>
                        </AuthGuard>
                    </div>
                  </SidebarProvider>
                </LoadingContextProvider>
              </DeleteBlogContextProvider>
            </AlertInfoContextProvider>
          </Providers>
      </body>
    </html>
  );
}
