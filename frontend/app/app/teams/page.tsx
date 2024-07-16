import { ListTeamsWithAction } from "@team-football/components/List";
import { MeComponent } from "@team-football/components/Me";
import { Pagination } from "@team-football/components/Pagination";
import { Title } from "@team-football/components/Title";
import { ListTeamsService } from "@team-football/services/Teams/List";
import { cookies } from "next/headers";

async function getData({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams.p && typeof searchParams.p === 'string' ? parseInt(searchParams.p) : 1;
  const token  = cookies().get('accessToken')?.value ?? '';
  const handleListTeams = async () => {
    const teams = new ListTeamsService();
   
    const result = await teams.getListTeams({
      page: page ?? 1,
      accessToken: token
    });
    return result
    
  };

  const [listTeams] = await Promise.all([
    await handleListTeams()
  ]);

  const previousDisabled = () => {
    
    if (page === 1) {
      return true;
    }
    return false;
  }

  const nextDisabled = () => {
    if(page === listTeams.count || listTeams.count <= 5) {
      return true;
    }
    return false;
  };

  return {
    listTeams,
    previousDisabled: previousDisabled(),
    nextDisabled: nextDisabled(),
    currentPage: page,
    accessToken: token
  };

}

export default async function TeamsPage({
  searchParams,
  withHeader = true
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  withHeader: boolean;
}) {


    const teams = await getData({
      searchParams
    });

    return (
      <>
        {withHeader && <MeComponent />}
        <div className="grid place-items-center h-screen w-screen min-[992px]:w-600">
          <Title title="Liste des équipes" subtitleLink={{ link: "/teams/add", title:"Ajouter" }} />
          <div className="teams-content py-3 w-screen">
            <ListTeamsWithAction
              items={teams.listTeams.data} 
              path='/teams/update'
              withAction
              accessToken={teams.accessToken}
              deleteTitle="Supprimer l'équipe"
              deleteSubtitle="Voulez-vous supprimer cette équipe?"
            />
            {teams.listTeams.count > 5 && (
              <Pagination 
                previousDisabled={teams.previousDisabled}
                nextDisabled={teams.nextDisabled}
                currentPage={teams.currentPage}
                totalPage={teams.listTeams.count}
                path="/teams"
              />
            )}
          </div>
        </div>
      </>
    );
  }

