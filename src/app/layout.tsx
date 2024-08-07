import { TopNav } from "~/app/_components/TopNav";
import { ThemeProvider } from './../components/theme-provider';

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
      <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopNav />
          {children}
          </ThemeProvider>
          </body>
      </html>

  );
}

