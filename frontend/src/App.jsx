import { Toaster } from "sonner";
import "./App.css";
import Chat from "./pages/chat";
import Home from "./pages/home";
import { MessageProvider } from "./providers/message-provider.jsx";
import { UserProvider } from "./providers/user-provider.jsx";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>NECX Messaging App</h1>
        <p>Personal messaging interface</p>
      </header>

      <main className="app-main">
        {/* <Home /> */}
        <UserProvider>
          <MessageProvider>
            <Chat />
          </MessageProvider>
        </UserProvider>
        <Toaster position="top-right" toastOptions={{}} />
      </main>
    </div>
  );
}

export default App;
