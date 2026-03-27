import { FullConfig } from "@playwright/test";
import dotenv from 'dotenv';

async function globalSetup(config: FullConfig) {

    if (process.env.environment_variables) {
        dotenv.config({
            path: `./env/.env.${process.env.environment_variables}`,
            override: true
        });
    }
}


export default globalSetup;