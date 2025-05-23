"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SigninSchema } from "@/types/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Spinner from '@/components/Spinner';
import { Separator } from "@/components/ui/separator";
import { MotionDiv } from "@/components/motion";
import { providers } from "@/config";
import { AtSign, MailCheck, MailWarning } from "lucide-react";
import AuthDivider from "./AuthDivider";

const Signin: React.FC = () => {
    const [prov, setProv] = useState<string>("");
    const [emailSent, setEmailSent] = useState<any>({});


    type Inputs = z.infer<typeof SigninSchema>
    const form = useForm<Inputs>({
        resolver: zodResolver(SigninSchema), defaultValues: {
            email: ""
        },
    })

    const emailSubmit = async (values: z.infer<typeof SigninSchema>) => {
        try {
            setProv("email");
            setEmailSent(await signIn("email", { email: values.email, redirect: false }));
        } catch (error: any) {
            setProv("");
            console.log(error.message);
        }
    };


    const loginWithProvider = async (provider: string) => {
        try {
            setProv(provider);
            await signIn(provider);

        } catch (error: any) {
            setProv("");
            console.log(error.message);
        }
    };


    return <>
        {emailSent.status && (
            <MotionDiv
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center min-h-full space-y-3 text-xs"
            >
                {emailSent.error ? (
                    <MailWarning className="size-16 mx-auto" />
                ) : (
                    <MailCheck className="size-16 mx-auto" />
                )}
                <h2>{emailSent.error ? "Something Went Wrong" : "Check Your Mail Box"}</h2>
                <p className="text-xs">{emailSent.error ? "Try Again Later" : "We sent a magic link to"}</p>
                {!emailSent.error && (
                    <>
                        <p className="text-xs">
                            <b>{form.getValues("email")}</b>
                        </p>
                        <p className="text-xs">Click the link to Sign In or Sign Up</p>
                    </>
                )}
            </MotionDiv>
        )}

        {!emailSent.status && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(emailSubmit)} className="space-y-5 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={prov !== ""}
                                        icon={<AtSign className="w-5 h-5" />}
                                        placeholder="Enter Your Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size='full' disabled={prov !== ""}
                        icon={<Spinner active={prov === "email"} />}
                    >
                        Submit
                    </Button>
                </form>

                <AuthDivider />

                <div className='w-full font-semibold text-xl flex flex-col items-center justify-center gap-y-2 '>
                    {providers.map(provider => (
                        <Button
                            size="full"
                            key={provider}
                            onClick={() => loginWithProvider(provider)}
                            disabled={prov !== ""}
                            type='button'
                            className='gap-x-2 capitalize'
                            icon={<Spinner active={prov === provider} />}
                        >
                            <Image src={`/${provider}.png`} className={provider === 'github' ? 'invert dark:invert-0' : ""} width={22} height={22} alt={`Logo of ${provider}`} />
                            <span>
                                Continue With {provider}
                            </span>
                        </Button>
                    ))}
                </div>

            </Form>
        )}
    </>
}
export default Signin;
