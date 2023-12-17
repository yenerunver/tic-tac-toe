import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>List of online users:</p>
      <ul>
        <li>
          user3298932 <Link href="/game/">Play</Link>
        </li>
        <li>
          user2989323 <Link href="/game/">Play</Link>
        </li>
      </ul>
    </>
  );
}
