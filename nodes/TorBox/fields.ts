/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-type-options-password-missing */
import { INodeProperties } from 'n8n-workflow';

// =====================
// SHARED FIELDS
// =====================

export const downloadTypeField: INodeProperties = {
	displayName: 'Download Type',
	name: 'type',
	type: 'options',
	default: 'torrent',
	options: [
		{ name: 'Torrent', value: 'torrent' },
		{ name: 'Usenet', value: 'usenet' },
		{ name: 'Web Download', value: 'webdownload' },
	],
};

export const createTorrentFields: INodeProperties[] = [
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		default: 'magnet',
		displayOptions: { show: { resource: ['torrents'], operation: ['createTorrent'] } },
		options: [
			{ name: 'Magnet Link', value: 'magnet' },
			{ name: 'Torrent File', value: 'file' },
		],
	},
	{
		displayName: 'Magnet Link',
		name: 'magnet',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['torrents'], operation: ['createTorrent'], inputType: ['magnet'] } },
	},
	{
		displayName: 'Torrent File (Binary)',
		name: 'file',
		type: 'string',
		default: 'data',
		hint: 'The name of the input field containing the binary file data',
		displayOptions: { show: { resource: ['torrents'], operation: ['createTorrent'], inputType: ['file'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['torrents'], operation: ['createTorrent'] } },
		options: [
			{
				displayName: 'Add Only If Cached',
				name: 'add_only_if_cached',
				type: 'boolean',
				default: false,
				description: 'Whether to only add if already cached on TorBox',
			},
			{
				displayName: 'Allow Zip',
				name: 'allow_zip',
				type: 'boolean',
				default: true,
				description: 'Whether to allow zipping if torrent has 100+ files',
			},
			{
				displayName: 'As Queued',
				name: 'as_queued',
				type: 'boolean',
				default: false,
				description: 'Whether to instantly queue the torrent',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Custom name for the torrent',
			},
			{
				displayName: 'Seed Preference',
				name: 'seed',
				type: 'options',
				default: 1,
				options: [
					{ name: 'Auto', value: 1 },
					{ name: 'Always Seed', value: 2 },
					{ name: 'Never Seed', value: 3 },
				],
			},
		],
	},
];

export const controlTorrentFields: INodeProperties[] = [
	{
		displayName: 'Torrent ID',
		name: 'torrent_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['torrents'], operation: ['controlTorrent'] } },
	},
	{
		displayName: 'Control Operation',
		name: 'controlOperation',
		type: 'options',
		default: 'pause',
		required: true,
		displayOptions: { show: { resource: ['torrents'], operation: ['controlTorrent'] } },
		options: [
			{ name: 'Pause', value: 'pause' },
			{ name: 'Resume', value: 'resume' },
			{ name: 'Delete', value: 'delete' },
			{ name: 'Reannounce', value: 'reannounce' },
		],
	},
];

export const requestDownloadLinkFields: INodeProperties[] = [
	{
		displayName: 'Torrent ID',
		name: 'torrent_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['torrents'], operation: ['requestDownloadLink'] } },
	},
	{
		displayName: 'File ID',
		name: 'file_id',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: ['torrents'], operation: ['requestDownloadLink'] } },
		description: 'Specific file ID to download. Leave 0 for entire torrent.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['torrents'], operation: ['requestDownloadLink'] } },
		options: [
			{
				displayName: 'Zip Link',
				name: 'zip_link',
				type: 'boolean',
				default: false,
				description: 'Whether to get a zip download link',
			},
			{
				displayName: 'User IP',
				name: 'user_ip',
				type: 'string',
				default: '',
				description: 'User IP for region-optimized download',
			},
		],
	},
];

export const getTorrentListFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['torrents'], operation: ['getTorrentList'] } },
		options: [
			{
				displayName: 'Bypass Cache',
				name: 'bypass_cache',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Torrent ID',
				name: 'id',
				type: 'number',
				default: 0,
				description: 'Get a specific torrent by ID',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
			},
		],
	},
];

export const getTorrentCachedAvailabilityFields: INodeProperties[] = [
	{
		displayName: 'Hash',
		name: 'hash',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['torrents'], operation: ['getTorrentCachedAvailability'] } },
		description: 'Torrent hash to check (can be comma-separated for multiple)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['torrents'], operation: ['getTorrentCachedAvailability'] } },
		options: [
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				default: 'object',
				options: [
					{ name: 'Object', value: 'object' },
					{ name: 'List', value: 'list' },
				],
			},
			{
				displayName: 'List Files',
				name: 'list_files',
				type: 'boolean',
				default: false,
			},
		],
	},
];

