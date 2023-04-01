import React, { useContext } from "react";
import { InterfaceContext } from "../../context/InterfaceProvider";
import ObjectItem from "../objectComponent/ObjectItem";
import NonObjectItem from "../nonObjectComponent/NonObjectItem";
import "./Interface.scss";
import AddIcon from "@mui/icons-material/Add";

const Interface = () => {
  const { interfaceData, addData } = useContext(InterfaceContext);
  
  const addHandler = () => {
    addData("");
  };  
  return (
    <div className="interfaceWrapper">
      <div className="interfaceRoot">
        <p>Field name and type</p>
        <button onClick={addHandler}>
          <AddIcon />
        </button>
      </div>
      <div>
        {interfaceData.children.map((item) => {
          return item.type === "object" ? (
            <ObjectItem key={item.id} item={item} />
          ) : (
            <NonObjectItem key={item.id} item={item} />
          );
        })}
      </div>
    </div>
  );
};

export default Interface;
