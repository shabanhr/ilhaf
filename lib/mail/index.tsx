"use server";


import { ContactTemplateAdmin, ContactTemplateUser, SignInEmail } from "./templates";
import { Emailfrom, domain, siteName } from "@/config";
import { ContactTypes } from "@/types/zod";
import { render } from '@react-email/render';
import { createTransport } from "nodemailer"



const transport = createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});



export async function sendVerificationRequest(params: any) {
  const { identifier: email, url } = params;
  try {
    await transport.sendMail({
      to: email,
      from: Emailfrom,
      subject: `Sign in to ${domain}`,
      text: `Sign in to ${domain}\n${url}\n\n`,
      html: await render(<SignInEmail link={url} />),
    })
  } catch (error) {
    console.log(error);
    throw new Error()
  }
}


export async function sendContactEmail(data: ContactTypes) {
  const { name, email, topic, message } = data;


  let success: boolean = true;
  await transport.sendMail({
    to: "sshahaider@gmail.com",
    from: Emailfrom,
    replyTo: email,
    subject: `Contact Us Message from: ${siteName}`,
    text: `name, ${name} email ${email}, topic ${topic}, message ${message}`,
    html: await render(<ContactTemplateAdmin {...data} />),
  }, (err: any) => {  
    if (err) {
      success = false;
    }
  })

  await transport.sendMail({
    to: email,
    from: Emailfrom,
    subject: `Thank You for Contacting Us!`,
    text: `name, ${name} email ${email}, topic ${topic}, message ${message}`,
    html: await render(<ContactTemplateUser {...data} />),
  })



  return { success };

}