import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import useUser from "../context/useUser.js";

function Header() {
	const { user, setUser } = useUser();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	};

	return (
		<div className="header">
			<Link to="/"><h1>Communauté de Loisirs & Passions</h1></Link>
			<div className="actions">
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
				{user && (
					<>
						<p>Bienvenue <strong>{user.username}</strong> !</p>
						<img src={"https://www.zkittygb.fr/projects/passionsHub/public/pictures/profilePictures/"+(user.profilePicture)} alt="profile picture" className="profile-picture" />
						<div className="btn-wrapper"><button className="btn filled" onClick={handleLogout}>déconnexion</button></div>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
