import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import useUser from "../context/useUser.js";

// Component to display the header with navigation and user actions
function Header() {
	// Access user context
	const { user, setUser } = useUser();
	// Hook to programmatically navigate
	const navigate = useNavigate();

	// Function to handle user logout
	const handleLogout = () => {
		// Remove user info from localStorage
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		// Update context to null
		setUser(null);
		// Redirect to home page
		navigate("/");
	};

	return (
		<div className="header">
			{/* Logo / Site title linking to home */}
			<Link to="/"><h1>Communauté de Loisirs & Passions</h1></Link>

			{/* User actions section */}
			<div className="actions">
				{/* Show login/signup buttons if user is not logged in */}
				{!user && (
					<>
						<Link to="/login">
							<div className="btn-wrapper"><button className="btn">Connexion</button></div>
						</Link>
						<Link to="/signup">
							<div className="btn-wrapper"><button className="btn filled">Inscription</button></div>
						</Link>
					</>
				)}

				{/* Show user info and logout button if user is logged in */}
				{user && (
					<>
						{/* Welcome message with username */}
						<p>Bienvenue <strong>{user.username}</strong> !</p>

						{/* User profile picture */}
						<img
							src={"https://www.zkittygb.fr/projects/passionsHub/public/pictures/profilePictures/" + user.profilePicture}
							alt="photo de profil"
							className="profile-picture"
						/>

						{/* Logout button */}
						<div className="btn-wrapper">
							<button className="btn filled" onClick={handleLogout}>Déconnexion</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
