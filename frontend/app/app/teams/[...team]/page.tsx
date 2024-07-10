import { CardWithAction } from "@team-football/components/Card/CardWithAction";
import { MeComponent } from "@team-football/components/Me";
import { Title } from "@team-football/components/Title";
import { ListTeamsService } from "@team-football/services/Teams/List";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {

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

  return {
    team,
    accessToken: token
  }

}

export default async function TeamsPage() {


    const props = await getData();

    const description = `${props.team.data?.name} est une équipe provenant à ${props.team.data?.country}. Son solde est: ${props.team.data?.balance ?? 0}$.`

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
        </div>
      </>
    );
  }

