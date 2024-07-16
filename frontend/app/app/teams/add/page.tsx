'use server';
import { AddTeam } from "@team-football/components/Forms/AddTeam";
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
        <AddTeam accessToken={props.accessToken} />
      </>
    );
  }
  