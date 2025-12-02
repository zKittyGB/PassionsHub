import { useState, useEffect } from "react";
import UserContext from "./userContext.js";

export default function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			const savedUser = localStorage.getItem("user");
			const savedToken = localStorage.getItem("sessionToken");

			if (savedUser && savedToken) {
				const userObj = JSON.parse(savedUser);

				try {
					const res = await fetch(
						"https://zkittygb.fr/projects/passionsHub/backend/validateToken.php",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ userID: userObj.phID, token: savedToken }),
						}
					);
					const data = await res.json();

					if (data.success) setUser(userObj);
					else {
						localStorage.removeItem("user");
						localStorage.removeItem("sessionToken");
					}
				} catch (err) {
					localStorage.removeItem("user");
					localStorage.removeItem("sessionToken");
					console.log(err);
				}
			}

			setLoading(false);
		};

		checkUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	);
}
