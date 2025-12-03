import "../css/Menu.css";
import useUser from "../context/useUser.js";
import { Link } from "react-router-dom";

function Menu() {
	const { user } = useUser();

	return (
		<>
			<div className="main-menu">
				<ul>
					<li><div className="btn-wrapper"><button className="btn active">Accueil</button></div></li>
					{ user && (
						<>
							<Link to="/passions"><li><div className="btn-wrapper"><button className="btn">Mes passions</button></div></li></Link>
							<Link to="/create"><li><div className="btn-wrapper"><button className="btn">Créer une passion</button></div></li></Link>
							<Link to="/profile"><li><div className="btn-wrapper"><button className="btn">Mon profil</button></div></li></Link>
						</>
					)}
					
				</ul>
			</div>
		</>
	)
}

export default Menu;
