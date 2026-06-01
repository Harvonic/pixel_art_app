import { Link } from "react-router-dom";
import ArtworkPreview from "./ArtworkPreview.jsx";

function ArtworkCard({ artwork }) {

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

    const editLinkStyle = {
        display: "inline-block",
        padding: "8px 12px",
        backgroundColor: "#222222",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "4px",
    };

    return (
        <article style={cardStyle}>
            <div style={previewFrameStyle}>
                <ArtworkPreview
                    width={artwork.width}
                    height={artwork.height}
                    pixels={artwork.pixels}
                />
                </div>

                <p>
                    Updated: {new Date(artwork.updatedAt).toLocaleString()}
                </p>

                <Link to={`/editor/${artwork.id}`} style={editLinkStyle}>
                    Edit
                </Link>
            
        </article>
    )
}

export default ArtworkCard;