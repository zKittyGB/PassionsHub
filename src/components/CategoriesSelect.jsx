import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component to display a category select dropdown
function CategoriesSelect({ selectedCategory, setSelectedCategory, errors = [], setErrors, renderErrors = null }) {
	// State to store fetched categories
	const [categories, setCategories] = useState([]);
	const location = useLocation();

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
				id="categories"
				className="filled"
				value={selectedCategory}
				onChange={(e) => {
					setSelectedCategory(e.target.value);
					setErrors(prev => ({ ...prev, selectedCategory: [] }));
				}}
			>
				{/* Display 'Toutes les catégories' option conditionally */}
				{location.pathname !== "/create" && <option value="">Toutes les catégories</option>}
				{location.pathname === "/create" && <option value="" hidden>Toutes les catégories</option>}

				{/* Loop through category groups and items */}
				{Object.entries(categories).map(([groupName, items]) => (
					<optgroup label={groupName} key={groupName}>
						{items.map((cat) => (
							<option key={cat.ID} value={cat.ID}>
								{/* Display category name */}
								{cat.name}
							</option>
						))}
					</optgroup>
				))}
			</select>

			{/* Icon for custom dropdown */}
			<i className="fa-solid fa-chevron-down select-icon"></i>
			{(renderErrors  && errors.selectedCategory) && renderErrors(errors.selectedCategory)}
		</div>
	);
}

export default CategoriesSelect;
