import { useState, useEffect } from "react";
import "../../css/HomeContent.css";
import Cards from "../Cards.jsx";

// Component to render the list of passions or a detailed view
function HomeContent({ passions }) {
	const [selectedPassion, setSelectedPassion] = useState(null); // State for the currently selected passion

	// Handle click on a card: show detail view
	const handleCardClick = (passion) => {
		setSelectedPassion(passion);
	};

	// Handle closing the detail view: return to cards grid
	const handleBack = () => {
		setSelectedPassion(null);
	};

	// Close detail view when pressing Escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && selectedPassion) {
				handleBack();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedPassion]);

	return (
		<div className="home-content">
			{selectedPassion ? (
				// Detail view for the selected passion
				<div className="card-detail">
					<div className="card-detail-header">
						<img src={"https://zkittygb.fr/projects/passionsHub/public/pictures/hobbies/" + selectedPassion.cover_picture} alt={selectedPassion.title} />
						{/* Close button (FontAwesome X) */}
						<i className="fa-solid fa-xmark close-detail" onClick={handleBack}></i>
					</div>

					<div className="card-detail-body">
						{/* Title and likes */}
						<div className="card-detail-title">
							<h2>{selectedPassion.title}</h2>
							<span className="card-likes">
								<i className="fa-solid fa-thumbs-up"></i> {selectedPassion.likes}
							</span>
						</div>

						{/* Category */}
						<div className="card-detail-meta">
							<span className="card-category">{selectedPassion.categoryName}</span>
						</div>

						{/* Description */}
						<p className="card-detail-description">{selectedPassion.description}</p>

						{/* Author */}
						<p>by {selectedPassion.author.username}</p>
					</div>
				</div>
			) : (
				// Grid of all passions
				passions.length > 0 ? (
					passions.map((passion) => (
						<Cards
							key={passion.ID}
							passion={passion}
							onClick={() => handleCardClick(passion)}
						/>
					))
				) : (
					// Fallback message if there are no passions
					<p>No passions to display</p>
				)
			)}
		</div>
	);
}

export default HomeContent;
