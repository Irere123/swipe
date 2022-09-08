import { render } from "solid-js/web";

import "./styles/index.css";
import { App } from "./app/App";

render(() => <App />, document.getElementById("root") as HTMLElement);
