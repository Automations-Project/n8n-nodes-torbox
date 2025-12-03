import { IExecuteFunctions } from 'n8n-workflow';
import {
    HandleGetOffer,
    HandleDeleteOffer,
} from './methods';
export async function executeHttpBin(this: IExecuteFunctions, operation: string) {
	switch (operation) {
        		case 'get_offer':
			return await HandleGetOffer.call(this);
		case 'delete_offer':
			return await HandleDeleteOffer.call(this);

		default:
			throw new Error(`Operation ${operation} is not supported`);
	}
}