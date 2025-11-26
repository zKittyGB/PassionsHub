import "../css/Header.css"
function button() {}

function Header() {

	return (
		<>
			<div className="header">
				<h1>Communauté de Loisirs & Passions</h1>
				<div className="actions">
					<button className="btn" onClick={button}>Connexion</button>
					<button className="btn filled" onClick={button}>Inscription</button>
				</div>
			</div>
		</>
	)
}

export default Header
