import { useState } from "react";
import "../../css/HomeContent.css";

function Cards({ passion, onClick }) {
	return (
		<div
			className={`card ${passion.hidden ? "hidden" : ""}`}
			onClick={onClick} // ajout de l'event
			style={{ cursor: "pointer" }}
		>
			<div className="card-header">
				<img src={"../../pictures/" + passion.cover_picture} alt={passion.title} />
			</div>
			<div className="card-content">
				<h2>{passion.title}</h2>
				<p>{passion.description}</p>
				<div className="card-meta-wrapper">
					<span className="card-category">{passion.category}</span>
					<span className="card-likes"><i className="fa-solid fa-thumbs-up"></i> {passion.likes}</span>
				</div>
				<p>par {passion.author.username}</p>
			</div>
		</div>
	);
}

function HomeContent({ passions }) {
	const [selectedPassion, setSelectedPassion] = useState(null);

	const handleCardClick = (passion) => {
		setSelectedPassion(passion); // on sélectionne la carte cliquée
	};

	const handleBack = () => {
		setSelectedPassion(null); // revenir à l'affichage des cartes
	};

	return (
		<div className="home-content">
			{selectedPassion ? (
				<div className="card-detail">
					<div className="card-detail-header">
						<img src={"../../pictures/" + selectedPassion.cover_picture} alt={selectedPassion.title} />
						<i className="fa-solid fa-xmark close-detail" onClick={handleBack}></i>
					</div>
					<div className="card-detail-body">
						<div className="card-detail-title">
							<h2>{selectedPassion.title}</h2>
							<span className="card-likes"><i className="fa-solid fa-thumbs-up"></i> {selectedPassion.likes}</span>
						</div>

						<div className="card-detail-meta">
							<span className="card-category">{selectedPassion.category}</span>
						</div>
						<p className="card-detail-description">{selectedPassion.description}</p>

						<p>par {selectedPassion.author.username}</p>
					</div>
				</div>
			) : (
				passions.length > 0 ? (
					passions.map((passion) => (
						<Cards
							key={passion.id}
							passion={passion}
							onClick={() => handleCardClick(passion)}
						/>
					))
				) : (
					<p>Aucune passion à afficher</p>
				)
			)}
		</div>
	);
}

export default HomeContent;
