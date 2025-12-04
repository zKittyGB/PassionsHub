import { useState } from "react";
import "../../css/Create.css";
import PictureWrapper from "./PictureWrapper.jsx";
import CategoriesSelect from "../CategoriesSelect.jsx";

// Component to render the form for creating a new passion
function CreateBody() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [picture, setPicture] = useState([]);
	const [keywords, setKeywords] = useState("");
	const [errors, setErrors] = useState({
		title: [],
		description: [],
		category: [],
		picture: []
	});

	function handleSubmit(e) {
		e.preventDefault();
		console.log(title, description, selectedCategory, picture, keywords);
	}


	return (
		<>
			<div className="create">
				{/* Form for creating a passion */}
				<form id="create-form" onSubmit={handleSubmit}>
					{/* Inline group: category select and title input */}
					<div className="inlineGroup-wrapper">
						{/* Category select dropdown */}
						<CategoriesSelect
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
						/>

						{/* Input for passion title */}
						<div className="input-wrapper">
							<input 
								type="text"
								placeholder="Titre de la passion" 
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
					</div>

					{/* Textarea for passion description */}
					<div className="textarea-wrapper">
						<textarea type="text" 
							placeholder="Description de la passion"
							id="description" 
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					{/* Input for keywords */}
					<div className="input-wrapper">
						<input type="text"
							placeholder="Mots clés (séparés par une virgule)"
							id="keywords" 
							value={keywords}
							onChange={(e) => setKeywords(e.target.value)}
						/>
					</div>

					{/* Grid for picture uploads */}
					<div className="grid-wrapper">
						{/* Generate 10 PictureWrapper components */}
						{Array.from({ length: 10 }).map((_map, i) => {
							return <PictureWrapper 
									key={i}
									ID={i}
									setPicture={setPicture}
									picture={picture}
								/>
						})}
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
