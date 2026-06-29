"use client";
import { useParams } from "next/navigation";

export default function ShopDetail() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>商品详情页</h1>
      <p>{id}</p>
    </div>
  );
}
