'use server';
import { AddPlayer } from "@team-football/components/Forms/AddPlayer/AddPlayer";
import { MeComponent } from "@team-football/components/Me";
import { cookies } from "next/headers";

const getData = async ({
  searchParams
}:{
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const idTeam = searchParams.t;
  const accessToken = cookies().get('accessToken')?.value ?? ''
  

  return {
    idTeam,
    accessToken
  }
}

export default async function Add({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

    const props = await getData({
      searchParams
    });

    return (
      <>
        <MeComponent />
        <AddPlayer accessToken={props.accessToken} idTeam={props.idTeam as string} />
      </>
    );
  }
  