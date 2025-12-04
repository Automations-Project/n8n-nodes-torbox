/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const torBoxResources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		default: 'torrents',
		options: [
			{ name: 'Torrent', value: 'torrents' },
			{ name: 'Usenet', value: 'usenet' },
			{ name: 'Web Download', value: 'webdl' },
			{ name: 'General', value: 'general' },
			{ name: 'Notification', value: 'notifications' },
			{ name: 'User', value: 'user' },
			{ name: 'RSS Feed', value: 'rss' },
			{ name: 'Integration', value: 'integrations' },
			{ name: 'Queued', value: 'queued' },
			{ name: 'Stream', value: 'stream' },
			{ name: 'Search', value: 'search' },
			{ name: 'Vendor', value: 'vendors' },
			{ name: 'Relay', value: 'relay' },
		],
	},
];

export const torrentsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'createTorrent',
		displayOptions: { show: { resource: ['torrents'] } },
		options: [
			{
				name: 'Create Torrent',
				value: 'createTorrent',
				action: 'Create a torrent',
			},
			{
				name: 'Control Torrent',
				value: 'controlTorrent',
				action: 'Control a torrent',
			},
			{
				name: 'Request Download Link',
				value: 'requestDownloadLink',
				action: 'Request download link for a torrent',
			},
			{
				name: 'Get Torrent List',
				value: 'getTorrentList',
				action: 'Get torrent list',
			},
			{
				name: 'Get Torrent Cached Availability',
				value: 'getTorrentCachedAvailability',
				action: 'Check torrent cached availability',
			},
			{
				name: 'Export Torrent Data',
				value: 'exportTorrentData',
				action: 'Export torrent data',
			},
			{
				name: 'Get Torrent Info',
				value: 'getTorrentInfo',
				action: 'Get torrent info',
			},
		],
	},
];

export const usenetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'createUsenetDownload',
		displayOptions: { show: { resource: ['usenet'] } },
		options: [
			{
				name: 'Create Usenet Download',
				value: 'createUsenetDownload',
				action: 'Create a usenet download',
			},
			{
				name: 'Control Usenet Download',
				value: 'controlUsenetDownload',
				action: 'Control a usenet download',
			},
			{
				name: 'Request Download Link',
				value: 'requestUsenetDownloadLink',
				action: 'Request download link for usenet',
			},
			{
				name: 'Get Usenet List',
				value: 'getUsenetList',
				action: 'Get usenet list',
			},
			{
				name: 'Get Usenet Cached Availability',
				value: 'getUsenetCachedAvailability',
				action: 'Check usenet cached availability',
			},
		],
	},
];

export const webdlOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'createWebDownload',
		displayOptions: { show: { resource: ['webdl'] } },
		options: [
			{
				name: 'Create Web Download',
				value: 'createWebDownload',
				action: 'Create a web download',
			},
			{
				name: 'Control Web Download',
				value: 'controlWebDownload',
				action: 'Control a web download',
			},
			{
				name: 'Request Download Link',
				value: 'requestWebDownloadLink',
				action: 'Request download link for web download',
			},
			{
				name: 'Get Web Download List',
				value: 'getWebDownloadList',
				action: 'Get web download list',
			},
			{
				name: 'Get Web Download Cached Availability',
				value: 'getWebDownloadCachedAvailability',
				action: 'Check web download cached availability',
			},
			{
				name: 'Get Hoster List',
				value: 'getHosterList',
				action: 'Get supported hosters list',
			},
		],
	},
];

export const generalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getUpStatus',
		displayOptions: { show: { resource: ['general'] } },
		options: [
			{
				name: 'Get Up Status',
				value: 'getUpStatus',
				action: 'Get API status',
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				action: 'Get tor box stats',
			},
			{
				name: 'Get Changelogs RSS Feed',
				value: 'getChangelogsRss',
				action: 'Get changelogs RSS feed',
			},
			{
				name: 'Get Changelogs JSON',
				value: 'getChangelogsJson',
				action: 'Get changelogs JSON',
			},
			{
				name: 'Get Speedtest Files',
				value: 'getSpeedtestFiles',
				action: 'Get speedtest files',
			},
		],
	},
];

export const notificationsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getNotificationFeed',
		displayOptions: { show: { resource: ['notifications'] } },
		options: [
			{
				name: 'Get RSS Notification Feed',
				value: 'getRssNotificationFeed',
				action: 'Get RSS notification feed',
			},
			{
				name: 'Get Notification Feed',
				value: 'getNotificationFeed',
				action: 'Get notification feed',
			},
			{
				name: 'Clear All Notifications',
				value: 'clearAllNotifications',
				action: 'Clear all notifications',
			},
			{
				name: 'Clear Single Notification',
				value: 'clearSingleNotification',
				action: 'Clear a single notification',
			},
			{
				name: 'Send Test Notification',
				value: 'sendTestNotification',
				action: 'Send test notification',
			},
		],
	},
];

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getUserData',
		displayOptions: { show: { resource: ['user'] } },
		options: [
			{
				name: 'Refresh API Token',
				value: 'refreshApiToken',
				action: 'Refresh API token',
			},
			{
				name: 'Get User Data',
				value: 'getUserData',
				action: 'Get user data',
			},
			{
				name: 'Add Referral To Account',
				value: 'addReferralToAccount',
				action: 'Add referral to account',
			},
			{
				name: 'Get Confirmation Code',
				value: 'getConfirmationCode',
				action: 'Get confirmation code',
			},
		],
	},
];

