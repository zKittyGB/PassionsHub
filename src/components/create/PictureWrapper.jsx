function PictureWrapper({ ID, picture, setPicture }) {

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const newPictures = [...picture];
		newPictures[ID] = file;

		setPicture(newPictures);
	};

	const currentPicture = picture[ID];

	return (
		<div className="picture-wrapper">
			<input
				type="file"
				id={`picture_${ID}`}
				name={`picture_${ID}`}
				accept="image/*"
				onChange={handleChange}
			/>

			<label htmlFor={`picture_${ID}`}>
				{/* Affiche l'icône si aucune image n'est sélectionnée */}
				{!currentPicture && <i className="fa-solid fa-camera"></i>}

				{/* Affiche la miniature */}
				{currentPicture && (
					<img
						src={URL.createObjectURL(currentPicture)}
						alt="photo"
						className="profile-picture"
					/>
				)}
			</label>
		</div>
	);
}

export default PictureWrapper;
