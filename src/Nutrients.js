
function Nutrients({label, quantity, unit, index}){
    return(
        <div key={index}>
            <p> {label}: {quantity.toFixed()} {unit}</p>
        </div>
    )
}

export default Nutrients;