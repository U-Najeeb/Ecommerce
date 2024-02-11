import { UserContextProvider } from "./context/userContext";
import MainNavigator from "./navigation/MainNavigator";

function App() {
  return (
    <>
      <UserContextProvider>
        <MainNavigator />
      </UserContextProvider>
    </>
  );
}

export default App;
