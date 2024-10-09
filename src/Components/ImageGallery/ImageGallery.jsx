import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css"
import { nanoid } from "nanoid/non-secure";

const ImageGallery = ({ images, onElementClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
          <li key={nanoid()} onClick={() => { onElementClick(image) }}>
          <ImageCard imageSrc={image.urls.small} imageAlt={image.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery