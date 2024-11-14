import { z } from 'zod';
import { tool } from 'ai';
import { TEMPLATE_LIST } from '~/utils/constants';
let templates = TEMPLATE_LIST.map(x => x.name) as [string, ...string[]];
export default {
    SelectCodeTemplate: tool({
        description: `Use this to select one single code template best suited for the user query, 
        Remember: 
        * ASK FOR CONFIRMATION: before opting for a code template, Also mention that you are going to use a template to generate the code.
        * START FROM SCRATCH IF User Says 'No'
        * ONLY SELECT ONE TEMPLATE.
        * ONLY Call this tool once.
        * DO NOT CALL THIS TOOL IF there is no matching templates found
        `,
        parameters: z.object({
            template: z.enum([...templates]),
        }),
        // execute: async ({ template }) => template,
    }),
    // client-side tool that starts user interaction:
    askForConfirmation: tool({
        description: 'use this to Ask the user for Confirmation.',
        parameters: z.object({
            message: z.string().describe('The message to ask for confirmation.'),
        }),
    }),
}