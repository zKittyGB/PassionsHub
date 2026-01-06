import { useState, useEffect, useRef } from "react";
import Cards from "./Cards.jsx";
import "../css/MyPassions.css";

function PassionsView({ items }) {
	const [selectedPassion, setSelectedPassion] = useState(null);
	const detailRef = useRef(null);

	const handleCardClick = (passion) => setSelectedPassion(passion);
	const handleBack = () => setSelectedPassion(null);

	// Close detail on Escape
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && selectedPassion) handleBack();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedPassion]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (selectedPassion && detailRef.current && !detailRef.current.contains(e.target)) {
				handleBack();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [selectedPassion]);

	return (
		<div className="passions-view">
			{console.log(selectedPassion)}

			{selectedPassion ? (
				<div className="card-detail" ref={detailRef}>
					<div className="card-detail-header">
						<img
							src={`https://zkittygb.fr/projects/passionsHub/public/pictures/hobbies/${selectedPassion.cover_picture}`}
							alt={selectedPassion.title}
						/>
						<i className="fa-solid fa-xmark close-detail" onClick={handleBack}></i>
					</div>

					<div className="card-detail-body">
						<div className="card-detail-title">
							<h2>{selectedPassion.title}</h2>
							<span className="card-likes">
								<i className="fa-solid fa-thumbs-up"></i> {selectedPassion.likes}
							</span>
						</div>

						<div className="card-detail-meta">
							<span className="card-category">{selectedPassion["categoryName"]}</span>
						</div>

						<p className="card-detail-description">{selectedPassion.description}</p>

						{selectedPassion.pictures?.length > 1 && (
							<div className="card-lightbox">
								{selectedPassion.pictures.map((pic, i) => (
									<img
										key={i}
										src={`https://zkittygb.fr/projects/passionsHub/public/pictures/hobbies/${pic}`}
										alt={`${selectedPassion.title} ${i + 1}`}
										style={{ animationDelay: `${(i * 15) / selectedPassion.pictures.length}s` }}
									/>
								))}
							</div>
						)}

						<p className="card-details-author">by {selectedPassion.author.username}</p>
					</div>
				</div>
			) : (
				items.length > 0 ? (
					items.map((passion) => (
						<Cards
							key={passion.ID}
							passion={passion}
							onClick={() => handleCardClick(passion)}
						/>
					))
				) : (
					<p>No passions to display</p>
				)
			)}
		</div>
	);
}

export default PassionsView;
