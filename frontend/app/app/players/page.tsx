'use client';
import { Header } from "@team-football/components/Header";
import { List, ListItemInterface } from "@team-football/components/List";
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
        <Header />
        <StyledWrapper className="grid place-items-center h-screen">
          <Title title="Liste des joueurs" subtitleLink={{ link: "/players/add", title:"Ajouter" }} />
          <div className="players-content py-3">
            <List items={listPlayers} />
          </div>
        </StyledWrapper>
      </>
    );
  }

const StyledWrapper = styled.div`

  .players-content {
    width: 100vw;
    @media (min-width: 992px) {
      width: 600px;
    }
  }

`;

