import React from "react";

// added loading component from DaisyUI
// https://daisyui.com/components/loading/

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
};

export default Loading;
