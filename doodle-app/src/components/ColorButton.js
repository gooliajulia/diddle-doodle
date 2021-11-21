

const ColorButton = ({color}) => {
    const changeColor = (ev) => {
        console.log(ev.target.value)
    }
    return (
        <div>
            <button 
            style={{backgroundColor:`${color}`}}
            value={color}
            onClick={(ev) => changeColor(ev)}/>
        </div>
        
    )
}

export default ColorButton;