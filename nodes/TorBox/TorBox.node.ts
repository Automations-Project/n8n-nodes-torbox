import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData,
	NodeConnectionType,
} from 'n8n-workflow';
import {
	torBoxResources,
	torrentsOperations,
	usenetOperations,
	webdlOperations,
	generalOperations,
	notificationsOperations,
	userOperations,
	rssOperations,
	integrationsOperations,
	queuedOperations,
	streamOperations,
	searchOperations,
	vendorsOperations,
	relayOperations,
} from './operators';
import {
	createTorrentFields,
	controlTorrentFields,
	requestDownloadLinkFields,
	getTorrentListFields,
	getTorrentCachedAvailabilityFields,
	exportTorrentDataFields,
	getTorrentInfoFields,
	createUsenetDownloadFields,
	controlUsenetDownloadFields,
	requestUsenetDownloadLinkFields,
	getUsenetListFields,
	getUsenetCachedAvailabilityFields,
	createWebDownloadFields,
	controlWebDownloadFields,
	requestWebDownloadLinkFields,
	getWebDownloadListFields,
	getWebDownloadCachedAvailabilityFields,
	getSpeedtestFilesFields,
	clearSingleNotificationFields,
	getUserDataFields,
	addReferralToAccountFields,
	addRssFeedFields,
	controlRssFeedFields,
	modifyRssFeedFields,
	getRssFeedItemsFields,
	authenticateOAuthFields,
	queueIntegrationFields,
	getSpecificJobFields,
	getAllJobsByHashFields,
	getQueuedDownloadsFields,
	controlQueuedDownloadsFields,
	createStreamFields,
	getStreamDataFields,
	// Search fields
	getMetadataByIdFields,
	getMetadataByQueryFields,
	getTorrentDataByIdFields,
	getTorrentDataByQueryFields,
	getUsenetDataByIdFields,
	getUsenetDataByQueryFields,
	// Vendors fields
	registerNewVendorFields,
	updateVendorAccountFields,
	getVendorAccountsFields,
	getSingleVendorAccountFields,
	registerUserUnderVendorFields,
	removeUserFromVendorFields,
	refreshUserAccountsFields,
	// Relay fields
	requestUpdateOnTorrentInfoFields,
} from './fields';
import { executeTorBox } from './execute';

export class TorBox implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TorBox',
		name: 'torBox',
		icon: { light: 'file:torbox.svg', dark: 'file:torbox.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with TorBox API',
		defaults: {
			name: 'TorBox',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'torBoxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.torbox.app/v1/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			...torBoxResources,
			...torrentsOperations,
			...usenetOperations,
			...webdlOperations,
			...generalOperations,
			...notificationsOperations,
			...userOperations,
			...rssOperations,
			...integrationsOperations,
			...queuedOperations,
			...streamOperations,
			...searchOperations,
			...vendorsOperations,
			...relayOperations,
			// Torrents fields
			...createTorrentFields,
			...controlTorrentFields,
			...requestDownloadLinkFields,
			...getTorrentListFields,
			...getTorrentCachedAvailabilityFields,
			...exportTorrentDataFields,
			...getTorrentInfoFields,
			// Usenet fields
			...createUsenetDownloadFields,
			...controlUsenetDownloadFields,
			...requestUsenetDownloadLinkFields,
			...getUsenetListFields,
			...getUsenetCachedAvailabilityFields,
			// Web downloads fields
			...createWebDownloadFields,
			...controlWebDownloadFields,
			...requestWebDownloadLinkFields,
			...getWebDownloadListFields,
			...getWebDownloadCachedAvailabilityFields,
			// General fields
			...getSpeedtestFilesFields,
			// Notifications fields
			...clearSingleNotificationFields,
			// User fields
			...getUserDataFields,
			...addReferralToAccountFields,
			// RSS fields
			...addRssFeedFields,
			...controlRssFeedFields,
			...modifyRssFeedFields,
			...getRssFeedItemsFields,
			// Integrations fields
			...authenticateOAuthFields,
			...queueIntegrationFields,
			...getSpecificJobFields,
			...getAllJobsByHashFields,
			// Queued fields
			...getQueuedDownloadsFields,
			...controlQueuedDownloadsFields,
			// Stream fields
			...createStreamFields,
			...getStreamDataFields,
			// Search fields
			...getMetadataByIdFields,
			...getMetadataByQueryFields,
			...getTorrentDataByIdFields,
			...getTorrentDataByQueryFields,
			...getUsenetDataByIdFields,
			...getUsenetDataByQueryFields,
			// Vendors fields
			...registerNewVendorFields,
			...updateVendorAccountFields,
			...getVendorAccountsFields,
			...getSingleVendorAccountFields,
			...registerUserUnderVendorFields,
			...removeUserFromVendorFields,
			...refreshUserAccountsFields,
			// Relay fields
			...requestUpdateOnTorrentInfoFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const responseData = await executeTorBox.call(this, resource, operation, i);

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}