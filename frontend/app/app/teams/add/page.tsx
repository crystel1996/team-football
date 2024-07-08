'use server';
import { AddTeams } from "@team-football/components/Forms";
import { MeComponent } from "@team-football/components/Me";
import { AddTeamService, AddTeamsInputInterface } from "@team-football/services/Teams/Add";
import { cookies } from "next/headers";

const getData = async () => {

  const submit = async (input: string) => {
    "use server";
    const inputAsObject = JSON.parse(input);
    
    const addTeamService = new AddTeamService(inputAsObject);
    
    const result = await addTeamService.submit({
      accessToken: cookies().get('accessToken')?.value ?? ''
    });
    return result;
  }
  return {
    submit
  }
}

export default async function Add() {

    const props = await getData();

    return (
      <>
        <MeComponent />
        <AddTeams onSubmit={props.submit} />
      </>
    );
  }
  