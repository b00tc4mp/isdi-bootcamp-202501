function Warship({ x, y, boxes }) {
    return <div className="warship" style={{ left: `${x}px`, top: `${y}px` }}>
        <img className="warship-image" src="images/warship.png" />
        {boxes.map((box, index) => <div className={`warship-detection-box-${index + 1}`} style={{ left: box.x, top: box.y, width: box.width, height: box.height }}></div>)
        }
    </div>
}