

function SelectDebris(props) {
    return (
      <div
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          borderTopStyle: "solid",
          borderTopColor: "gray",
          borderTopWidth: "0.25px",
          borderBottomWidth: "0.25px",
          borderBottomStyle: "solid",
          borderBottomColor: "gray",
          borderRight: "none",
          borderLeft: "none",
        }}
      >
        <input
          type="radio"
          checked={props.selected===props.name}
          style={{
            outline: "none",
            border: "none",
            height: "13px",
            width: "13px",
            verticalAlign: "middle",
            backgroundColor: "green",
          }}
          name="select_type"
          value={props.name}
          onClick={
            ()=>{
              if(props.selected===props.name){
                props.updateSelected(null);
              }
              else{
                props.updateSelected(props.name);
              }
            }
          }
          onChange={
            ()=>{}
          }
        />
        <div style={{ width: "5px" }} />
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "monospace",
            fontSize: "16px",
          }}
        >
          {props.name}
        </div>
      </div>
    );
  }
  
  export default SelectDebris;
  