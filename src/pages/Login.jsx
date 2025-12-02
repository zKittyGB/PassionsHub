import { useState } from "react";
import "../css/Auth.css";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser.js";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({
		email: [],
		password: []
	});
	const [generalError, setGeneralError] = useState("");
	const { setUser } = useUser();
	
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		// Reset previous errors
		setErrors({ email: [], password: [] });
		setGeneralError("");

		// Front-end basic validation
		const newErrors = { email: [], password: [] };
		if (!email.trim()) newErrors.email.push("Ce champ est obligatoire");
		if (!password.trim()) newErrors.password.push("Ce champ est obligatoire");

		if (newErrors.email.length || newErrors.password.length) {
			setErrors(newErrors);
			return;
		}

		// Fetch login
		fetch("https://zkittygb.fr/projects/passionsHub/backend/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					// Stocker le token et l'ID de l'utilisateur dans localStorage
					localStorage.setItem("sessionToken", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					setUser(data.user);
					navigate("/"); // redirection
				} else {
					if (data.errors.general) {
						setGeneralError(data.errors.general[0]);
					} else {
						setGeneralError("");
						setErrors((prev) => ({
							...prev,
							...data.errors
						}));
					}
				}
			})
	};

	const renderErrors = (arr) =>
		arr?.length > 0 && (
			<ul className="error-list">
				{arr.map((err, i) => (
					<li key={i} className="error-item">{err}</li>
				))}
			</ul>
		);

	return (
		<div className="main-auth">
			<form id="login-form">
				<h2>Formulaire de connexion</h2>

				{/* General error */}
				{generalError && (
					<div className="general-message error">
						{generalError}
					</div>
				)}

				<div className="input-wrapper">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
					{renderErrors(errors.email)}
				</div>

				<div className="input-wrapper">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Mot de passe"
					/>
					{renderErrors(errors.password)}
				</div>

				<div className="btn-wrapper">
					<button className="btn filled" onClick={handleSubmit}>
						Connexion
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
