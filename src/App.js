import { StateProvider } from "./context/StateProvider";
import { Layout } from "./Layout";
import { reducer } from "./context/reducer";

export default function App() {
  return (
    <StateProvider reducer={reducer} initialState={{ data: [] }}>
      <Layout />
    </StateProvider>
  );
}
