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
      <html lang="en">
          <body>
            <TopNav />
            {children}
          </body>
      </html>

  );
}

