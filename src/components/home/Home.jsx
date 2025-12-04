import { useState } from "react";
import "../../css/Home.css";
import passionsData from "../../data/passions.json";
import usersData from "../../data/users.json";
import HomeContent from "./HomeContent.jsx";
import useUser from "../../context/useUser.js";
import CategoriesSelect from "../CategoriesSelect.jsx";

// Component to display the home page with search, categories, and passions
function Home() {
	// State for search input
	const [searchTerm, setSearchTerm] = useState("");
	// State for selected category
	const [selectedCategory, setSelectedCategory] = useState("");
	// Access current user from context
	const { user } = useUser();

	// Merge passions data with author info
	const passionsWithAuthors = passionsData.map((passion) => {
		const author = usersData.find((user) => user.id === passion.author_id);
		return {
			...passion,
			author: author || null,
		};
	});

	// Filter passions based on search term and selected category
	const filteredPassions = passionsWithAuthors.map((passion) => {
		const term = searchTerm.toLowerCase();

		// Check if passion matches search term
		const matchesSearch =
			term === "" ||
			passion.title.toLowerCase().includes(term) ||
			passion.category.toLowerCase().includes(term) ||
			passion.tags.some((tag) => tag.toLowerCase().includes(term));

		// Check if passion matches selected category
		const matchesCategory =
			selectedCategory === "" ||
			passion.category.toLowerCase() === selectedCategory.toLowerCase();

		// Add hidden flag if it doesn't match search or category
		return {
			...passion,
			hidden: !matchesSearch || !matchesCategory,
		};
	});

	return (
		<>
			<div className="home">
				{/* Header section with search and category select */}
				<div className="home-header">

					{/* Search input for keywords */}
					<div className="input-wrapper">
						<input
							id="search"
							type="text"
							value={searchTerm}
							placeholder="Rechercher par mots-clés"
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{/* Category select dropdown */}
					<CategoriesSelect
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>

					{/* Display "Mes favoris" button if user is logged in */}
					{user &&
						<div className="btn-wrapper">
							<button className="btn filled">Mes favoris</button>
						</div>
					}

				</div>

				{/* Render filtered passions */}
				<HomeContent passions={filteredPassions} />
			</div>
		</>
	);
}

export default Home;
