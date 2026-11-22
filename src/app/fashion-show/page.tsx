import FashionShowView from "./FashionShowView";
import { getDesigners } from "@/lib/designers";

export const revalidate = 60;

export default async function FashionShowPage() {
  const designers = await getDesigners();
  return <FashionShowView designers={designers} />;
}