import { useContext } from "react";
import UserContext from "./userContext.js";

// Custom hook to access the user context
export default function useUser() {
	// Get context value
	const context = useContext(UserContext);

	// Throw an error if hook is used outside of the provider
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}

	// Return user context (user, setUser, loading)
	return context;
}
