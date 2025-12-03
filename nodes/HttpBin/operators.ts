/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';
export const httpBinOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'Operation',
		type: 'options',
		default: 'get_offer',
		options: [
			{
				name: 'Get Offer',
				value: 'get_offer',
				description: 'Get a offer from HttpBin',
				action: 'Get a offer from HttpBin',
			},
			{
				name: 'Delete Offer',
				value: 'delete_offer',
				description: 'Delete an offer from HttpBin',
				action: 'Delete an offer from HttpBin',
			},
		],
	},
];