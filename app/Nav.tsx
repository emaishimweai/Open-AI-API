import Link from "next/link";

export default async function Nav() {
  return (
    <nav
      className="flex justify-between
     items-center py-8"
    >
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Marketing AI Generator.</h1>
      </Link>
    </nav>
  );
}
