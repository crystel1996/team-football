'use client';
import { List } from "@team-football/components/List";
import { Title } from "@team-football/components/Title";
import { Teams } from "@team-football/domains/repositories/Teams";
import styled from "styled-components";

async function getData() {

  const teams = new Teams();

  const result = await teams.getTeams({
    offset: 0,
    take: 12
  });

  return result;

}

export default async function TeamsPage() {


    const teams = await getData();

    return (
      <StyledWrapper className="grid place-items-center h-screen">
        <Title title="Liste des équipes" subtitleLink={{ link: "/teams/add", title:"Ajouter" }} />
        <div className="teams-content py-3">
          <List items={teams} />
        </div>
      </StyledWrapper>
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

