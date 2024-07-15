'use server';
import { AddPlayers } from "@team-football/components/Forms/AddPlayer";
import { MeComponent } from "@team-football/components/Me";
import { AddPlayerService } from "@team-football/services/Player/Add";
import { cookies } from "next/headers";

const getData = async () => {

  const submit = async (input: string) => {
    "use server";
    const inputAsObject = JSON.parse(input);
    
    const addPlayerService = new AddPlayerService(inputAsObject);
    
    const result = await addPlayerService.submit({
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
        <AddPlayers onSubmit={props.submit} />
      </>
    );
  }
  