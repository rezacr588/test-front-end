import { useContext } from "react";
import { StateContext } from "./StateProvider";

const useDispatch = () => {
  const [, dispatch] = useContext(StateContext);
  return dispatch;
};

export default useDispatch;
