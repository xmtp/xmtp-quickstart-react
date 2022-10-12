import React from "react";

const BackButton = ({ reset }) => {
  return (
    <div
      onClick={reset}
      className="flex back-chevron justify-center"
    >
      &#8249;
    </div>
  );
};

export default BackButton;
