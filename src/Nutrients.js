
function Nutrients({label, quantity, unit}){
    return(
        <div key={label} className="info">
            <p><span className="label">{label}:</span>
             <span className="quantity">{quantity.toFixed()} {unit}</span></p>
             <hr></hr>
        </div>
    )
}

export default Nutrients;