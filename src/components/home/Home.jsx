import { useState, useEffect } from "react";
import "../../css/Home.css";
import HomeContent from "./HomeContent.jsx";
import useUser from "../../context/useUser.js";
import CategoriesSelect from "../CategoriesSelect.jsx";

// Component to display the home page with search, categories, and passions
function Home() {
	// State for search input
	const [searchTerm, setSearchTerm] = useState("");
	// State for selected category
	const [selectedCategory, setSelectedCategory] = useState("");
	// State for all passions
	const [passions, setPassions] = useState([]);
	// Access current user from context
	const { user } = useUser();

	// Fetch passions from backend
	useEffect(() => {
		const formData = new FormData();
		formData.append("userID", 0);

		fetch("https://zkittygb.fr/projects/passionsHub/backend/getPassions.php", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				// Make sure data is an array before setting state
				if (Array.isArray(data)) {
					setPassions(data);
				} else {
					setPassions([]);
					console.error("Les données reçues ne sont pas un tableau :", data);
				}
			})
			.catch(err => console.error("Erreur fetching passions:", err));
	}, [user]);

	// Filter passions based on search term and selected category
	const filteredPassions = passions.map((passion) => {
		const term = searchTerm.toLowerCase();

		// Ensure keywords and category exist
		const keywords = passion.keywords || [];
		const category = passion.categoryName || passion.category || "";

		// Check if passion matches search term
		const matchesSearch =
			term === "" ||
			passion.title.toLowerCase().includes(term) ||
			category.toLowerCase().includes(term) ||
			keywords.some((tag) => tag.toLowerCase().includes(term));

		// Check if passion matches selected category
		const matchesCategory =
			selectedCategory === "" ||
			category.toLowerCase() === selectedCategory.toLowerCase();

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
