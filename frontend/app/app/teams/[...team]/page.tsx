import { Card } from "@team-football/components/Card";
import { MeComponent } from "@team-football/components/Me";
import { Title } from "@team-football/components/Title";
import { Teams } from "@team-football/domains/repositories/Teams";

async function getData() {

  const teams = new Teams();

  const result = await teams.getOneTeams({
    filter: {}
  });

  return result;

}

export default async function TeamsPage() {


    const team = await getData();

    const description = `${team.name} est une équipe provenant à ${team.country}. Son balance est: ${team.balance}.`

    return (
      <>
        <MeComponent />
        <div className="grid place-items-center h-screen w-screen min-[992px]:w-600">
          <Title title={team.name} subtitleLink={{ link: "/teams/add", title:"Ajouter une autre équipe" }} />
          <div className="teams-content py-3 flex justify-center align-items">
            <Card title={team.name} image={team.image} description={description} />
          </div>
        </div>
      </>
    );
  }