export const exportTorrentDataFields: INodeProperties[] = [
	{
		displayName: 'Torrent ID',
		name: 'torrent_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['torrents'], operation: ['exportTorrentData'] } },
	},
	{
		displayName: 'Export Type',
		name: 'exportType',
		type: 'options',
		default: 'magnet',
		displayOptions: { show: { resource: ['torrents'], operation: ['exportTorrentData'] } },
		options: [
			{ name: 'Magnet', value: 'magnet' },
			{ name: 'Torrent File', value: 'file' },
		],
	},
];

export const getTorrentInfoFields: INodeProperties[] = [
	{
		displayName: 'Hash',
		name: 'hash',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['torrents'], operation: ['getTorrentInfo'] } },
	},
	{
		displayName: 'Timeout',
		name: 'timeout',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: ['torrents'], operation: ['getTorrentInfo'] } },
		description: 'Timeout in seconds',
	},
];

// =====================
// USENET FIELDS
// =====================

export const createUsenetDownloadFields: INodeProperties[] = [
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		default: 'link',
		displayOptions: { show: { resource: ['usenet'], operation: ['createUsenetDownload'] } },
		options: [
			{ name: 'Link', value: 'link' },
			{ name: 'NZB File', value: 'file' },
		],
	},
	{
		displayName: 'Link',
		name: 'link',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['usenet'], operation: ['createUsenetDownload'], inputType: ['link'] } },
	},
	{
		displayName: 'NZB File (Binary)',
		name: 'file',
		type: 'string',
		default: 'data',
		hint: 'The name of the input field containing the binary file data',
		displayOptions: { show: { resource: ['usenet'], operation: ['createUsenetDownload'], inputType: ['file'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['usenet'], operation: ['createUsenetDownload'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'As Queued',
				name: 'as_queued',
				type: 'boolean',
				default: false,
			},
		],
	},
];

export const controlUsenetDownloadFields: INodeProperties[] = [
	{
		displayName: 'Usenet ID',
		name: 'usenet_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['usenet'], operation: ['controlUsenetDownload'] } },
	},
	{
		displayName: 'Control Operation',
		name: 'controlOperation',
		type: 'options',
		default: 'pause',
		required: true,
		displayOptions: { show: { resource: ['usenet'], operation: ['controlUsenetDownload'] } },
		options: [
			{ name: 'Pause', value: 'pause' },
			{ name: 'Resume', value: 'resume' },
			{ name: 'Delete', value: 'delete' },
		],
	},
];

export const requestUsenetDownloadLinkFields: INodeProperties[] = [
	{
		displayName: 'Usenet ID',
		name: 'usenet_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['usenet'], operation: ['requestUsenetDownloadLink'] } },
	},
	{
		displayName: 'File ID',
		name: 'file_id',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: ['usenet'], operation: ['requestUsenetDownloadLink'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['usenet'], operation: ['requestUsenetDownloadLink'] } },
		options: [
			{
				displayName: 'Zip Link',
				name: 'zip_link',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'User IP',
				name: 'user_ip',
				type: 'string',
				default: '',
			},
		],
	},
];

export const getUsenetListFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['usenet'], operation: ['getUsenetList'] } },
		options: [
			{
				displayName: 'Bypass Cache',
				name: 'bypass_cache',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Usenet ID',
				name: 'id',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
			},
		],
	},
];

export const getUsenetCachedAvailabilityFields: INodeProperties[] = [
	{
		displayName: 'Hash',
		name: 'hash',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['usenet'], operation: ['getUsenetCachedAvailability'] } },
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		default: 'object',
		displayOptions: { show: { resource: ['usenet'], operation: ['getUsenetCachedAvailability'] } },
		options: [
			{ name: 'Object', value: 'object' },
			{ name: 'List', value: 'list' },
		],
	},
];

// =====================
// WEB DOWNLOADS FIELDS
// =====================

export const createWebDownloadFields: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'link',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['webdl'], operation: ['createWebDownload'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['webdl'], operation: ['createWebDownload'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'As Queued',
				name: 'as_queued',
				type: 'boolean',
				default: false,
			},
		],
	},
];

