import React from "react";

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-2xl bg-green-600 p-4 w-42 min-h-12 rounded-xl text-white"
    >
      {children}
    </button>
  );
}

export default Button;
