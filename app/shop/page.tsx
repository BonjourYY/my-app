import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ShopPage() {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: "fqymtu@gmail.com",
        password: "fqy10285111",
        // callbackURL: "/blog",
      },
    });
    console.log(result);
  } catch (error) {

    if (isAPIError(error)) {
      console.log('111')
      console.log(error)
    }
  }


  // const result = await auth.api.getSession({
  //   returnHeaders: true,
  //   headers: await headers(),
  // });

  // console.log(result);

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
