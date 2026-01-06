import "../css/card.css";

// Component to render a single card
function Cards({ passion, onClick }) {
	return (
		<div
			className={`card ${passion.hidden ? "hidden" : ""}`}
			onClick={onClick} // Trigger the parent handler when clicked
			style={{ cursor: "pointer" }}
		>
			{/* Card image */}
			<div className="card-header">
				<img src={"https://zkittygb.fr/projects/passionsHub/public/pictures/hobbies/" + passion.cover_picture} alt={passion.title} />
			</div>

			{/* Card content: title, description, category, likes, and author */}
			<div className="card-content">
				<h2>{passion.title}</h2>
				<p>{passion.description}</p>

				{/* Meta information: category and likes */}
				<div className="card-meta-wrapper">
					<span className="card-category">{passion.categoryName}</span>
					<span className="card-likes">
						<i className="fa-solid fa-thumbs-up"></i> {passion.likes}
					</span>
				</div>

				{/* Author of the passion */}
				<p>by {passion.author.username}</p>
			</div>
		</div>
	);
}

export default Cards;