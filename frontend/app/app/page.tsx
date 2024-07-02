import { Header } from "@team-football/components/Header";
import { MeComponent } from "@team-football/components/Me";

export default function Home() {
  return (
    <MeComponent>
      <Header />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </MeComponent>
  );
}
