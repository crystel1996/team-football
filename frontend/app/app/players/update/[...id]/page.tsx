import { AddPlayerForm, AddTeamForm } from "@team-football/components/Forms";
import { MeComponent } from "@team-football/components/Me";
import { ListPlayerService } from "@team-football/services/Player/List";
import { UpdatePlayerService } from "@team-football/services/Player/Update";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const getData = async () => {

    const token  = cookies().get('accessToken')?.value ?? '';

    const submit = async (input: string) => {
        "use server";
        const inputAsObject = JSON.parse(input);
        
        const updatePlayerService = new UpdatePlayerService(inputAsObject);
        
        const result = await updatePlayerService.submit({
          accessToken: cookies().get('accessToken')?.value ?? ''
        });

        if(result.success) {
            redirect(`/teams/${(result.data as any)?.id}`);
        }

        return result;
    }

    const handlePlayer = async () => {
        const teams = new ListPlayerService();
        const headerList = headers();
        const pathname = headerList.get("x-current-path");
        const paths = (pathname || '').split('/');
        const result = await teams.getOnePlayerById(paths[3],token);
        if(!result.data) {
            redirect(`/teams/`);
        }

        return result
        
};

    const [player] = await Promise.all([
        await handlePlayer()
    ]);

    return {
        submit,
        player
    }
}

export default async function Update() {
    
    const props = await getData();
    

    return (
        <>
          <MeComponent />
          <AddPlayerForm player={props.player.data} onSubmit={props.submit} />
        </>
    );

}