export const rssOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getUserRssFeeds',
		displayOptions: { show: { resource: ['rss'] } },
		options: [
			{
				name: 'Add RSS Feed',
				value: 'addRssFeed',
				action: 'Add an RSS feed',
			},
			{
				name: 'Control RSS Feed',
				value: 'controlRssFeed',
				action: 'Control an RSS feed',
			},
			{
				name: 'Modify RSS Feed',
				value: 'modifyRssFeed',
				action: 'Modify an RSS feed',
			},
			{
				name: 'Get User RSS Feeds',
				value: 'getUserRssFeeds',
				action: 'Get user RSS feeds',
			},
			{
				name: 'Get RSS Feed Items',
				value: 'getRssFeedItems',
				action: 'Get RSS feed items',
			},
		],
	},
];

export const integrationsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAllJobs',
		displayOptions: { show: { resource: ['integrations'] } },
		options: [
			{
				name: 'Authenticate OAuth',
				value: 'authenticateOAuth',
				action: 'Authenticate o auth',
			},
			{
				name: 'Queue Google Drive',
				value: 'queueGoogleDrive',
				action: 'Queue to google drive',
			},
			{
				name: 'Queue Pixeldrain',
				value: 'queuePixeldrain',
				action: 'Queue to pixeldrain',
			},
			{
				name: 'Queue OneDrive',
				value: 'queueOneDrive',
				action: 'Queue to one drive',
			},
			{
				name: 'Queue GoFile',
				value: 'queueGoFile',
				action: 'Queue to go file',
			},
			{
				name: 'Queue 1Fichier',
				value: 'queue1Fichier',
				action: 'Queue to 1 fichier',
			},
			{
				name: 'Get All Jobs',
				value: 'getAllJobs',
				action: 'Get all integration jobs',
			},
			{
				name: 'Get Specific Job',
				value: 'getSpecificJob',
				action: 'Get specific job',
			},
			{
				name: 'Get All Jobs By Hash',
				value: 'getAllJobsByHash',
				action: 'Get all jobs by hash',
			},
			{
				name: 'Cancel Specific Job',
				value: 'cancelSpecificJob',
				action: 'Cancel specific job',
			},
		],
	},
];

export const queuedOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getQueuedDownloads',
		displayOptions: { show: { resource: ['queued'] } },
		options: [
			{
				name: 'Get Queued Downloads',
				value: 'getQueuedDownloads',
				action: 'Get queued downloads',
			},
			{
				name: 'Control Queued Downloads',
				value: 'controlQueuedDownloads',
				action: 'Control queued downloads',
			},
		],
	},
];

export const streamOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'createStream',
		displayOptions: { show: { resource: ['stream'] } },
		options: [
			{
				name: 'Create Stream',
				value: 'createStream',
				action: 'Create a stream',
			},
			{
				name: 'Get Stream Data',
				value: 'getStreamData',
				action: 'Get stream data',
			},
		],
	},
];

export const searchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getMetadataById',
		displayOptions: { show: { resource: ['search'] } },
		options: [
			{
				name: 'Get Metadata By ID',
				value: 'getMetadataById',
				action: 'Get metadata by ID',
			},
			{
				name: 'Get Metadata By Query',
				value: 'getMetadataByQuery',
				action: 'Get metadata by query',
			},
			{
				name: 'Get Torrent Data By ID',
				value: 'getTorrentDataById',
				action: 'Get torrent data by ID',
			},
			{
				name: 'Get Torrent Data By Query',
				value: 'getTorrentDataByQuery',
				action: 'Get torrent data by query',
			},
			{
				name: 'Get Usenet Data By ID',
				value: 'getUsenetDataById',
				action: 'Get usenet data by ID',
			},
			{
				name: 'Get Usenet Data By Query',
				value: 'getUsenetDataByQuery',
				action: 'Get usenet data by query',
			},
		],
	},
];

export const vendorsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getVendorAccount',
		displayOptions: { show: { resource: ['vendors'] } },
		options: [
			{
				name: 'Register New Vendor',
				value: 'registerNewVendor',
				action: 'Register new vendor',
			},
			{
				name: 'Get Vendor Account',
				value: 'getVendorAccount',
				action: 'Get vendor account',
			},
			{
				name: 'Update Vendor Account',
				value: 'updateVendorAccount',
				action: 'Update vendor account',
			},
			{
				name: 'Get Vendor TorBox Accounts',
				value: 'getVendorAccounts',
				action: 'Get vendor tor box accounts',
			},
			{
				name: 'Get Single Vendor TorBox Account',
				value: 'getSingleVendorAccount',
				action: 'Get single vendor tor box account',
			},
			{
				name: 'Register New User Under Vendor',
				value: 'registerUserUnderVendor',
				action: 'Register new user under vendor',
			},
			{
				name: 'Remove User From Vendor',
				value: 'removeUserFromVendor',
				action: 'Remove user from vendor',
			},
			{
				name: 'Refresh User Accounts',
				value: 'refreshUserAccounts',
				action: 'Refresh user accounts',
			},
		],
	},
];

export const relayOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getCurrentUsersOnline',
		displayOptions: { show: { resource: ['relay'] } },
		options: [
			{
				name: 'Get Current Users Online',
				value: 'getCurrentUsersOnline',
				action: 'Get current users online',
			},
			{
				name: 'Request Update On Torrent Info',
				value: 'requestUpdateOnTorrentInfo',
				action: 'Request update on torrent info',
			},
		],
	},
];