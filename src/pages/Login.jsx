import "../css/Login.css";

function Login() {

	return (
		<>
			<div className="main-login">
				<form id="login-form" action="">
					<h2>Formulaire de connexion</h2>
					<div className="input-wrapper">
						<input type="text" placeholder="Email" />
					</div>
					<div className="input-wrapper">
						<input type="password" placeholder="Mot de passe" />
					</div>
					<div className="btn-wrapper">
						<button className="btn filled">Connexion</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Login;
