import { IExecuteFunctions } from "n8n-workflow";

export async function HandleDeleteOffer(this: IExecuteFunctions) {
	const credentials = await this.getCredentials('httpBinApi');
    return {credinital:credentials.apiKey}
}

export async function HandleGetOffer(this: IExecuteFunctions) {
	const credentials = await this.getCredentials('httpBinApi');
    return {credinital:credentials.apiKey}
}