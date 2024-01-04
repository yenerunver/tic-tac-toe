"use client";

import type { ReactElement } from "react";
import React, { useState } from "react";

const LoginPage = ({
  username,
  onUsernameChange,
}: {
  username: string;
  onUsernameChange: Function;
}): ReactElement => {
  const [usernameTmp, setUsernameTmp] = useState("");

  const handleInputChange = (event: React.FormEvent) =>
    setUsernameTmp((event.target as HTMLInputElement).value);

  const handleClick = () => {
    if (usernameTmp) {
      onUsernameChange(usernameTmp);
    }
  };

  if (username) return {} as ReactElement;

  return (
    <div className="p-4 w-3/4 text-center">
      <p className="flex flex-grow mb-4">Enter your username to play:</p>
      <div className="flex flex-grow mb-4">
        <input
          type="text"
          id="username"
          required
          onChange={handleInputChange}
          className="bg-gray-200 pl-2 py-2 md:py-4 focus:outline-none w-full text-black"
          placeholder="Username"
        />
      </div>
      <div className="flex flex-grow mb-4">
        <button
          type="button"
          onClick={handleClick}
          className="bg-gradient-to-b from-white to-gray-300 font-medium p-2 text-black uppercase w-full"
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
