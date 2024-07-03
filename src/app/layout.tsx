import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { TopNav } from "~/app/_components/TopNav";
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Kelly's Blog",
  description: "A bout loven, art and Poetry",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
          <body>
            <TopNav />
            {children}
          </body>
      </html>
    </ClerkProvider>
  );
}

