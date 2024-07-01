'use client';
import { List } from "@team-football/components/List";
import { Title } from "@team-football/components/Title";
import styled from "styled-components";

export default function Teams() {


    const items = [...Array(50)].map((_, index) => {
      return {
        title: `Team ${index + 1}`,
        image: 'https://i.pravatar.cc/300',
        slug: `team-${index+1}`
      }
    });

    return (
      <StyledWrapper className="grid place-items-center h-screen">
        <Title title="Liste des équipes" subtitleLink={{ link: "/teams/add", title:"Ajouter" }} />
        <div className="teams-content py-3">
          <List items={items} />
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

export function getServerSidesProps() {

}

