"use client";
import { useRouter } from 'next/navigation';

export default function AccountManager() {
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem("spotify_token");
        router.push("/");
    }

  return (
    <div>
      <h1>Account Manager</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}