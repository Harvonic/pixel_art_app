
function ArtworkPreview({ width, height, pixels, pixelSize = 8 }) {

    const previewStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${width}, ${pixelSize}px)`,
        width: `${width * pixelSize}px`,
    };

    const pixelStyle = {
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
    }

    if (pixels.length !== width * height) {
        return <p>Invalid artwork data</p>;
    }

    return (
        <div style={previewStyle}>
            {pixels.map((pixel, index) => (
                <div
                    key={index}
                    style={{
                        ...pixelStyle,
                        backgroundColor: pixel || "#ffffff",
                    }}
                />
            ))}
        </div>
    );

}

export default ArtworkPreview;