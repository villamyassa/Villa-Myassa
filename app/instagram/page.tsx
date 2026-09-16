import { redirect } from "next/navigation";

export default function InstagramRedirectPage() {
  redirect("/en?utm_source=instagram&utm_medium=social&utm_campaign=bio");
}
