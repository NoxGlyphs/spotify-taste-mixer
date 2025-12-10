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
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-10 justify-between pr-4">
                    {items.map((item) => (
                        <li key={item.id || item.uri}
                            onClick={() => {router.push(`/dashboard/playlist/${item.id}`)}}
                        >
                            <img src={item.images?.[0]?.url}
                                className="w-40 h-40 rounded-xl"
                            />
                            <h5>
                                {item.name || item.title || "Unnamed Item"}
                            </h5>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
