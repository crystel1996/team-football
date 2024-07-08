import { List, ListItemInterface } from "@team-football/components/List";
import { MeComponent } from "@team-football/components/Me";
import { Title } from "@team-football/components/Title";
import { Players } from "@team-football/domains/repositories/Players";
import styled from "styled-components";

async function getData() {

  const teams = new Players();

  const result = await teams.getPlayers({
    offset: 0,
    take: 12
  });

  return result;

}

export default async function PlayersPage() {


    const players = await getData();

    const listPlayers: ListItemInterface[] = players.map((player) => {
      return {
        name: `${player.firstName} ${player.lastName}`,
        image: player.image,
        link: `players/${player.firstName}-${player.lastName}-${player.id}`
      }
    });

    return (
      <>
        <MeComponent />
        <div className="grid place-items-center h-screen w-screen min-[992px]:w-600">
          <Title title="Liste des joueurs" subtitleLink={{ link: "/players/add", title:"Ajouter" }} />
          <div className="players-content py-3">
            <List items={listPlayers} />
          </div>
        </div>
      </>
    );
  }

