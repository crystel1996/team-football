import { AddTeams } from "@team-football/components/Forms";
import { Header } from "@team-football/components/Header";
import { MeComponent } from "@team-football/components/Me";

export default function Add() {
    return (
      <MeComponent>
        <Header />
        <AddTeams />
      </MeComponent>
    );
  }
  