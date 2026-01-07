import { useState, useEffect, useRef } from "react";
import Cards from "./Cards.jsx";
import "../css/MyPassions.css";
import useUser from "../context/useUser.js";
import { useNavigate } from "react-router-dom";

function PassionsView({ items }) {
	const [selectedPassion, setSelectedPassion] = useState(null);
	const [passions, setPassions] = useState(items);
	const detailRef = useRef(null);

	const { user } = useUser();
	const navigate = useNavigate();

	const handleCardClick = (passion) => setSelectedPassion(passion);
	const handleBack = () => setSelectedPassion(null);

	useEffect(() => {
		setPassions(items);
	}, [items]);


	// Close detail on Escape
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && selectedPassion) handleBack();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedPassion]);

	// Close detail on click outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (selectedPassion && detailRef.current && !detailRef.current.contains(e.target)) {
				handleBack();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [selectedPassion]);

	// Toggle likes
	const toggleLike = async (passionID) => {
		if (!user?.ID) {
			navigate("/login");
			return;
		}

		const passion = passions.find(p => p.ID === passionID);
		if (!passion) return;

		const formData = new FormData();
		formData.append("userID", user.ID);
		formData.append("passionID", passionID);

		try {
			const res = await fetch(
				"https://zkittygb.fr/projects/passionsHub/backend/likePassion.php",
				{ method: "POST", body: formData }
			);
			const data = await res.json();

			if (data.success) {
				const isRemoved = data.action === "removed";

				// Mettre à jour passions et liked
				setPassions(prev =>
					prev.map(p =>
						p.ID === passionID
							? {
								...p,
								likes: isRemoved ? p.likes - 1 : p.likes + 1,
								liked: !isRemoved  // true si added, false si removed
							}
							: p
					)
				);

				// Mettre à jour selectedPassion si ouvert
				if (selectedPassion?.ID === passionID) {
					setSelectedPassion(prev => ({
						...prev,
						likes: isRemoved ? prev.likes - 1 : prev.likes + 1,
						liked: !isRemoved
					}));
				}
			}
		} catch (err) {
			console.error("Erreur like passion:", err);
		}
	};

	return (
		<div className="passions-view">
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
							<span
								className={`card-likes ${selectedPassion.liked ? "liked" : ""}`}
								onClick={() => toggleLike(selectedPassion.ID)}
							>
								<i className="fa-solid fa-thumbs-up"></i> {selectedPassion.likes}
							</span>
						</div>

						<div className="card-detail-meta">
							<span className="card-category">{selectedPassion.categoryName}</span>
						</div>

						<p className="card-detail-description">{selectedPassion.description}</p>

						{selectedPassion.pictures?.length > 1 && (
							<div className="card-lightbox">
								{selectedPassion.pictures.map((pic, i) => (
									<img
										key={i}
										src={`https://zkittygb.fr/projects/passionsHub/public/pictures/hobbies/${pic}`}
										alt={`${selectedPassion.title} ${i + 1}`}
										style={{
											animationDelay: `${i * 5}s`,
											animationDuration: `${selectedPassion.pictures.length * 5}s`
										}}
									/>
								))}
							</div>
						)}

						<p className="card-details-author">by {selectedPassion.author.username}</p>
					</div>
				</div>
			) : (
				passions.length > 0 ? (
					passions.map((passion) => (
						<Cards
							key={passion.ID}
							passion={passion}
							onClick={() => handleCardClick(passion)}
							toggleLike={toggleLike} // 🌟
						/>
					))
				) : (
					<p>Aucune passion à afficher</p>
				)
			)}
		</div>
	);
}

export default PassionsView;
