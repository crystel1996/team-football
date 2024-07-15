import { MeComponent } from "@team-football/components/Me";
import TeamsPage from "./teams/page";

export default function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <MeComponent />
      <TeamsPage searchParams={searchParams} withHeader={false}/>
    </>
  );
}
