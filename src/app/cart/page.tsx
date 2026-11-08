import { redirect } from "next/navigation";

/** The cart returns in Phase 4b. Until then it points at the coming-soon shop. */
export default function CartPage() {
  redirect("/shop");
}
