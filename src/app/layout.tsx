import { ClerkProvider } from '@clerk/nextjs';
import { TopNav } from "~/components/TopNav";
import "~/styles/globals.css";

export const metadata = {
  title: "Keanino",
  description: "Kelly's Personal Journal",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary font-noto">
        <ClerkProvider>
          <div className="max-w-600 mx-auto h-[100vh]">
            <TopNav />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
