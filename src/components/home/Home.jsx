import { useState, useEffect } from "react";
import "../../css/Home.css";
import HomeContent from "./HomeContent.jsx";
import useUser from "../../context/useUser.js";
import CategoriesSelect from "../CategoriesSelect.jsx";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [passions, setPassions] = useState([]);
	const [showFavorites, setShowFavorites] = useState(false);

	const { user } = useUser();

	// Fetch passions
	useEffect(() => {
		const formData = new FormData();
		formData.append("userID", user?.ID ?? 0);

		fetch("https://zkittygb.fr/projects/passionsHub/backend/getPassions.php", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data)) {
					setPassions(data);
				} else {
					setPassions([]);
					console.error("Les données reçues ne sont pas un tableau :", data);
				}
			})
			.catch(err => console.error("Erreur fetching passions:", err));
	}, [user]);

	// Filter passions based on search, category, and favorites
	const filteredPassions = passions
		.map((passion) => {
			const term = searchTerm.toLowerCase();
			const keywords = passion.keywords || [];
			const category = passion.categoryName || "";
			const categoryID = passion.categoryID || "";

			const matchesSearch =
				term === "" ||
				passion.title.toLowerCase().includes(term) ||
				category.toLowerCase().includes(term) ||
				keywords.some(tag => tag.toLowerCase().includes(term));

			const matchesCategory =
				selectedCategory === "" || categoryID === parseInt(selectedCategory);

			const matchesFavorites = !showFavorites || passion.liked;

			return {
				...passion,
				hidden: !(matchesSearch && matchesCategory && matchesFavorites)
			};
		});

	return (
		<div className="home">
			<div className="home-header">
				<div className="input-wrapper">
					<input
						id="search"
						type="text"
						value={searchTerm}
						placeholder="Rechercher par mots-clés"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<CategoriesSelect
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>

				{user && (
					<div className="btn-wrapper">
						<button
							className={`btn filled ${showFavorites ? "active" : ""}`}
							onClick={() => setShowFavorites(prev => !prev)}
						>
							Mes favoris
						</button>
					</div>
				)}
			</div>

			<HomeContent passions={filteredPassions} />
		</div>
	);
}

export default Home;