export const controlWebDownloadFields: INodeProperties[] = [
	{
		displayName: 'Web Download ID',
		name: 'web_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['webdl'], operation: ['controlWebDownload'] } },
	},
	{
		displayName: 'Control Operation',
		name: 'controlOperation',
		type: 'options',
		default: 'pause',
		required: true,
		displayOptions: { show: { resource: ['webdl'], operation: ['controlWebDownload'] } },
		options: [
			{ name: 'Pause', value: 'pause' },
			{ name: 'Resume', value: 'resume' },
			{ name: 'Delete', value: 'delete' },
		],
	},
];

export const requestWebDownloadLinkFields: INodeProperties[] = [
	{
		displayName: 'Web Download ID',
		name: 'web_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['webdl'], operation: ['requestWebDownloadLink'] } },
	},
	{
		displayName: 'File ID',
		name: 'file_id',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: ['webdl'], operation: ['requestWebDownloadLink'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['webdl'], operation: ['requestWebDownloadLink'] } },
		options: [
			{
				displayName: 'Zip Link',
				name: 'zip_link',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'User IP',
				name: 'user_ip',
				type: 'string',
				default: '',
			},
		],
	},
];

export const getWebDownloadListFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['webdl'], operation: ['getWebDownloadList'] } },
		options: [
			{
				displayName: 'Bypass Cache',
				name: 'bypass_cache',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Web Download ID',
				name: 'id',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
			},
		],
	},
];

export const getWebDownloadCachedAvailabilityFields: INodeProperties[] = [
	{
		displayName: 'Hash',
		name: 'hash',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['webdl'], operation: ['getWebDownloadCachedAvailability'] } },
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		default: 'object',
		displayOptions: { show: { resource: ['webdl'], operation: ['getWebDownloadCachedAvailability'] } },
		options: [
			{ name: 'Object', value: 'object' },
			{ name: 'List', value: 'list' },
		],
	},
];

// =====================
// GENERAL FIELDS
// =====================

export const getSpeedtestFilesFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['general'], operation: ['getSpeedtestFiles'] } },
		options: [
			{
				displayName: 'Test Length',
				name: 'test_length',
				type: 'options',
				default: '100mb',
				options: [
					{ name: '10MB', value: '10mb' },
					{ name: '100MB', value: '100mb' },
					{ name: '1GB', value: '1gb' },
					{ name: '10GB', value: '10gb' },
				],
			},
			{
				displayName: 'Region',
				name: 'region',
				type: 'string',
				default: '',
			},
		],
	},
];

// =====================
// NOTIFICATIONS FIELDS
// =====================

export const clearSingleNotificationFields: INodeProperties[] = [
	{
		displayName: 'Notification ID',
		name: 'notification_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['notifications'], operation: ['clearSingleNotification'] } },
	},
];

// =====================
// USER FIELDS
// =====================

export const getUserDataFields: INodeProperties[] = [
	{
		displayName: 'Include Settings',
		name: 'settings',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['user'], operation: ['getUserData'] } },
	},
];

export const addReferralToAccountFields: INodeProperties[] = [
	{
		displayName: 'Referral Code',
		name: 'referral',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['user'], operation: ['addReferralToAccount'] } },
	},
];

// =====================
// RSS FEEDS FIELDS
// =====================

export const addRssFeedFields: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['rss'], operation: ['addRssFeed'] } },
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['rss'], operation: ['addRssFeed'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['rss'], operation: ['addRssFeed'] } },
		options: [
			{
				displayName: 'Do Regex',
				name: 'do_regex',
				type: 'string',
				default: '',
				description: 'Regex of items you want to make sure are added',
			},
			{
				displayName: 'Don\'t Older Than (Days)',
				name: 'dont_older_than',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Don\'t Regex',
				name: 'dont_regex',
				type: 'string',
				default: '',
				description: 'Regex of items you don\'t want added',
			},
			{
				displayName: 'RSS Type',
				name: 'rss_type',
				type: 'options',
				default: 'torrent',
				options: [
					{ name: 'Torrent', value: 'torrent' },
					{ name: 'Usenet', value: 'usenet' },
					{ name: 'Web Download', value: 'webdl' },
				],
			},
			{
				displayName: 'Scan Interval (Minutes)',
				name: 'scan_interval',
				type: 'number',
				default: 60,
				description: 'Minimum is 10 minutes',
			},
			{
				displayName: 'Torrent Seeding',
				name: 'torrent_seeding',
				type: 'options',
				default: 1,
				options: [
					{ name: 'Auto', value: 1 },
					{ name: 'Always', value: 2 },
					{ name: 'Never', value: 3 },
				],
			},
		],
	},
];

