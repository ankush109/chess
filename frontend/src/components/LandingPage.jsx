import React from "react";
import Chessboard from "./Chessboard";
import Button from "./Button";

function LandingPage() {
  return (
    <div className="flex justify-center">
      <div className="pt-9 w-full ">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 bg-red-500 w-full">
            <Chessboard />
          </div>
          <div className="col-span-2 bg-green-500 w-full">
            <div className="flex justify-center">
              {" "}
              <Button
                onclick={() => {
                  console.log("custom button ");
                }}
              >
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
