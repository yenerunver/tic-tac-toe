"use client";

import type { ReactElement } from "react";
import React, { useState } from "react";
import type { NextPageWithLayout } from "./_app";

import Layout from "../components/layout";

const HomePage: NextPageWithLayout = () => {
  const [username, setUsername] = useState("");

  const handleInputChange = (event: React.FormEvent) =>
    setUsername((event.target as HTMLInputElement).value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    document.location.href = `/game?username=${username}`;
  };

  return (
    <form className="p-4 w-3/4 text-center" onSubmit={handleSubmit}>
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
          type="submit"
          className="bg-gradient-to-b from-white to-gray-300 font-medium p-2 text-black uppercase w-full"
        >
          Play
        </button>
      </div>
    </form>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
