"use client";

import type { ReactElement } from "react";
import React, { useState } from "react";

import Layout from "@/components/layout";
import LoginPage from "@/components/login";
import GamePage from "@/components/game";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const [username, setUsername] = useState("");

  return (
    <>
      {!username && (
        <LoginPage username={username} onUsernameChange={setUsername} />
      )}
      {username && (
        <GamePage username={username} onUsernameChange={setUsername} />
      )}
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
