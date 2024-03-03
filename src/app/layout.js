import { Inter } from "next/font/google";

export const metadata = {
  title: "Pesto Todos app",
  description: "Simple todos app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
