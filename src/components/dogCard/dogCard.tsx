import styles from "./dogCard.module.scss";

interface IDogCardProps {
  imageUrl: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export const DogCard = ({
  imageUrl,
  onClick,
  isHighlighted,
}: IDogCardProps) => {
  const dogName = imageUrl.split("/")[4] || "Unknown Dog";

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={styles.card}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={
        {
          "--cursor": isHighlighted ? "default" : "pointer",
          "--fontSize": isHighlighted ? "2rem" : "0.7rem",
          "--aspectRatio": isHighlighted ? "16 / 9" : "1 / 1",
          "--imageHeight": isHighlighted ? "auto" : "100%",
        } as React.CSSProperties
      }
    >
      <img
        src={imageUrl}
        alt={`${dogName} dog`}
        className={styles.fullImage}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <h3 className={styles.title}>{dogName}</h3>
      </div>
    </article>
  );
};
