import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import AuthService from "../services/auth.service.js" 
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent

  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
  }),
})
 
export default function Signup() {
  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
      const y = await AuthService.signup(values.username, values.password)
      console.log(y)
    }

return (
  <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <CardHeader>
                      <CardTitle>Signup</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                          <FormItem className="pb-4">
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                  <Input placeholder="Username" {...field} />
                              </FormControl>
                              <FormDescription>
                                  This is your public display name.
                              </FormDescription>
                              <FormMessage/>
                          </FormItem>
                      )}
                    />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="pb-4">
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                  <Input type="password" placeholder="Password" {...field} />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p className="text-sm text-muted-forground">
                Already have a account?{" "}
              </p>
                <a href="/login" className="flex flec-col items-center  text-primary hover:underline">
                  Login
                </a>
          </CardFooter>
              </form>
          </Form>
      </Card>
  </div>
)
}