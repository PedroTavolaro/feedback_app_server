import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy }, 
    { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
   
    it('should be able to submit a feedback', async () => {
        //esperando q quando chamar essa função ela chegue ate o final e nao dispare erro --fake
       await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,test.jpg'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit feedback without type', async () => {
       await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
             type: 'Bug',
             comment: '',
             screenshot: 'data:image/png;base64,test.jpg'
         })).rejects.toThrow();
     })

     it('should not be able to submit feedback an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
             type: 'Bug',
             comment: 'Tudo bugado',
             screenshot: 'test.jpg',
         })).rejects.toThrow();
     })
})