import { AddPlayerForm } from "@team-football/components/Forms";
import { UpdatePlayer } from "@team-football/components/Forms/AddPlayer/UpdatePlayer";
import { MeComponent } from "@team-football/components/Me";
import { ListPlayerService } from "@team-football/services/Player/List";
import { UpdatePlayerService } from "@team-football/services/Player/Update";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const getData = async () => {

    const token  = cookies().get('accessToken')?.value ?? '';

    

    const handlePlayer = async () => {
        const teams = new ListPlayerService();
        const headerList = headers();
        const pathname = headerList.get("x-current-path");
        const paths = (pathname || '').split('/');
        const result = await teams.getOnePlayerById(paths[4],token);
        if(!result.data) {
            redirect(`/teams/`);
        }

        return result
        
};

    const [player] = await Promise.all([
        await handlePlayer()
    ]);

    return {
        player,
        token
    }
}

export default async function Update() {
    
    const props = await getData();
    

    return (
        <>
          <MeComponent />
          <UpdatePlayer accessToken={props.token} player={props.player.data} />
        </>
    );

}