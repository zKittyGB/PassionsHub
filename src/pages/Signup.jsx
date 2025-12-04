import { useState } from "react";
import "../css/Auth.css";

// Component for user signup form
function Signup() {
	// --- Form field states ---
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [picture, setPicture] = useState("");
	const [generalMessage, setGeneralMessage] = useState("");
	const [generalMessageType, setGeneralMessageType] = useState(""); // "success" or "error"

	// --- Errors stored as array per field ---
	const [errors, setErrors] = useState({
		name: [],
		username: [],
		email: [],
		password: [],
		confirmPassword: [],
		picture: []
	});

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Initialize error lists for each field
		const newErrors = {
			name: [],
			username: [],
			email: [],
			password: [],
			confirmPassword: [],
			picture: []
		};

		// -----------------------------
		// BASIC VALIDATIONS
		// -----------------------------

		// Required fields
		if (!name.trim()) newErrors.name.push("Ce champ est obligatoire");
		if (!username.trim()) newErrors.username.push("Ce champ est obligatoire");
		if (!email.trim()) newErrors.email.push("Ce champ est obligatoire");
		if (!password.trim()) newErrors.password.push("Ce champ est obligatoire");
		if (!confirmPassword.trim()) newErrors.confirmPassword.push("Ce champ est obligatoire");

		// Email format validation
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email.push("Email invalide");
		}

		// Password validations
		if (password) {
			if (password.length < 8) newErrors.password.push("Le mot de passe doit contenir au moins 8 caractères");
			if (!/[A-Z]/.test(password)) newErrors.password.push("Le mot de passe doit contenir une majuscule");
			if (!/[a-z]/.test(password)) newErrors.password.push("Le mot de passe doit contenir une minuscule");
			if (!/[0-9]/.test(password)) newErrors.password.push("Le mot de passe doit contenir un chiffre");
			if (!/[^A-Za-z0-9]/.test(password)) newErrors.password.push("Le mot de passe doit contenir un symbole");
		}

		// Password confirmation
		if (password !== confirmPassword) {
			newErrors.confirmPassword.push("Les mots de passe ne correspondent pas");
		}

		// Check if there are any errors
		const hasErrors = Object.values(newErrors).some((arr) => arr.length > 0);

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		// Prepare form data for submission
		const formData = new FormData();
		formData.append("name", name);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);

		if (picture) {
			formData.append("picture", picture);
		}

		// Submit form data to backend
		fetch("https://zkittygb.fr/projects/passionsHub/backend/signup.php", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					// Display success message
					setGeneralMessage("Inscription réussie !");
					setGeneralMessageType("success");
					// Reset form fields
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
					// Display general or field-specific errors from backend
					if (data.errors.general) {
						setGeneralMessage(data.errors.general[0]);
						setGeneralMessageType("error");
					} else {
						setGeneralMessage("");
					}
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

	// Utility to render error lists
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
				{/* Form title */}
				<h2>Formulaire d'inscription</h2>

				{/* General success or error message */}
				{generalMessage && (
					<div className={`general-message ${generalMessageType}`}>
						{generalMessage}
					</div>
				)}

				{/* Profile picture input */}
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

				{/* Name and username inputs */}
				<div className="inlineGroup-wrapper">
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

				{/* Email input */}
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

				{/* Password and confirm password inputs */}
				<div className="inlineGroup-wrapper">
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
