import ArtworkPreview from "../artwork/ArtworkPreview.jsx";

function ProfilePostGridItem({ post }) {
  const tileSize = 160;

  const itemStyle = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    backgroundColor: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const maxArtworkPixels = Math.max(
    post.artwork.width,
    post.artwork.height
  );

  const pixelSize = Math.floor(tileSize / maxArtworkPixels);

  return (
    <article style={itemStyle}>
      <ArtworkPreview
        width={post.artwork.width}
        height={post.artwork.height}
        pixels={post.artwork.pixels}
        pixelSize={pixelSize}
      />
    </article>
  );
}

export default ProfilePostGridItem;