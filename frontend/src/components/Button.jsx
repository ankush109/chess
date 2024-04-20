import React from "react";

function Button({ onclick, children }) {
  return (
    <button
      onClick={onclick}
      className="text-2xl bg-green-600 p-4 w-42 min-h-12 rounded-xl text-white"
    >
      {children}
    </button>
  );
}

export default Button;
