import "./App.css";
import Toast from "./components/toast";
import Chat from "./pages/chat";
import { MessageProvider } from "./providers/message-provider";
import { ToastProvider } from "./providers/toast-provider";
import { UserProvider } from "./providers/user-provider";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>NECX Messaging App</h1>
        <p>Personal messaging interface</p>
      </header>

      <main className="app-main">
  {/* <Home /> */}
        <ToastProvider>
          <UserProvider>
            <MessageProvider>
              <Chat />
            </MessageProvider>
          </UserProvider>
          <Toast />
        </ToastProvider>
      </main>
    </div>
  );
}

export default App;
