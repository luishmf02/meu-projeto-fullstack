import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";
import { ClienteProvider } from "@/context/ClienteContext";

export const metadata: Metadata = {
  title: "Loja Gamer XP",
  description: "Venda de jogos para todas as plataformas - PC, PlayStation, Xbox e Nintendo",
  keywords: ["jogos", "games", "loja de jogos", "videogames", "PC", "PS5", "Xbox", "Switch"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ClienteProvider>
          <Header />
          {children}
          <Toaster richColors position="top-center" />
        </ClienteProvider>
      </body>
    </html>
  );
}
