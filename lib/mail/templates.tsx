import * as React from "react";
import { siteLink, siteName, domain } from "@/config";
import { Body, Heading, Container, Head, Html, Img, Text, Hr, Section, Tailwind, Button, Link } from "@react-email/components";
import { ContactTypes } from "@/types/zod";

interface Props {
    children: React.ReactNode;
}

const Tamplate: React.FC<Props> = ({ children }) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-secendry flex items-center justify-center p-8">
                    <Container className="bg-white rounded-lg flex gap-y-2 items-center justify-center p-5" >
                        <Img
                            src={`${siteLink}/logo.png`}
                            width="76"
                            height="24"
                            alt={siteName}
                        />
                        {children}
                        <Text className="opacity-60">
                            Best,
                            <br />
                            {siteName}
                        </Text>
                        <Hr />
                        <Text className="text-xs opacity-60 text-center">
                            © All Rights Reserved {domain}
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html >
    )
}
interface SignInEmailProps {
    link: string;
}


export const SignInEmail = ({ link }: SignInEmailProps) => (
    <Tamplate>
        <Text>
            Dear User,
        </Text>
        <Text >
            Simply click the Button below to sign-In or sign-Up to {siteName}.
        </Text>
        <Section className="my-10 mx-auto" >
            <Button className="text-xl text-white font-bold bg-black px-6 py-2 rounded-md w-full text-center" href={link}>
                Sign In
            </Button>
            <Text>
                Button not working? Use this link instead: <Link href={link}>sign In</Link>
            </Text>
        </Section>
        <Text className="text-center opacity-80">
            (This code is valid for 24 hours)
        </Text>
        <Text className="text-center">
            If this request was not made by you, no worries! Simply ignore this email.
        </Text>
    </Tamplate>

);


export const ContactTemplateUser: React.FC<ContactTypes> = ({ name, email, topic, message }) => (
    <Tamplate>
        <Heading className="text-lg my-5">Thank You for Contacting Us!</Heading>
        <Hr />
        <Text>Dear {name},</Text>
        <Text>Thank you for contacting us through our Contact Us page. We appreciate you taking the time to reach out to us.</Text>
        <Text>We have received your message and will get back to you as soon as possible. Here are the details of your inquiry:</Text>
        <Section className="border border-primary flex items-center justify-start px-5 rounded-xl">
            <Text>Your Name: {name},</Text>
            <Hr />
            <Text>Your Email: {email}</Text>
            <Hr />
            <Text>Your Topic: {topic}</Text>
            <Hr />
            <Text>Your Message: {message}</Text>
        </Section>
        <Text>Rest assured, your concerns are important to us, and we are committed to providing you with the best possible assistance.</Text>
    </Tamplate>
);



export const ContactTemplateAdmin: React.FC<ContactTypes> = ({ name, email, topic, message }) => (
    <Tamplate>
        <Heading className="text-lg my-5">Contact Us Message from: {siteName}</Heading>
        <Hr />
        <Section className="border border-primary flex items-center justify-start px-5 rounded-xl">
            <Text className="">Name: {name}</Text>
            <Hr />
            <Text>Email: {email}</Text>
            <Hr />
            <Text>Topic: {topic}</Text>
            <Hr />
            <Text>Message: {message}</Text>
        </Section>

    </Tamplate>
);
