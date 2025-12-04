import { useState, useEffect } from "react";

// Component to display a category select dropdown
function CategoriesSelect({ selectedCategory, setSelectedCategory }) {
	// State to store fetched categories
	const [categories, setCategories] = useState([]);

	// Fetch categories from backend on component mount
	useEffect(() => {
		fetch("https://zkittygb.fr/projects/passionsHub/backend/getCategories.php")
			.then((res) => res.json())
			.then((data) => {
				// Update state with fetched categories
				setCategories(data);
			});
	}, []);

	return (
		<div className="select-wrapper">
			{/* Select dropdown for categories */}
			<select
				className="filled"
				value={selectedCategory}
				onChange={(e) => {
					// Update the selected category if setter exists
					if (setSelectedCategory) {
						setSelectedCategory(e.target.value);
					}
				}}
			>
				{/* Display 'Toutes les catégories' option conditionally */}
				{setSelectedCategory && <option value="">Toutes les catégories</option>}
				{!setSelectedCategory && <option value="" hidden>Toutes les catégories</option>}

				{/* Loop through category groups and items */}
				{Object.entries(categories).map(([groupName, items]) => (
					<optgroup label={groupName} key={groupName}>
						{items.map((cat) => (
							<option key={cat.ID} value={cat.name}>
								{/* Display category name */}
								{cat.name}
							</option>
						))}
					</optgroup>
				))}
			</select>

			{/* Icon for custom dropdown */}
			<i className="fa-solid fa-chevron-down select-icon"></i>
		</div>
	);
}

export default CategoriesSelect;
