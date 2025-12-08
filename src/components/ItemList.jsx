export default function ItemList({ items, emptyMsg }) {
    if (!items || items.length === 0) {
        return <p>{emptyMsg || "No items to display."}</p>;
    }

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id || item.uri}>
                    {item.name || item.title || "Unnamed Item"}
                </li>
            ))}
        </ul>
    );
}