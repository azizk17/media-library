import Link from "next/link";
import GitHub from "@/icons/GitHub";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/button";
import Roadmap from "./components/Roadmap";
import Welcome from "./components/Welcome";

const Homepage = () => (
  <div className="container flex flex-col gap-24 py-8 pt-6 md:flex-row md:py-12">
    <section className="md:basis-1/2">
      <div>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Save time on project setup. Ship apps fast.
        </h1>
        <p className="text-lg text-muted-foreground">
          The starter pack built on top-notch technologies that enables you to
          focus on business logic instead of complex project setup. Free. Open
          Source.
        </p>
      </div>

      <div className="my-16">
        <Welcome />
      </div>

      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Button>
          <GitHub className="w-4 h-4 mr-2" />
          Clone on GitHub
        </Button>
      </Link>
    </section>
    <section className="md:basis-1/2">
      <Roadmap />
    </section>
  </div>
);

export default Homepage;
