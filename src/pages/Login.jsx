import { useState } from "react";
import "../css/Auth.css";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser.js";

// Component for user login form
function Login() {
	// State for email input
	const [email, setEmail] = useState("");
	// State for password input
	const [password, setPassword] = useState("");
	// State for field-specific errors
	const [errors, setErrors] = useState({
		email: [],
		password: []
	});
	// State for general error messages
	const [generalError, setGeneralError] = useState("");
	// Access user context setter
	const { setUser } = useUser();

	const navigate = useNavigate();

	// Handle form submission
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

		// Send login request to backend
		fetch("https://zkittygb.fr/projects/passionsHub/backend/login.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					// Store session token and user info in localStorage
					localStorage.setItem("sessionToken", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					setUser(data.user);
					// Redirect to home page
					navigate("/");
				} else {
					if (data.errors.general) {
						// Display general backend error
						setGeneralError(data.errors.general[0]);
					} else {
						// Display field-specific backend errors
						setGeneralError("");
						setErrors((prev) => ({
							...prev,
							...data.errors
						}));
					}
				}
			})
	};

	// Render a list of errors for a given field
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
				{/* Form title */}
				<h2>Formulaire de connexion</h2>

				{/* General error message */}
				{generalError && (
					<div className="general-message error">
						{generalError}
					</div>
				)}

				{/* Email input */}
				<div className="input-wrapper">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
					{renderErrors(errors.email)}
				</div>

				{/* Password input */}
				<div className="input-wrapper">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Mot de passe"
					/>
					{renderErrors(errors.password)}
				</div>

				{/* Submit button */}
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
