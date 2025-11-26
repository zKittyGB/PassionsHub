import "../css/Menu.css"

function Menu() {

	return (
		<>
			<div className="main-menu">
				<ul>
					<li><div className="btn-wrapper"><button className="btn active">Accueil</button></div></li>
					<li><div className="btn-wrapper"><button className="btn">Passions</button></div></li>
					<li><div className="btn-wrapper"><button className="btn">Créer</button></div></li>
					<li><div className="btn-wrapper"><button className="btn">Profil</button></div></li>
				</ul>
			</div>
		</>
	)
}

export default Menu
