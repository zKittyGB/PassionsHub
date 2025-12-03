import { useState } from "react";
import "../css/Auth.css";

function Signup() {
	// --- Form fields states ---
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [picture, setPicture] = useState("");
	const [generalMessage, setGeneralMessage] = useState("");
	const [generalMessageType, setGeneralMessageType] = useState(""); // "success" ou "error"

	// --- Errors stored as array per field ---
	const [errors, setErrors] = useState({
		name: [],
		username: [],
		email: [],
		password: [],
		confirmPassword: []
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		// Initialize error lists for each field
		const newErrors = {
			name: [],
			username: [],
			email: [],
			password: [],
			confirmPassword: []
		};

		// -----------------------------
		// BASIC VALIDATIONS
		// -----------------------------

		// --- Required fields ---
		if (!name.trim()) newErrors.name.push("Ce champ est obligatoire");
		if (!username.trim()) newErrors.username.push("Ce champ est obligatoire");
		if (!email.trim()) newErrors.email.push("Ce champ est obligatoire");
		if (!password.trim()) newErrors.password.push("Ce champ est obligatoire");
		if (!confirmPassword.trim()) newErrors.confirmPassword.push("Ce champ est obligatoire");

		// --- Email format ---
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email.push("Email invalide");
		}

		// --- Password validations ---
		if (password) {
			if (password.length < 8) newErrors.password.push("Le mot de passe doit contenir au moins 8 caractères");
			if (!/[A-Z]/.test(password)) newErrors.password.push("Le mot de passe doit contenir une majuscule");
			if (!/[a-z]/.test(password)) newErrors.password.push("Le mot de passe doit contenir une minuscule");
			if (!/[0-9]/.test(password)) newErrors.password.push("Le mot de passe doit contenir un chiffre");
			if (!/[^A-Za-z0-9]/.test(password)) newErrors.password.push("Le mot de passe doit contenir un symbole");
		}

		// --- Password confirmation ---
		if (password !== confirmPassword) {
			newErrors.confirmPassword.push("Les mots de passe ne correspondent pas");
		}

		// Check if any field contains errors
		const hasErrors = Object.values(newErrors).some((arr) => arr.length > 0);

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		// Prepare form data
		const formData = new FormData();
		formData.append("name", name);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);

		if (picture) {
			formData.append("picture", picture);
		}

		// All validations succeeded
		fetch("https://zkittygb.fr/projects/passionsHub/backend/signup.php", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					setGeneralMessage("Inscription réussie !"); // set general success message
					setGeneralMessageType("success"); // reset general error
					// Optionally reset form fields
					setName("");
					setUsername("");
					setEmail("");
					setPassword("");
					setConfirmPassword("");
					setPicture("");
					setErrors({
						name: [],
						username: [],
						email: [],
						password: [],
						confirmPassword: [],
						picture: []
					});
				} else {
					if (data.errors.general) {
						setGeneralMessage(data.errors.general[0]); // set general error
						setGeneralMessageType("error"); // set general error type
					} else {
						setGeneralMessage(""); // reset if no general error
					}
					// can't use "...prev" because backend doesn't return confirmPassword
					setErrors({
						name: data.errors.name || [],
						username: data.errors.username || [],
						email: data.errors.email || [],
						password: data.errors.password || [],
						confirmPassword: [],
						picture: data.errors.picture || []
					});
				}

			});
	};

	// Utility for rendering errors
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
			<form id="signup-form" onSubmit={handleSubmit}>
				<h2>Sign Up Form</h2>
				{generalMessage && (
					<div className={`general-message ${generalMessageType}`}>
						{generalMessage}
					</div>
				)}

				<div className="picture-wrapper">
					<input 
						type="file" 
						id="picture" 
						name="picture" 
						accept="image/*"
						onChange={(e) => {
							setPicture(e.target.files[0]);
							setErrors(prev => ({ ...prev, picture: [] }));
						}}
					/>
					<label htmlFor="picture">
						{!picture && <i className="fa-solid fa-camera"></i>}
						{picture && <img src={URL.createObjectURL(picture)} alt="picture" className="profile-picture" />}
					</label>
					{renderErrors(errors.picture)}
				</div>

				<div className="inlineGroup-wrapper">

					{/* Name field */}
					<div className="input-wrapper">
						<input
							type="text"
							name="name"
							placeholder="Prénom"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
								setErrors(prev => ({ ...prev, name: [] }));
							}}
						/>
						{renderErrors(errors.name)}
					</div>

					{/* Username field */}
					<div className="input-wrapper">
						<input
							type="text"
							name="username"
							placeholder="Pseudo"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								setErrors(prev => ({ ...prev, username: [] }));
							}}
						/>
						{renderErrors(errors.username)}
					</div>
				</div>

				{/* Email field */}
				<div className="inlineGroup-wrapper">
					<div className="input-wrapper">
						<input
							type="text"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setErrors(prev => ({ ...prev, email: [] }));
							}}
						/>
						{renderErrors(errors.email)}
					</div>
				</div>

				<div className="inlineGroup-wrapper">

					{/* Password field */}
					<div className="input-wrapper">
						<input
							type="password"
							name="password"
							placeholder="Mot de passe"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setErrors(prev => ({ ...prev, password: [] }));
							}}
						/>
						{renderErrors(errors.password)}
					</div>

					{/* Password confirmation field */}
					<div className="input-wrapper">
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirmer le mot de passe"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setErrors(prev => ({ ...prev, confirmPassword: [] }));
							}}
						/>
						{renderErrors(errors.confirmPassword)}
					</div>
				</div>

				{/* Submit button */}
				<div className="btn-wrapper">
					<button type="submit" className="btn filled">
						S'enregistrer
					</button>
				</div>
			</form>
		</div>
	);
}

export default Signup;
