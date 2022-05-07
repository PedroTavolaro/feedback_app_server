import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "750a7a1631fd8c",
      pass: "8bcfcb90f35f28"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
          await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Pedro Tavolaro <phtc-pedro@hotmail.com>',
        subject,
        html: body,
    })
    }
}