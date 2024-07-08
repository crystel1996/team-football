import { List } from "@team-football/components/List";
import { MeComponent } from "@team-football/components/Me";
import { Title } from "@team-football/components/Title";
import { ListTeamsService } from "@team-football/services/Teams/List";
import { cookies } from "next/headers";

async function getData({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const handleListTeams = async () => {
    const teams = new ListTeamsService();
   
    const page = searchParams.p && typeof searchParams.p === 'string' ? parseInt(searchParams.p) : 1
    const result = await teams.getListTeams({
      page: page ?? 1,
      accessToken: cookies().get('accessToken')?.value ?? ''
    });
    return result
    
  };

  const [listTeams] = await Promise.all([
    await handleListTeams()
  ]);

  return {
    listTeams
  };

}

export default async function TeamsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {


    const teams = await getData({
      searchParams
    });

    console.log('[teams]', teams)

    return (
      <>
        <MeComponent />
        <div className="grid place-items-center h-screen w-screen min-[992px]:w-600">
          <Title title="Liste des équipes" subtitleLink={{ link: "/teams/add", title:"Ajouter" }} />
          <div className="teams-content py-3">
            <List items={teams.listTeams.data} />
          </div>
        </div>
      </>
    );
  }

