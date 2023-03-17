import Nav from "./Nav";
import QueryWrapper from "./QueryWrapper";
import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "AI marketing generator",
  description: "Generated by emanishimwe ai ",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}