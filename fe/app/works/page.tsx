import type { Metadata } from "next";
import Link from "next/link";
import { Menu } from "@/components/Menu";
import { WorksBoard } from "@/components/WorksBoard";
import { getWorksPage } from "@/sanity/works";

export const metadata: Metadata = {
  title: "Works",
};

export default async function WorksPage() {
  const { info, works } = await getWorksPage();

  return (
    <div className="page-works">
      <header className="site-header layout">
        <Link className="site-title" href="/">
          Sophie Calle : The Sleepers
        </Link>
        <h1 className="page-title">Works</h1>
        <Menu current="/works" />
      </header>

      <WorksBoard info={info} works={works} />
    </div>
  );
}