export const controlRssFeedFields: INodeProperties[] = [
	{
		displayName: 'RSS Feed ID',
		name: 'rss_feed_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['rss'], operation: ['controlRssFeed'] } },
	},
	{
		displayName: 'Control Operation',
		name: 'controlOperation',
		type: 'options',
		default: 'pause',
		required: true,
		displayOptions: { show: { resource: ['rss'], operation: ['controlRssFeed'] } },
		options: [
			{ name: 'Pause', value: 'pause' },
			{ name: 'Resume', value: 'resume' },
			{ name: 'Delete', value: 'delete' },
			{ name: 'Update', value: 'update' },
		],
	},
];

export const modifyRssFeedFields: INodeProperties[] = [
	{
		displayName: 'RSS Feed ID',
		name: 'rss_feed_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['rss'], operation: ['modifyRssFeed'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['rss'], operation: ['modifyRssFeed'] } },
		options: [
			{
				displayName: 'Do Regex',
				name: 'do_regex',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Don\'t Older Than (Days)',
				name: 'dont_older_than',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Don\'t Regex',
				name: 'dont_regex',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'RSS Type',
				name: 'rss_type',
				type: 'options',
				default: 'torrent',
				options: [
					{ name: 'Torrent', value: 'torrent' },
					{ name: 'Usenet', value: 'usenet' },
					{ name: 'Web Download', value: 'webdl' },
				],
			},
			{
				displayName: 'Scan Interval (Minutes)',
				name: 'scan_interval',
				type: 'number',
				default: 60,
			},
			{
				displayName: 'Torrent Seeding',
				name: 'torrent_seeding',
				type: 'options',
				default: 1,
				options: [
					{ name: 'Auto', value: 1 },
					{ name: 'Always', value: 2 },
					{ name: 'Never', value: 3 },
				],
			},
		],
	},
];

export const getRssFeedItemsFields: INodeProperties[] = [
	{
		displayName: 'RSS Feed ID',
		name: 'rss_feed_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['rss'], operation: ['getRssFeedItems'] } },
	},
];

// =====================
// INTEGRATIONS FIELDS
// =====================

export const authenticateOAuthFields: INodeProperties[] = [
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'options',
		default: 'google',
		required: true,
		displayOptions: { show: { resource: ['integrations'], operation: ['authenticateOAuth'] } },
		options: [
			{ name: 'Google Drive', value: 'google' },
			{ name: 'OneDrive', value: 'onedrive' },
			{ name: 'Dropbox', value: 'dropbox' },
		],
	},
];

export const queueIntegrationFields: INodeProperties[] = [
	{
		displayName: 'Download ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['integrations'],
				operation: ['queueGoogleDrive', 'queuePixeldrain', 'queueOneDrive', 'queueGoFile', 'queue1Fichier'],
			},
		},
	},
	{
		displayName: 'Download Type',
		name: 'type',
		type: 'options',
		default: 'torrent',
		required: true,
		displayOptions: {
			show: {
				resource: ['integrations'],
				operation: ['queueGoogleDrive', 'queuePixeldrain', 'queueOneDrive', 'queueGoFile', 'queue1Fichier'],
			},
		},
		options: [
			{ name: 'Torrent', value: 'torrent' },
			{ name: 'Usenet', value: 'usenet' },
			{ name: 'Web Download', value: 'webdownload' },
		],
	},
	{
		displayName: 'File ID',
		name: 'file_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['integrations'],
				operation: ['queueGoogleDrive', 'queuePixeldrain', 'queueOneDrive', 'queueGoFile', 'queue1Fichier'],
			},
		},
		description: 'Required if not using zip',
	},
	{
		displayName: 'Zip',
		name: 'zip',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['integrations'],
				operation: ['queueGoogleDrive', 'queuePixeldrain', 'queueOneDrive', 'queueGoFile', 'queue1Fichier'],
			},
		},
	},
	{
		displayName: 'Google Token',
		name: 'google_token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		required: true,
		displayOptions: { show: { resource: ['integrations'], operation: ['queueGoogleDrive'] } },
	},
	{
		displayName: 'OneDrive Token',
		name: 'onedrive_token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		required: true,
		displayOptions: { show: { resource: ['integrations'], operation: ['queueOneDrive'] } },
	},
	{
		displayName: 'GoFile Token',
		name: 'gofile_token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		displayOptions: { show: { resource: ['integrations'], operation: ['queueGoFile'] } },
	},
	{
		displayName: '1Fichier Token',
		name: 'onefichier_token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		displayOptions: { show: { resource: ['integrations'], operation: ['queue1Fichier'] } },
	},
];

