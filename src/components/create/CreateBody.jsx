import { useState } from "react";
import "../../css/Create.css";
import PictureWrapper from "./PictureWrapper.jsx";
import CategoriesSelect from "../CategoriesSelect.jsx";
import useUser from "../../context/useUser.js";

// Component to render the form for creating a new passion
function CreateBody() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [pictures, setPictures] = useState([]);
	const [keywords, setKeywords] = useState("");
	const [generalMessage, setGeneralMessage] = useState("");
	const [generalMessageType, setGeneralMessageType] = useState(""); // "success" or "error"
	const [errors, setErrors] = useState({
		title: [],
		description: [],
		selectedCategory: [],
		pictures: [],
		keywords: []
	});

	// Access user context setter
	const { user } = useUser();
	
	function handleSubmit(e) {
		e.preventDefault();

		const newErrors = {
			title: [],
			description: [],
			selectedCategory: [],
			pictures: [],
			keywords: []
		};

		// -----------------------------
		// BASIC VALIDATIONS
		// -----------------------------

		// Required fields
		if (!title.trim()) newErrors.title.push("Ce champ est obligatoire");
		if (!description.trim()) newErrors.description.push("Ce champ est obligatoire");
		if (!selectedCategory.trim()) newErrors.selectedCategory.push("Ce champ est obligatoire");
		if (!keywords.trim()) newErrors.keywords.push("Ce champ est obligatoire");
		if (keywords.length > 500) newErrors.keywords.push("Le total des mots clés ne peut pas dépasser 500 caractères");
		if (pictures.length == 0) newErrors.pictures.push("Au moins une image est obligatoire");
		if (pictures.length > 10) newErrors.pictures.push("Vous ne pouvez pas ajouter plus de 10 images");

		// Check if there are any errors
		const hasErrors = Object.values(newErrors).some((arr) => arr.length > 0);

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		// Prepare form data for submission
		const formData = new FormData();
		formData.append("userID", user.ID);
		formData.append("selectedCategory", selectedCategory);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("keywords", keywords);

		pictures.forEach((picture) => {
			formData.append("pictures[]", picture);
		});

		// Submit form data to backend
		fetch("https://zkittygb.fr/projects/passionsHub/backend/create.php", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					// Display success message
					setGeneralMessage(data.message);
					setGeneralMessageType("success");
					// Reset form fields
					setTitle("");
					setDescription("");
					setSelectedCategory("");
					setPictures([]);
					setKeywords("");
					setErrors({
						title: [],
						description: [],
						selectedCategory: [],
						pictures: [],
						keywords: []
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
						selectedCategory: data.errors.selectedCategory || [],
						title: data.errors.title || [],
						description: data.errors.description || [],
						keywords: data.errors.keywords || [],
						pictures: data.errors.pictures || []
					});
				}
			});
	}
               
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
		<>
			<div className="create">
				{/* Form for creating a passion */}
				<form id="create-form" onSubmit={handleSubmit}>
					{/* General success or error message */}
					{generalMessage && (
						<div className={`general-message ${generalMessageType}`}>
							{generalMessage}
						</div>
					)}

					{/* Inline group: category select and title input */}
					<div className="inlineGroup-wrapper">
						{/* Category select dropdown */}
						<CategoriesSelect
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							errors={errors}
							setErrors={setErrors}
							renderErrors={renderErrors}
						/>

						{/* Input for passion title */}
						<div className="input-wrapper">
							<input 
								type="text"
								placeholder="Titre de la passion" 
								id="title"
								value={title}
								onChange={(e) => {
									setTitle(e.target.value)
									setErrors(prev => ({ ...prev, title: [] }));
								}}
							/>
							{renderErrors(errors.title)}
						</div>
					</div>

					{/* Textarea for passion description */}
					<div className="textarea-wrapper">
						<textarea type="text" 
							placeholder="Description de la passion"
							id="description" 
							value={description}
							onChange={(e) => {
								setDescription(e.target.value)
								setErrors(prev => ({ ...prev, description: [] }));
							}}
						/>
						{renderErrors(errors.description)}
					</div>

					{/* Input for keywords */}
					<div className="input-wrapper">
						<input type="text"
							placeholder="Mots clés (séparés par une virgule)"
							id="keywords" 
							value={keywords}
							onChange={(e) => {
								setKeywords(e.target.value)
								setErrors(prev => ({ ...prev, keywords: [] }));
							}}
						/>
						{renderErrors(errors.keywords)}
					</div>

					{/* Grid for picture uploads */}
					<div className="grid-wrapper">
						{/* Generate 10 PictureWrapper components */}
						{Array.from({ length: 10 }).map((_map, i) => {
							return <PictureWrapper 
									key={i}
									ID={i}
									setPictures={setPictures}
									pictures={pictures}
									errors={errors}
									setErrors={setErrors}
								/>
						})}
						{renderErrors(errors.pictures)}
					</div>

					{/* Submit button */}
					<div className="btn-wrapper">
						<button type="submit" className="btn filled">Créer</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default CreateBody;
