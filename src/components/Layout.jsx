import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatBot from "./ChatBot.jsx";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-noir text-offwhite">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
