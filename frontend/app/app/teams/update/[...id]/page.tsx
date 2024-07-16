import { AddTeamForm } from "@team-football/components/Forms";
import { MeComponent } from "@team-football/components/Me";
import { ListTeamsService } from "@team-football/services/Teams/List";
import { UpdateTeamService } from "@team-football/services/Teams/Update/UpdateService";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const getData = async () => {

    const token  = cookies().get('accessToken')?.value ?? '';

    const submit = async (input: string) => {
        "use server";
        const inputAsObject = JSON.parse(input);
        
        const addTeamService = new UpdateTeamService(inputAsObject);
        
        const result = await addTeamService.submit({
          accessToken: cookies().get('accessToken')?.value ?? ''
        });

        if(result.success) {
            redirect(`/teams/${(result.data as any)?.id}`);
        }

        return result;
    }

    const handleTeam = async () => {
        const teams = new ListTeamsService();
        const headerList = headers();
        const pathname = headerList.get("x-current-path");
        const paths = (pathname || '').split('/');
        
        const result = await teams.getOneTeamsById(paths[3],token);

        if(!result.data) {
            redirect(`/teams/`);
        }

        return result
        
    };

    const [team] = await Promise.all([
        await handleTeam()
    ]);

    return {
        submit,
        team
    }
}

export default async function Update() {
    
    const props = await getData();
    

    return (
        <>
          <MeComponent />
          <AddTeamForm team={props.team.data} onSubmit={props.submit} />
        </>
    );

}