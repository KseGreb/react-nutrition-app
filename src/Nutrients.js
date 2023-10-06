function Nutrients({label, quantity, unit}){
    return(
        <div>
            <p>{label}: {quantity.toFixed()} {unit}</p>
        </div>
    )
}

export default Nutrients;