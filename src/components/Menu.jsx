import "../css/Menu.css";
import useUser from "../context/useUser.js";
import { Link } from "react-router-dom";

function Menu(props) {
	const { user } = useUser();

	return (
		<>
			<div className="main-menu">
				<ul>
					<Link to="/"><li><div className="btn-wrapper"><button className={`btn ${props.selected === 'home' ? 'active' : ''}`}>Accueil</button></div></li></Link>
					{ user && (
						<>
							<Link to="/mypassions"><li><div className="btn-wrapper"><button className={`btn ${props.selected === 'myPassions' ? 'active' : ''}`}>Mes passions</button></div></li></Link>
							<Link to="/createpassion"><li><div className="btn-wrapper"><button className={`btn ${props.selected === 'createPassion' ? 'active' : ''}`}>Créer une passion</button></div></li></Link>
							<Link to="/profile"><li><div className="btn-wrapper"><button className={`btn ${props.selected === 'profile' ? 'active' : ''}`}>Mon profil</button></div></li></Link>
						</>
					)}
					
				</ul>
			</div>
		</>
	)
}

export default Menu;
