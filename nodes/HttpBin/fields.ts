/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-type-options-password-missing */
import { INodeProperties } from 'n8n-workflow';

export const public_fields: INodeProperties[] = [
	{
		displayName: 'Offer ID',
		name: 'offer_id',
		type: 'string',
		default: '',
		description: 'The offer id to create the offer for',
		displayOptions: {
			show: {
				Operation: ['get_offer','delete_offer'],
                 is_bulk: [false],
			},
		},
	},

    	{
		displayName: 'Offer Date',
		name: 'offer_date',
		type: 'string',
		default: '',
		description: 'The offer date to create the offer for',
		displayOptions: {
			show: {
				Operation: ['get_offer','delete_offer'],
			    is_bulk: [false],
			},
		},
	},
];

export const get_offer_fields: INodeProperties[] = [
    	{
		displayName: 'Offer Type',
		name: 'offer_type',
		type: 'options',
		default: '',
		description: 'The offer type to get the offer for',
		displayOptions: {
			show: {
				Operation: ['get_offer'],
			},
		},
        options: [
            {
                name: 'Deleted Offers?',
                value: 'deleted_offers',
            },
            {
                name: 'Active Offers?',
                value: 'active_offers',
            },
        ],
	},
];

export const delete_offer_fields: INodeProperties[] = [
       	{
		displayName: 'isBulk',
		name: 'is_bulk',
		type: 'boolean',
		default: false,
		description: 'Is bulk delete?',
		displayOptions: {
			show: {
				Operation: ['delete_offer'],
			},
		},
	},
    	{
		displayName: 'Offers To Delete',
		name: 'offers_to_delete',
		type: 'json',
		default: '',
        placeholder: "{{OFFER1:OFFER2:OFFER3}}",
		description: 'The offer id to create the offer for',
		displayOptions: {
			show: {
				Operation: ['delete_offer'],
                is_bulk: [true],
			},
		},
	},
];
