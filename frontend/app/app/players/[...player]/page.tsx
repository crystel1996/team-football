import { Card } from "@team-football/components/Card";
import { MeComponent } from "@team-football/components/Me";
import { Title } from "@team-football/components/Title";
import { Players } from "@team-football/domains/repositories/Players";

async function getData() {

  const teams = new Players();

  const result = await teams.getOnePlayers({
    filter: {}
  });

  return result;

}

export default async function PlayersPage() {


    const player = await getData();

    const description = `${player.firstName} est un joueur provenant. Son balance est: ${player.balance}.`

    return (
      <>
        <MeComponent />
        <div className="grid place-items-center h-screen w-screen min-[992px]:w-600">
          <Title title={player.firstName} subtitleLink={{ link: "/players/add", title:"Ajouter un autre joueur" }} />
          <div className="teams-content py-3 flex justify-center align-items">
            <Card title={player.firstName} image={player.image} description={description} />
          </div>
        </div>
      </>
    );
  }

