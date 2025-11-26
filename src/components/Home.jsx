import "../css/Home.css"

function Home() {

	return (
		<>
			<div className="home">
				<div className="home-header">

					<div className="input-wrapper">
						<input
							id="search"
							type="text"
							placeholder="Rechercher par mots-clés"
						/>
					</div>

					<div className="select-wrapper">
						<select className="select filled" defaultValue="">
							<option value="" disabled hidden>
								Catégories
							</option>
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
			</div>
		</>
	);

}

export default Home
