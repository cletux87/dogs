import { useState, useMemo } from "react";
import { DogCard } from "./components/dogCard";
import { DogList } from "./components/dogList";
import { useGetRandomDogs } from "./hooks/useGetRandomDogs";
import { FavoritesList } from "./components/favoriteList.tsx";
import styles from "./app.module.scss";

function App() {
  const { data, loading, error } = useGetRandomDogs(11);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedHighlightedPicture, setSelectedHighlightedPicture] = useState<
    string | null
  >(null);
  const apiMainDog = data?.[0];
  const activeMainDog = selectedHighlightedPicture || apiMainDog || "";
  const gridDogs = useMemo(() => data?.slice(1, 11) ?? [], [data]);

  const addToFavorites = () => {
    if (activeMainDog && !favorites.includes(activeMainDog)) {
      setFavorites((prev) => [...prev, activeMainDog]);
    }
  };

  const removeFromFavorites = (urlToRemove: string) => {
    setFavorites((prev) => prev.filter((url) => url !== urlToRemove));
    if (selectedHighlightedPicture === urlToRemove) {
      setSelectedHighlightedPicture(null);
    }
  };

  if (loading && !data) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) return <div>Error!</div>;

  const isCurrentFavorite = favorites.includes(activeMainDog);

  return (
    <div className={styles.root}>
      <h1 className={styles.mainTitle}>Dog App</h1>

      <div className={styles.columnsContainer}>
        <div className={styles.leftColumn}>
          <section className={styles.dogSection}>
            <div className={styles.positionRelative}>
              <DogCard imageUrl={activeMainDog} isHighlighted />
              <div className={styles.buttonContainer}>
                <button
                  onClick={addToFavorites}
                  disabled={isCurrentFavorite}
                  className={styles.favoriteButton}
                  style={
                    {
                      "--button-fav-bg": isCurrentFavorite ? "#ccc" : "#e91e63",
                      "--button-fav-cursor": isCurrentFavorite
                        ? "default"
                        : "pointer",
                    } as React.CSSProperties
                  }
                >
                  {isCurrentFavorite
                    ? "❤️ Already in favorites"
                    : "🤍 Add to favorites"}
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className={styles.moreDogsTitle}>More dogs</h2>
            <DogList
              images={gridDogs}
              onDogClick={(url) => setSelectedHighlightedPicture(url)}
            />
          </section>
        </div>

        <FavoritesList
          favorites={favorites}
          onRemove={removeFromFavorites}
          onSelect={setSelectedHighlightedPicture}
        />
      </div>
    </div>
  );
}

export default App;
