import { StateProvider } from "./context/StateProvider";
import { Main } from "./Main";
import { reducer } from "./context/reducer";
import { initialState } from "./context/initialState";

export default function App() {
  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <Main />
    </StateProvider>
  );
}
