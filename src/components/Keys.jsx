import React from "react";

const Keys = (props) => {
  return (
    <button
      className={`key-c ${props.keyClass}`}
      onClick={() => props.handleClick(props.value, props.keyClass, props.type)}
    >
      {props.name}
    </button>
  );
};

export default Keys;
