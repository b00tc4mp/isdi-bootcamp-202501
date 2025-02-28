function Kamikaze({ x, y, boxes }) {
    return <div className="kamikaze" style={{ left: `${x}px`, top: `${y}px` }}>
        <img className="kamikaze-image" src="images/kamikaze.png" />
        {boxes.map((box, index) => <div className={`kamikaze-detection-box-${index + 1}`} style={{ left: box.x, top: box.y, width: box.width, height: box.height }}></div>)
        }
    </div >
}