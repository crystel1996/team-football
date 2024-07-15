import { CardWithAction } from "@team-football/components/Card/CardWithAction";
import { ListWithAction } from "@team-football/components/List";
import { MeComponent } from "@team-football/components/Me";
import { Pagination } from "@team-football/components/Pagination";
import { Title } from "@team-football/components/Title";
import { ListTeamsService } from "@team-football/services/Teams/List";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const page = searchParams.p && typeof searchParams.p === 'string' ? parseInt(searchParams.p) : 1;
  const token  = cookies().get('accessToken')?.value ?? '';

  const handleGetTeam = async () => {
    const teams = new ListTeamsService();
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const paths = (pathname || '').split('/');
    
    const result = await teams.getOneTeamsById(paths[2],token);

    if(!result.data?.id) {
      redirect('/teams');
    }

    return result
    
  };
  const [team] = await Promise.all([
    await handleGetTeam()
  ]);

  
  const previousDisabled = () => {
    
    if (page === 1) {
      return true;
    }
    return false;
  }

  const nextDisabled = () => {
    if(page === team.data.players.count || team.data.players.count <= 5) {
      return true;
    }
    return false;
  };

  return {
    previousDisabled: previousDisabled(),
    nextDisabled: nextDisabled(),
    currentPage: page,
    team,
    accessToken: token
  }
  

}

export default async function TeamsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {


    const props = await getData({
      searchParams
    });

    const description = `${props.team.data?.name} est une équipe provenant à ${props.team.data?.country}. Son solde est: ${props.team.data?.balance ?? 0}$.`
    console.log('[TEAM]', props.team.data.players)
    return (
      <>
        <MeComponent />
        <div className="grid place-items-center h-screen w-screen min-[992px]:w-600">
          <Title title={props.team.data?.name} subtitleLink={{ link: "/teams/add", title:"Ajouter une autre équipe" }} />
          <div className="teams-content py-3 flex justify-center align-items">
            <CardWithAction 
              id={props.team.data?.id}
              title={props.team.data?.name} 
              image={props.team.data?.image} 
              description={description} 
              accessToken={props.accessToken}
              withAction
              link="/teams"
            />
          </div>
          <Title heading={2} title="Liste des joueurs" subtitleLink={{ link: "/player/add", title:'Ajouter un joeur' }}></Title>
          <div className="teams-content py-3 w-screen">
            <ListWithAction
              items={props.team.data?.players} 
              path='/teams/update'
              withAction
              accessToken={props.accessToken}
            />
            {(props.team.data?.players || []).count > 5 && (
              <Pagination 
                previousDisabled={props.previousDisabled}
                nextDisabled={props.nextDisabled}
                currentPage={props.currentPage}
                totalPage={(props.team.data?.players || []).count}
                path="/teams"
              />
            )}
          </div>
        </div>
      </>
    );
  }

