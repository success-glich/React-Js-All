import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
function Github() {
  //   const [user, setUser] = useState({});
  //   useEffect(() => {
  //     fetch("https://api.github.com/users/success-glich")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data);
  //       });
  //   }, []);

  const user = useLoaderData();
  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
      Github Followers:{user && user?.followers}
      <img
        className="flex items-center self-center"
        src={user && user?.avatar_url}
        alt="git picture"
        width={300}
      />
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const res = await fetch("https://api.github.com/users/success-glich");
  return res.json();
};
