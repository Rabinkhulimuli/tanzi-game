export default function Components(props){
    // eslint-disable-next-line react/prop-types
    const styles={backgroundColor:props.held? props.error? "red":"yellow" : "white" }
    function el(){
        // eslint-disable-next-line react/prop-types
        if (props.value===1){
            return "I"
        }
        else if(props.value==2){
            return "II"
        }
        else if(props.value===3){
            return "III"
        }
        else if(props.value===4){
            return "IV"
        }
        else if (props.value===5){
            return "V"
        }
        else{
            return "VI"
        }
    }
    return(
        // eslint-disable-next-line react/prop-types
        <div  className="dice-box" style={styles} onClick={props.handle} ><h2 className="in-h2">{el()}</h2></div>

    )
}