export const getSpecificJobFields: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'job_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['integrations'], operation: ['getSpecificJob', 'cancelSpecificJob'] } },
	},
];

export const getAllJobsByHashFields: INodeProperties[] = [
	{
		displayName: 'Hash',
		name: 'hash',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['integrations'], operation: ['getAllJobsByHash'] } },
	},
];

// =====================
// QUEUED FIELDS
// =====================

export const getQueuedDownloadsFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['queued'], operation: ['getQueuedDownloads'] } },
		options: [
			{
				displayName: 'Bypass Cache',
				name: 'bypass_cache',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Torrent', value: 'torrent' },
					{ name: 'Usenet', value: 'usenet' },
					{ name: 'Web Download', value: 'webdl' },
				],
			},
		],
	},
];

export const controlQueuedDownloadsFields: INodeProperties[] = [
	{
		displayName: 'Queued ID',
		name: 'queued_id',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: ['queued'], operation: ['controlQueuedDownloads'] } },
		description: 'Optional if using "all" parameter',
	},
	{
		displayName: 'Control Operation',
		name: 'controlOperation',
		type: 'options',
		default: 'delete',
		required: true,
		displayOptions: { show: { resource: ['queued'], operation: ['controlQueuedDownloads'] } },
		options: [
			{ name: 'Delete', value: 'delete' },
			{ name: 'Start', value: 'start' },
		],
	},
	{
		displayName: 'Apply To All',
		name: 'all',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['queued'], operation: ['controlQueuedDownloads'] } },
	},
];

// =====================
// STREAM FIELDS
// =====================

export const createStreamFields: INodeProperties[] = [
	{
		displayName: 'Download ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['stream'], operation: ['createStream'] } },
	},
	{
		displayName: 'Download Type',
		name: 'type',
		type: 'options',
		default: 'torrent',
		required: true,
		displayOptions: { show: { resource: ['stream'], operation: ['createStream'] } },
		options: [
			{ name: 'Torrent', value: 'torrent' },
			{ name: 'Usenet', value: 'usenet' },
			{ name: 'Web Download', value: 'webdownload' },
		],
	},
	{
		displayName: 'File ID',
		name: 'file_id',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: ['stream'], operation: ['createStream'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['stream'], operation: ['createStream'] } },
		options: [
			{
				displayName: 'Chosen Subtitle Index',
				name: 'chosen_subtitle_index',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Chosen Audio Index',
				name: 'chosen_audio_index',
				type: 'number',
				default: 0,
			},
		],
	},
];

export const getStreamDataFields: INodeProperties[] = [
	{
		displayName: 'Presigned Token',
		name: 'presigned_token',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['stream'], operation: ['getStreamData'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['stream'], operation: ['getStreamData'] } },
		options: [
			{
				displayName: 'Chosen Subtitle Index',
				name: 'chosen_subtitle_index',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Chosen Audio Index',
				name: 'chosen_audio_index',
				type: 'number',
				default: 0,
			},
		],
	},
];

// =====================
// SEARCH FIELDS
// =====================

export const getMetadataByIdFields: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'id_type',
		type: 'options',
		default: 'imdb',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getMetadataById'] } },
		options: [
			{ name: 'IMDB', value: 'imdb' },
			{ name: 'TMDB', value: 'tmdb' },
			{ name: 'TVDB', value: 'tvdb' },
			{ name: 'MAL', value: 'mal' },
		],
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getMetadataById'] } },
		description: 'The ID value (e.g., tt0080684 for IMDB)',
	},
];

export const getMetadataByQueryFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getMetadataByQuery'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['search'], operation: ['getMetadataByQuery'] } },
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'media',
				options: [
					{ name: 'Media', value: 'media' },
					{ name: 'File', value: 'file' },
				],
			},
		],
	},
];

export const getTorrentDataByIdFields: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'id_type',
		type: 'options',
		default: 'imdb',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getTorrentDataById'] } },
		options: [
			{ name: 'IMDB', value: 'imdb' },
			{ name: 'TMDB', value: 'tmdb' },
			{ name: 'TVDB', value: 'tvdb' },
			{ name: 'MAL', value: 'mal' },
		],
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getTorrentDataById'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['search'], operation: ['getTorrentDataById'] } },
		options: [
			{ displayName: 'Check Cache', name: 'check_cache', type: 'boolean', default: false },
			{ displayName: 'Check Owned', name: 'check_owned', type: 'boolean', default: false },
			{ displayName: 'Episode', name: 'episode', type: 'number', default: 0 },
			{ displayName: 'Metadata', name: 'metadata', type: 'boolean', default: false },
			{ displayName: 'Search User Engines', name: 'search_user_engines', type: 'boolean', default: false },
			{ displayName: 'Season', name: 'season', type: 'number', default: 0 },
		],
	},
];

