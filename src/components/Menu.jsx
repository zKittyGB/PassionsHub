import "../css/Menu.css"

function Menu() {

	return (
		<>
			<div className="main-menu">
				<ul>
					<li><button className="btn active">Accueil</button></li>
					<li><button className="btn">Passions</button></li>
					<li><button className="btn">Créer</button></li>
					<li><button className="btn">Profil</button></li>
				</ul>
			</div>
		</>
	)
}

export default Menu
