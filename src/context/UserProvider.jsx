import { useState, useEffect } from "react";
import UserContext from "./userContext.js";

// Provider component to manage and provide user authentication state
export default function UserProvider({ children }) {
	// State to store current user
	const [user, setUser] = useState(null);
	// State to indicate if user validation is in progress
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Function to check if a user is saved and validate the token
		const checkUser = async () => {
			// Retrieve saved user and token from localStorage
			const savedUser = localStorage.getItem("user");
			const savedToken = localStorage.getItem("sessionToken");

			if (savedUser && savedToken) {
				const userObj = JSON.parse(savedUser);

				try {
					// Validate the token via backend
					const res = await fetch(
						"https://zkittygb.fr/projects/passionsHub/backend/validateToken.php",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ userID: userObj.ID, token: savedToken }),
						}
					);
					const data = await res.json();

					// If validation succeeds, update user state
					if (data.success) setUser(userObj);
					// Otherwise, remove invalid data from localStorage
					else {
						localStorage.removeItem("user");
						localStorage.removeItem("sessionToken");
					}
				} catch (err) {
					// Remove local data if error occurs and log the error
					localStorage.removeItem("user");
					localStorage.removeItem("sessionToken");
					console.log(err);
				}
			}

			// Mark loading as finished
			setLoading(false);
		};

		// Run the user check on component mount
		checkUser();
	}, []);

	// Provide user state and loading state to all children components
	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	);
}
