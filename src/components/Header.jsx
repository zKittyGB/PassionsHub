import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import useUser from "../context/useUser.js";
import { useState } from "react";

function Header() {
	const { user, setUser } = useUser();
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
		setMobileMenuOpen(false); // close mobile menu on logout
	};

	return (
		<header className="header">
			<Link to="/"><h1>Communauté de Loisirs & Passions</h1></Link>

			{/* Desktop / tablet actions */}
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
						<img
							src={`https://www.zkittygb.fr/projects/passionsHub/public/pictures/profilePictures/${user.profilePicture}`}
							alt="photo de profil"
							className="profile-picture"
						/>
						<div className="btn-wrapper">
							<button className="btn filled" onClick={handleLogout}>Déconnexion</button>
						</div>
					</>
				)}
			</div>

			{/* Burger menu for mobile */}
			<div className="burger-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
				<i className={`fa ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} style={{ fontSize: "1.5rem" }}></i>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="mobile-menu">
					<Link to="/" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
					{user && <Link to="/mypassions" onClick={() => setMobileMenuOpen(false)}>Mes passions</Link>}
					{user && <Link to="/create" onClick={() => setMobileMenuOpen(false)}>Créer une passion</Link>}
					{!user && <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>}
					{!user && <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Inscription</Link>}
					{user && <div onClick={handleLogout}>Déconnexion</div>}
				</div>
			)}
		</header>
	);
}

export default Header;
