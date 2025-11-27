import { Link } from "react-router-dom";
import "../css/Header.css";

function Header() {

	return (
		<>
			<div className="header">
				<Link to="/"><h1>Communauté de Loisirs & Passions</h1></Link>
				<div className="actions">
					<Link to="/login"><div className="btn-wrapper"><button className="btn">Connexion</button></div></Link>
					<Link to="/signup"><div className="btn-wrapper"><button className="btn filled">Inscription</button></div></Link>
				</div>
			</div>
		</>
	)
}

export default Header;
