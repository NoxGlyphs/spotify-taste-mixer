'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import styles from '../styles/animations.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
      <div className='flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat' 
        style={{ backgroundImage: "url('/frutiger.png')" }}>
        <h1 className='mt-[36vh] font-extrabold text-6xl text-center'>Spotify<br/>Taste Mixer</h1>
        <div className={`${styles.rainbowLogInButton} mt-5 relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100`}>
            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur"
              onClick={handleLogin}>
                Log in
            </button>
        </div>
      </div>  
  );
}


