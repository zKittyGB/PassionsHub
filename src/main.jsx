import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import UserProvider from "./context/UserProvider.jsx";
import AppLoader from "./AppLoader.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<UserProvider>
			<AppLoader />
		</UserProvider>
	</StrictMode>
);
