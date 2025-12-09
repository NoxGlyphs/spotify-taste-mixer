import Image from "next/image"

export default function ItemList({ items, emptyMsg, title="" }) {
    return (
        <div>
            {title && <h2>{title}</h2>}
            {(!items || items.length === 0) ? (
                <p>{emptyMsg || "No items to display."}</p>
            ) : (
                <ul className="flex">
                    {items.map((item) => (
                        <li key={item.id || item.uri}>
                            <img src={item.images?.[0]?.url}
                                className="w-[160px] h-[160px]"
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
