import { ClerkProvider } from '@clerk/nextjs'
import { TopNav } from "~/app/_components/TopNav";

import "~/styles/globals.css";

export const metadata = {
  title: "Keanino",
  description: "A bout love, art and Poetry",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-main">
          <div className="max-w-600 mx-auto h-[100vh]">
            <TopNav />
            {children}
          </div>
          </body>
      </html>
      </ClerkProvider>
  );
}

