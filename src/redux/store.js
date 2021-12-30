import { createStore } from "redux";
import rootReducer from "./reducer/index";

const root = createStore(rootReducer);

export default root;
