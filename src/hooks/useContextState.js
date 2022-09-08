import { useContext } from "react";
import { StateContext } from "../context/StateProvider";

const useDispatch = () => {
  const [states] = useContext(StateContext);
  return states;
};

export default useDispatch;
