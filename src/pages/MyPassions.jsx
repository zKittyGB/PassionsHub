import { useState, useEffect } from "react";
import useUser from "../context/useUser.js";
import Menu from "../components/Menu.jsx";
import MyPassionsBody from "../components/MyPassionsBody.jsx";

function MyPassions() {
	const { user } = useUser();
	const [passions, setPassions] = useState([]);

	useEffect(() => {
		if (!user?.ID) return;

		const formData = new FormData();
		formData.append("userID", user.ID);

		fetch("https://zkittygb.fr/projects/passionsHub/backend/getMyPassions.php", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => setPassions(data))
			.catch(err => console.error("Erreur fetching passions:", err));
	}, [user]);

	return (
		<div className="main">
			<Menu selected="myPassions" />
			<MyPassionsBody myPassions={passions} />
		</div>
	);
}

export default MyPassions;
