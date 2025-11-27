import "../css/Auth.css";

function Signup() {

	return (
		<>
			<div className="main-auth">
				<form id="signup-form" action="">
					<h2>Formulaire d'inscription</h2>
					
					<div className="inlineGroup-wrapper">
						<div className="input-wrapper">
							<input type="text" placeholder="Prénom" />
						</div>
						<div className="input-wrapper">
							<input type="text" placeholder="Pseudo" />
						</div>
					</div>
					
					<div className="inlineGroup-wrapper">
						<div className="input-wrapper">
							<input type="text" placeholder="Email" />
						</div>
					</div>

					<div className="inlineGroup-wrapper">
						<div className="input-wrapper">
							<input type="password" placeholder="Mot de passe" />
						</div>
						<div className="input-wrapper">
							<input type="password" placeholder="Retapper le mot de passe" />
						</div>
						
					</div>

					<div className="btn-wrapper">
						<button className="btn filled">Inscription</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Signup;
