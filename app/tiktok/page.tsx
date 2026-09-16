import { redirect } from "next/navigation";

export default function TikTokRedirectPage() {
  redirect("/en?utm_source=tiktok&utm_medium=social&utm_campaign=bio");
}
