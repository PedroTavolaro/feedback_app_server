import { MailAdapter } from "../adapters/mail-adapter";
import { feedbacksRepository } from "../repositories/feedbacks-repository";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUseCase {
    constructor (
        private feedbacksRepository: feedbacksRepository,
        private mailAdapater: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required.');
        }

        if(!comment){
            throw new Error('Comment is required')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('invalid screenshot format.')
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapater.sendMail({
            subject: 'Novo feedbeck',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<div style="width:480px;height:854px;">`,
            `<p>Comentário: ${comment}</p>`,
              screenshot ? `<img src="${screenshot}" style="width:100%; height:100%;"/>` : ``,  
              `</div>`,
            `</div>`
                ].join('\n')
        })
    }   
}


           
           