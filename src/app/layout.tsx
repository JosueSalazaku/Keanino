import { TopNav } from "~/app/_components/TopNav";
import { ClerkProvider } from '@clerk/nextjs'

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
        <body>
          <div className="max-w-600 mx-auto h-[100vh]">
            <TopNav />
            {children}
          </div>
          </body>
      </html>
      </ClerkProvider>
  );
}

