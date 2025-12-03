import { IDataObject, INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { public_fields ,get_offer_fields,delete_offer_fields} from './fields';
import { httpBinOperations } from './operators';
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executeHttpBin } from './execute';
export class HttpBin implements INodeType {
		public async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('Operation', 0) as string;
		const responseData = await executeHttpBin.call(this, operation);
		if (
			Array.isArray(responseData) &&
			responseData.length > 0 &&
			responseData[0].hasOwnProperty('json')
		) {
			return [responseData as INodeExecutionData[]];
		}
		return [[{ json: responseData as unknown as IDataObject }]];
	}

	description: INodeTypeDescription = {
		displayName: 'HttpBin',
		name: 'httpBin',
		icon: { light: 'file:httpbin.svg', dark: 'file:httpbin.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with HttpBin API',
		defaults: {
			name: 'HttpBin',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'httpBinApi',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://httpbin.org',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			...httpBinOperations,
			...public_fields,
			...get_offer_fields,
			...delete_offer_fields,
	
		],

	};
}