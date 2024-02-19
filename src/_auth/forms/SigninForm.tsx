import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import {SigninValidation} from '../../lib/validation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import {useUserContext} from '../../context/AuthContext'
import {useNavigate} from "react-router-dom"

import {
  useSignInAcccount,
} from "../../lib/react-query/queriesAndMutations";

const SigninForm = () => {

  const { mutateAsync: signInAccount } = useSignInAcccount();
  const {checkAuthenticatedUser} =  useUserContext()
  const { toast } = useToast();
  const navigate =useNavigate()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
let isLoading = false as boolean
  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    isLoading = true
    const session = await signInAccount({
      email: user?.email,
      password: user?.password,
    });

    if (!session)
      return toast({
        title: "Something Went Wrong!",
        description: "Sign in fall! Try again later bro!",
      });  

      const isLogin = checkAuthenticatedUser();

      if(isLogin){
        form.reset();
        navigate('/')
        return toast({
           description: "Login sucessfull",
        });  
      } else return toast({ description: "Login faill pls try again"})

   

  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className={`${isLoading ? "bg-red" : "bg-purple-700"} transition shad-button_primary`}>
            {isLoading  ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;