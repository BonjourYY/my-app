import Link from "next/link";

export default function ShopPage() {
  const route = [
    { id: "a", name: "A" },
    { id: "b", name: "B" },
    { id: "c", name: "C" },
    { id: "d", name: "D" },
  ];
  return (
    <div>
      {route.map((item) => (
        <Link key={item.id} href={`/shop/${item.id}`}>
          {item.name}
        </Link>
      ))}
      <Link href="/blog/authors">Blog</Link>
    </div>
  );
}
