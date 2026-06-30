export async function generateStaticParams() {
  return [{ id: ["a"] }, { id: ["b"] }, { id: ["c"] }];
}

export default async function ShopDetail(props: PageProps<"/shop/[...id]">) {
  const { id } = await props.params;
  console.log(id);

  // const searchParams = await props.searchParams;
  // console.log(searchParams);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div>
      <h1>商品详情页</h1>
      <p>{id}</p>
    </div>
  );
}
