import { useState } from "react";
import "../css/Home.css";
import passionsData from "../data/passions.json";
import usersData from "../data/users.json";
import HomeContent from "./home/HomeContent.jsx";
import useUser from "../context/useUser.js";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const { user } = useUser();

	const passionsWithAuthors = passionsData.map((passion) => {
		const author = usersData.find((user) => user.id === passion.author_id);
		return {
			...passion,
			author: author || null,
		};
	});

	const filteredPassions = passionsWithAuthors.map((passion) => {
		const term = searchTerm.toLowerCase();

		const matchesSearch =
			term === "" ||
			passion.title.toLowerCase().includes(term) ||
			passion.category.toLowerCase().includes(term) ||
			passion.tags.some((tag) => tag.toLowerCase().includes(term));

		const matchesCategory =
			selectedCategory === "" ||
			passion.category.toLowerCase() === selectedCategory.toLowerCase();

		return {
			...passion,
			hidden: !matchesSearch || !matchesCategory,
		};
	});

	return (
		<>
			<div className="home">
				<div className="home-header">

					<div className="input-wrapper">
						<input id="search" type="text" value={searchTerm} placeholder="Rechercher par mots-clés" onChange={(e) => setSearchTerm(e.target.value)} />
					</div>

					<div className="select-wrapper">
						<select
							className="select filled"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							<option value="">Toutes les catégories</option>
							<option value="Art">Art</option>
							<option value="Musique">Musique</option>
							<option value="Sport">Sport</option>
							<option value="Voyage">Voyage</option>
						</select>

						<i className="fa-solid fa-chevron-down select-icon"></i>
					</div>

					{user && 
						<>
							<div className="btn-wrapper">
								<button className="btn filled">Mes favoris</button>
							</div>
						</>
					}

				</div>

				<HomeContent passions={filteredPassions} />
			</div>
		</>
	);
}

export default Home;
