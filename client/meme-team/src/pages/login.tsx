import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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
  username: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
    password: z.string().min(10, {
        message: "password must be at least 10 characters.",
  }),
})
 
export default function Login() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })
      
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
 
  return (
    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <>
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                            <FormMessage/>
                                </FormItem>
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This isnt visible to other users
                                </FormDescription>
                            <FormMessage />
                            </FormItem>
                        </>
                        )}
                    />
                    </CardContent>
            <CardFooter>
                <Button type="submit">Submit</Button>
            </CardFooter>
                </form>
            </Form>
        </Card>
    </div>
  )
}