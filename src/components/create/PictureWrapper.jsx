function PictureWrapper({ ID, pictures, setPictures, setErrors }) {
	const currentPicture = pictures[ID];

	return (
		<div className="picture-wrapper">
			<input
				type="file"
				id={`picture_${ID}`}
				name={`picture_${ID}`}
				accept="image/*"
				onChange={(e) => {
					setPictures(prev => {
						const copy = [...prev];
						copy[ID] = e.target.files[0];
						return copy.filter(Boolean);
					});
					setErrors(prev => ({ ...prev, pictures: [] }));
				}}
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
