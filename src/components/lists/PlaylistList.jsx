"use client"
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function PlaylistList({ items }) {
    const router = useRouter();

    return (
        <div>
            {(!items || items.length === 0) ? (
                <p>{"No playlists in here."}</p>
            ) : (
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-10 gap-y-6 justify-between pr-4">
                    {items.map((item) => (
                        <li key={item.id || item.uri}
                            className="w-40 cursor-pointer text-center"
                            onClick={() => {router.push(`/dashboard/playlist/${item.id}`)}}
                        >
                            <img src={item.images?.[0]?.url}
                                className="w-40 h-40 rounded-xl border-1 border-[rgb(var(--color-border))] mb-1 object-cover shadow-sm/30"
                            />
                            <h5 className="font-semibold  truncate">
                                {item.name || item.title || "Unnamed Item"}
                            </h5>
                            <span className="text-[rgb(var(--color-fg),0.4)]">{item.tracks.total} tracks</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
