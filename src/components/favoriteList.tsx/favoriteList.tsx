import { DogCard } from "../dogCard";
import styles from "./favoriteList.module.scss";

interface IFavoritesListProps {
  favorites: string[];
  onRemove: (url: string) => void;
  onSelect: (url: string) => void;
}

export const FavoritesList = ({
  favorites,
  onRemove,
  onSelect,
}: IFavoritesListProps) => {
  if (favorites.length === 0) {
    return <h2 className={styles.empty}>No favorites</h2>;
  }

  return (
    <aside className={styles.sidebar}>
      <h2>My Favorites ({favorites.length})</h2>
      <ul className={styles.list}>
        {favorites.map((url) => (
          <li key={url} className={styles.item}>
            <div className={styles.thumbWrapper} onClick={() => onSelect(url)}>
              <DogCard imageUrl={url} />
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => onRemove(url)}
              aria-label="Remove from favorites"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
