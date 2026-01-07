import "../css/card.css";

function Cards({ passion, onClick, toggleLike }) {
	return (
		<div
			className={`card ${passion.hidden ? "hidden" : ""}`}
			onClick={onClick}
			style={{ cursor: "pointer" }}
		>
			<div className="card-header">
				<img
					src={"https://zkittygb.fr/projects/passionsHub/public/pictures/hobbies/" + passion.cover_picture}
					alt={passion.title}
				/>
			</div>

			<div className="card-content">
				<h2>{passion.title}</h2>
				<p>{passion.description}</p>

				<div className="card-meta-wrapper">
					<span className="card-category">{passion.categoryName}</span>
					<span
						className={`card-likes ${passion.liked ? "liked" : ""}`}
						onClick={(e) => {
							e.stopPropagation(); // empêcher l'ouverture du détail
							toggleLike(passion.ID);
						}}
					>
						<i className="fa-solid fa-thumbs-up"></i> {passion.likes}
					</span>
				</div>

				<p>by {passion.author.username}</p>
			</div>
		</div>
	);
}

export default Cards;
