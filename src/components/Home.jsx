import "../css/Home.css"
import passionsData from "../data/passions.json";
import usersData from "../data/users.json";
import HomeContent from "./home/HomeContent.jsx";
function Home() {

	const passionsWithAuthors = passionsData.map((passion) => {
		const author = usersData.find((user) => user.id === passion.author_id);
		return {
			...passion,
			author: author || null,
		};
	});

	return (
		<>
			<div className="home">
				<div className="home-header">

					<div className="input-wrapper">
						<input id="search" type="text" placeholder="Rechercher par mots-clés" />
					</div>

					<div className="select-wrapper">
						<select className="select filled" defaultValue="">
							<option value="" disabled hidden>Catégories</option>
							<option>Loisirs</option>
							<option>Sport</option>
							<option>Musique</option>
						</select>

						<i className="fa-solid fa-chevron-down select-icon"></i>
					</div>

					<div className="btn-wrapper">
						<button className="btn filled">En vedette</button>
					</div>

				</div>

				<HomeContent passions={passionsWithAuthors} />
			</div>
		</>
	);

}

export default Home
