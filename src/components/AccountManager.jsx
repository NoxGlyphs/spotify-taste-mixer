"use client";
import { useRouter } from 'next/navigation';
import { spotifySecureFetch } from "@/lib/spotify"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/AccountManager.module.css';


export default function AccountManager() {
  const router = useRouter();
  const [profile, setProfile] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const data = await spotifySecureFetch("/me");
      setProfile(data);
    }
    fetchProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("spotify_token");
    router.push("/");
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleBackgroundClick() {
    setIsOpen(false);
  }

  return (
    <div>
      <div onClick={toggleMenu} className='flex items-center gap-3 cursor-pointer'>
        <Image
          src={profile?.images?.[1]?.url || "/default-pfp.jpg"}
          alt="Profile Picture"
          width={32}
          height={32}
          className='rounded-full'
        />
        <span className='text-xl font-semibold text-[rgba(var(--color-fg),0.8)]'>{profile?.display_name}</span>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0"
          onClick={handleBackgroundClick}
        >
          <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
            <p>Name: {profile?.display_name || "Loading..."}</p>
            <p>Email: {profile?.email || "Loading..."}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      )}
    </div>
  );
}