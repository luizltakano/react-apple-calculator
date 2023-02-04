import React from "react";

const Display = (props) => {
  const display = String(props.display);
  return (
    <div className="display">
      <p>{display}</p>
    </div>
  );
};

export default Display;
