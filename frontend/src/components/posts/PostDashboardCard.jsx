import ArtworkPreview from "../artwork/ArtworkPreview.jsx";

function PostDashboardCard({ post }) {
  const cardStyle = {
    width: "240px",
    backgroundColor: "#ffffff",
    border: "1px solid #dddddd",
    borderRadius: "8px",
    padding: "12px",
  };

  const previewFrameStyle = {
    width: "100%",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    overflow: "hidden",
  };

  return (
    <article style={cardStyle}>
      <div style={previewFrameStyle}>
        <ArtworkPreview
          width={post.artwork.width}
          height={post.artwork.height}
          pixels={post.artwork.pixels}
        />
      </div>

      {post.caption && <p>{post.caption}</p>}

      <p>
        Published: {new Date(post.publishedAt).toLocaleString()}
      </p>
    </article>
  );
}

export default PostDashboardCard;