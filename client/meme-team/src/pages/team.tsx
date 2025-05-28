import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import AuthService from "../services/auth.service.js" 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent

  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge.js"
import { useState } from "react"

const inTeam =  false;
 
const formSchema = z.object({
  teamName: z.string().min(4, {
    message: "teamName must be at least 4 characters.",
  }),
    inviteCode: z.string().min(4, {
        message: "password must be at least 4 characters.",
  }),
})
export default function TeamPage() {
  const [mode, setMode] = useState<"join" | "create">("join");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          teamName: "",
          inviteCode: "",
        },
      })
      
      async function onSubmit(values: z.infer<typeof formSchema>) { 
        console.log(values)
        const x = await AuthService.login(values.teamName, values.inviteCode);
        console.log(x)
      }
      const members = [
        {name: "Alex Mark", isLeader:true },
        {name: "tasha smith", isLeader:false },
        {name: "jade stone", isLeader:false },
        {name: "tanicka piff", isLeader:false },
        {name: "black smith", isLeader:false },
      ]

    return inTeam ? (
      <div className="flex items-center justify-center min-h-screen px-4 bg-background text-white">
        <div className="w-full max-w-3xl space-y-6">
          <Card className="rounded-sm border border-white/80 bg-background text-white">
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl font-bold ">Team Name</CardTitle>
                  <p className="text-sm text-muted-foreground pt-2">Joined September 11,2001</p>
              </div>
                <Button variant="outline" className="bg-transparent rounded-xs border-red-500 text-red-500 hover:text-white" size="sm">
                  Leave Team
                </Button>
            </CardHeader>
            <CardContent className="ml-5 mr-5 mb-2 border border-[#6405b0]/30 rounded-sm bg-primary/10  text-white px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="border border-[#6405b0]/80 h-12 w-12 rounded-full bg-white/80" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">Alex Mark</p>
                  <Badge variant="outline">Team Leader</Badge>
                  </div>
                  <p className="text-sm text-white/70">Manages team settings and member access</p>
                </div>
                </div>
            </CardContent>
          </Card>        
          <Card className="rounded-sm bg-background border-white text-white">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg">Team Members</CardTitle>
                <div className="px-2 rounded-full border border-white/50 flex items-center gap-2 text-sm">
                  <span>{members.length} Members</span>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ul className="space-y-3">
                {members.map((member, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/80" />
                    <span className="font-semibold">{member.name}</span>
                  </div>
                  {member.isLeader && (
                     <Badge variant="outline">Leader</Badge>
                  )}
                </li>
                ))}
              </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    ) : (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
         <div className="w-full max-w-3xl space-y-6">
          <Card className="rounded-sm border border-white/80 bg-background text-white">
            <CardHeader>
              <CardTitle className="text-3xl">
                Join or Create Team
              </CardTitle>
              <p className="text-sm text-white/70">You are not currently part of any team. Create a new team or join a existing one.</p>
            </CardHeader>     
            <CardContent className="ml-5 mr-5 mb-4 rounded-sm bg-zinc-800  text-white px-1 py-1">
              <div className="flex">
                <button
                  onClick={() => setMode("join")}
                  className={`flex-1 px-3 py-2 text-sm font medium rounded-sm ${
                    mode === "join" ?  "bg-black/80 text-white border border-zinc-800" : "bg-zinc-800 text-white"
                  }`}
                >
                  Join Team
                </button>
                <button 
                  onClick={() => setMode("create")}
                  className={`flex-1 px-3 py-2 text-sm font medium rounded-sm  ${
                    mode === "join" ? "bg-zinc-800 text-white" : "bg-black/80 text-white border border-zinc-800"
                  }`}
                >
                  Create Team
                </button>
              </div>
            </CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-2">
                {mode === "join" && (
                  <FormField
                  control={form.control}
                    name="inviteCode"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>InviteCode</FormLabel>
                      <FormControl>
                      <Input className="rounded-sm" placeholder="Enter team invite code" {...field}/>
                      </FormControl>
                      </FormItem>
                    )}
                    />
                )}
                 <p className="text-sm text-white/70">Enter the invite code provided by your leader</p>
                {mode === "create" && (
                  <FormField
                  control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                      <Input placeholder="Enter team name" {...field}/>
                      </FormControl>
                      </FormItem>
                    )}
                    />
                )}
                </CardContent>
                <CardFooter className="pt-3">
                  <Button type="submit" className="w-full mt-1 bg-primary/40 rounded-sm">
                    {mode === "join" ? "Join Team" : "Create Team"}
                  </Button>
                </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
    );
}
