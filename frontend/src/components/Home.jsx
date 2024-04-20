import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center  items-center h-screen">
        <div className="flex justify-center ">
          <img
            className="w-[800px] "
            src="https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/12/02200410/benefits-of-playing-chess-01-scaled.jpg"
          />
        </div>
        <div className="m-20 ">
          <div>
            <h1 className="text-white text-2xl m-3 font-bold">
              Play chess online on the #3 platform
            </h1>
          </div>
          <button
            onClick={() => navigate("/chess")}
            className="text-2xl bg-green-600 p-4 w-42 min-h-12 rounded-xl text-white"
          >
            Play Online
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
