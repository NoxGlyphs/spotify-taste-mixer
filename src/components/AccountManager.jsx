"use client";
import { useRouter } from 'next/navigation';
import { spotifySecureFetch } from "@/lib/spotify";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logout, getSpotifyAuthUrl } from '@/lib/auth'; // tu fichero de auth

export default function AccountManager() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await spotifySecureFetch("/me");
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  function handleLogout() {
    logout(); // Borra localStorage
    window.location.href = "https://www.spotify.com/logout/"; // cerrar sesión en Spotify
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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-[rgb(var(--color-bg))] border-2 rounded-lg z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >

          <h3 className='font-semibold text-xl'>Account data:</h3>
          <p>Name: {profile?.display_name || "Loading..."}</p>
          <p>Email: {profile?.email || "Loading..."}</p>

          <div className='flex justify-between mt-4'>
            <button className='underline cursor-pointer' onClick={handleLogout}>
              Log out
            </button>
            <button className='underline cursor-pointer' onClick={handleBackgroundClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