export const getTorrentDataByQueryFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getTorrentDataByQuery'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['search'], operation: ['getTorrentDataByQuery'] } },
		options: [
			{ displayName: 'Metadata', name: 'metadata', type: 'boolean', default: false },
			{ displayName: 'Check Cache', name: 'check_cache', type: 'boolean', default: false },
			{ displayName: 'Check Owned', name: 'check_owned', type: 'boolean', default: false },
			{ displayName: 'Search User Engines', name: 'search_user_engines', type: 'boolean', default: false },
		],
	},
];

export const getUsenetDataByIdFields: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'id_type',
		type: 'options',
		default: 'imdb',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getUsenetDataById'] } },
		options: [
			{ name: 'IMDB', value: 'imdb' },
			{ name: 'TMDB', value: 'tmdb' },
			{ name: 'TVDB', value: 'tvdb' },
			{ name: 'MAL', value: 'mal' },
		],
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getUsenetDataById'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['search'], operation: ['getUsenetDataById'] } },
		options: [
			{ displayName: 'Check Cache', name: 'check_cache', type: 'boolean', default: false },
			{ displayName: 'Check Owned', name: 'check_owned', type: 'boolean', default: false },
			{ displayName: 'Episode', name: 'episode', type: 'number', default: 0 },
			{ displayName: 'Metadata', name: 'metadata', type: 'boolean', default: false },
			{ displayName: 'Search User Engines', name: 'search_user_engines', type: 'boolean', default: false },
			{ displayName: 'Season', name: 'season', type: 'number', default: 0 },
		],
	},
];

export const getUsenetDataByQueryFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['search'], operation: ['getUsenetDataByQuery'] } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['search'], operation: ['getUsenetDataByQuery'] } },
		options: [
			{ displayName: 'Check Cache', name: 'check_cache', type: 'boolean', default: false },
			{ displayName: 'Check Owned', name: 'check_owned', type: 'boolean', default: false },
			{ displayName: 'Episode', name: 'episode', type: 'number', default: 0 },
			{ displayName: 'Metadata', name: 'metadata', type: 'boolean', default: false },
			{ displayName: 'Search User Engines', name: 'search_user_engines', type: 'boolean', default: false },
			{ displayName: 'Season', name: 'season', type: 'number', default: 0 },
		],
	},
];

// =====================
// VENDORS FIELDS
// =====================

export const registerNewVendorFields: INodeProperties[] = [
	{
		displayName: 'Vendor Name',
		name: 'vendor_name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['vendors'], operation: ['registerNewVendor'] } },
	},
	{
		displayName: 'Vendor URL',
		name: 'vendor_url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['vendors'], operation: ['registerNewVendor'] } },
	},
];

export const updateVendorAccountFields: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['vendors'], operation: ['updateVendorAccount'] } },
		options: [
			{ displayName: 'Vendor Name', name: 'vendor_name', type: 'string', default: '' },
			{ displayName: 'Vendor URL', name: 'vendor_url', type: 'string', default: '' },
		],
	},
];

export const getVendorAccountsFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['vendors'], operation: ['getVendorAccounts'] } },
		options: [
			{ displayName: 'Offset', name: 'offset', type: 'number', default: 0 },
			{ displayName: 'Limit', name: 'limit', type: 'number',
																																										typeOptions: {
																																											minValue: 1,
																																										},
																																										description: 'Max number of results to return', default: 50 },
		],
	},
];

export const getSingleVendorAccountFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['vendors'], operation: ['getSingleVendorAccount'] } },
	},
];

export const registerUserUnderVendorFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['vendors'], operation: ['registerUserUnderVendor'] } },
	},
];

export const removeUserFromVendorFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['vendors'], operation: ['removeUserFromVendor'] } },
	},
];

export const refreshUserAccountsFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['vendors'], operation: ['refreshUserAccounts'] } },
	},
];

// =====================
// RELAY FIELDS
// =====================

export const requestUpdateOnTorrentInfoFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['relay'], operation: ['requestUpdateOnTorrentInfo'] } },
	},
	{
		displayName: 'Torrent ID',
		name: 'torrent_id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: { resource: ['relay'], operation: ['requestUpdateOnTorrentInfo'] } },
	},
];
