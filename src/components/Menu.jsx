import "../css/Menu.css";
import useUser from "../context/useUser.js";

function Menu() {
	const { user } = useUser();

	return (
		<>
			<div className="main-menu">
				<ul>
					<li><div className="btn-wrapper"><button className="btn active">Accueil</button></div></li>
					<li><div className="btn-wrapper"><button className="btn">Passions</button></div></li>
					{ user && (
						<>
							<li><div className="btn-wrapper"><button className="btn">Créer</button></div></li>
							<li><div className="btn-wrapper"><button className="btn">Profil</button></div></li>
						</>
					)}
					
				</ul>
			</div>
		</>
	)
}

export default Menu;
