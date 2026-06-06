import ArtworkPreview from "../artwork/ArtworkPreview.jsx";
import { Link } from "react-router-dom";

function PostFeedCard({ post }) {
  const cardStyle = {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#ffffff",
    border: "1px solid #dddddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "24px",
  };

  const headerStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid #eeeeee",
    fontWeight: "bold",
  };

  const artworkFrameStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "16px",
  };

  const bodyStyle = {
    padding: "12px 16px",
  };

  return (
    <article style={cardStyle}>
      <Link to={`/users/${post.author.username}`}>
        @{post.author.username}
      </Link>

      <div style={artworkFrameStyle}>
        <ArtworkPreview
          width={post.artwork.width}
          height={post.artwork.height}
          pixels={post.artwork.pixels}
          pixelSize={16}
        />
      </div>

      <div style={bodyStyle}>
        {post.caption && <p>{post.caption}</p>}
        <p>{new Date(post.publishedAt).toLocaleString()}</p>
      </div>
    </article>
  );
}

export default PostFeedCard;