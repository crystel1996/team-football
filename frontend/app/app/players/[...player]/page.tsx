'use client';
import { Card } from "@team-football/components/Card";
import { Header } from "@team-football/components/Header";
import { MeComponent } from "@team-football/components/Me";
import { Title } from "@team-football/components/Title";
import { Players } from "@team-football/domains/repositories/Players";
import styled from "styled-components";

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
      <MeComponent>
        <Header />
        <StyledWrapper className="grid place-items-center h-screen">
          <Title title={player.firstName} subtitleLink={{ link: "/players/add", title:"Ajouter un autre joueur" }} />
          <div className="teams-content py-3 flex justify-center align-items">
            <Card title={player.firstName} image={player.image} description={description} />
          </div>
        </StyledWrapper>
      </MeComponent>
    );
  }

const StyledWrapper = styled.div`

  .teams-content {
    width: 100vw;
    @media (min-width: 992px) {
      width: 600px;
    }
  }

`;

