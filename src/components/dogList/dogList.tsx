import { DogCard } from "../dogCard";
import styles from "./dogList.module.scss";

interface IDogListProps {
  images: string[];
  onDogClick?: (imageUrl: string) => void;
}

export const DogList = ({ images, onDogClick }: IDogListProps) => {
  return (
    <section>
      <ul className={styles.container}>
        {images.map((image) => (
          <li
            key={image}
            onClick={() => onDogClick?.(image)}
            className={styles.item}
          >
            <DogCard imageUrl={image} />
          </li>
        ))}
      </ul>
    </section>
  );
};
