import { IExecuteFunctions, IHttpRequestMethods, IDataObject, NodeApiError } from 'n8n-workflow';

const API_BASE = 'https://api.torbox.app';
const API_VERSION = 'v1';

interface TorBoxResponse {
	success: boolean;
	error?: string;
	detail?: string;
	data?: unknown;
}

async function torBoxApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	qs?: IDataObject,
): Promise<TorBoxResponse> {
	const credentials = await this.getCredentials('torBoxApi');
	const options: {
		method: IHttpRequestMethods;
		headers: Record<string, string>;
		qs?: IDataObject;
		body?: IDataObject;
		url: string;
	} = {
		method,
		headers: {
			Authorization: `Bearer ${credentials.apiKey}`,
		},
		url: `${API_BASE}/${API_VERSION}/api/${endpoint}`,
	};

	if (qs && Object.keys(qs).length > 0) {
		options.qs = qs;
	}

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	const response = await this.helpers.httpRequest(options);
	
	if (!response.success) {
		throw new NodeApiError(this.getNode(), response, {
			message: response.detail || 'TorBox API request failed',
		});
	}

	return response;
}

async function torBoxApiRequestFormData(
	this: IExecuteFunctions,
	endpoint: string,
	formData: IDataObject,
): Promise<TorBoxResponse> {
	const credentials = await this.getCredentials('torBoxApi');
	
	const response = await this.helpers.httpRequest({
		method: 'POST',
		headers: {
			Authorization: `Bearer ${credentials.apiKey}`,
			'Content-Type': 'multipart/form-data',
		},
		url: `${API_BASE}/${API_VERSION}/api/${endpoint}`,
		body: formData,
	});

	if (!response.success) {
		throw new NodeApiError(this.getNode(), response, {
			message: response.detail || 'TorBox API request failed',
		});
	}

	return response;
}

// =====================
// TORRENTS
// =====================

export async function createTorrent(this: IExecuteFunctions, i: number) {
	const inputType = this.getNodeParameter('inputType', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	
	const formData: IDataObject = {};

	if (inputType === 'magnet') {
		formData.magnet = this.getNodeParameter('magnet', i) as string;
	} else {
		const binaryPropertyName = this.getNodeParameter('file', i) as string;
		const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
		formData.file = {
			value: Buffer.from(binaryData.data, 'base64'),
			options: {
				filename: binaryData.fileName || 'file.torrent',
				contentType: binaryData.mimeType,
			},
		};
	}

	if (options.name) formData.name = options.name;
	if (options.seed) formData.seed = options.seed;
	if (options.allow_zip !== undefined) formData.allow_zip = options.allow_zip;
	if (options.as_queued !== undefined) formData.as_queued = options.as_queued;
	if (options.add_only_if_cached !== undefined) formData.add_only_if_cached = options.add_only_if_cached;

	return torBoxApiRequestFormData.call(this, 'torrents/createtorrent', formData);
}

export async function controlTorrent(this: IExecuteFunctions, i: number) {
	const torrentId = this.getNodeParameter('torrent_id', i) as number;
	const operation = this.getNodeParameter('controlOperation', i) as string;

	return torBoxApiRequest.call(this, 'POST', 'torrents/controltorrent', {
		torrent_id: torrentId,
		operation,
	});
}

export async function requestDownloadLink(this: IExecuteFunctions, i: number) {
	const credentials = await this.getCredentials('torBoxApi');
	const torrentId = this.getNodeParameter('torrent_id', i) as number;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {
		token: credentials.apiKey,
		torrent_id: torrentId,
	};

	if (fileId) qs.file_id = fileId;
	if (options.zip_link) qs.zip_link = options.zip_link;
	if (options.user_ip) qs.user_ip = options.user_ip;

	return torBoxApiRequest.call(this, 'GET', 'torrents/requestdl', undefined, qs);
}

export async function getTorrentList(this: IExecuteFunctions, i: number) {
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	const qs: IDataObject = {};

	if (options.bypass_cache) qs.bypass_cache = options.bypass_cache;
	if (options.id) qs.id = options.id;
	if (options.offset) qs.offset = options.offset;
	if (options.limit) qs.limit = options.limit;

	return torBoxApiRequest.call(this, 'GET', 'torrents/mylist', undefined, qs);
}

export async function getTorrentCachedAvailability(this: IExecuteFunctions, i: number) {
	const hash = this.getNodeParameter('hash', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = { hash };
	if (options.format) qs.format = options.format;
	if (options.list_files) qs.list_files = options.list_files;

	return torBoxApiRequest.call(this, 'GET', 'torrents/checkcached', undefined, qs);
}

export async function exportTorrentData(this: IExecuteFunctions, i: number) {
	const torrentId = this.getNodeParameter('torrent_id', i) as number;
	const exportType = this.getNodeParameter('exportType', i) as string;

	return torBoxApiRequest.call(this, 'GET', 'torrents/exportdata', undefined, {
		torrent_id: torrentId,
		type: exportType,
	});
}

export async function getTorrentInfo(this: IExecuteFunctions, i: number) {
	const hash = this.getNodeParameter('hash', i) as string;
	const timeout = this.getNodeParameter('timeout', i, 10) as number;

	return torBoxApiRequest.call(this, 'GET', 'torrents/torrentinfo', undefined, {
		hash,
		timeout,
	});
}

// =====================
// USENET
// =====================

export async function createUsenetDownload(this: IExecuteFunctions, i: number) {
	const inputType = this.getNodeParameter('inputType', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	
	const formData: IDataObject = {};

	if (inputType === 'link') {
		formData.link = this.getNodeParameter('link', i) as string;
	} else {
		const binaryPropertyName = this.getNodeParameter('file', i) as string;
		const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
		formData.file = {
			value: Buffer.from(binaryData.data, 'base64'),
			options: {
				filename: binaryData.fileName || 'file.nzb',
				contentType: binaryData.mimeType,
			},
		};
	}

	if (options.name) formData.name = options.name;
	if (options.as_queued !== undefined) formData.as_queued = options.as_queued;

	return torBoxApiRequestFormData.call(this, 'usenet/createusenetdownload', formData);
}

export async function controlUsenetDownload(this: IExecuteFunctions, i: number) {
	const usenetId = this.getNodeParameter('usenet_id', i) as number;
	const operation = this.getNodeParameter('controlOperation', i) as string;

	return torBoxApiRequest.call(this, 'POST', 'usenet/controlusenetdownload', {
		usenet_id: usenetId,
		operation,
	});
}

export async function requestUsenetDownloadLink(this: IExecuteFunctions, i: number) {
	const credentials = await this.getCredentials('torBoxApi');
	const usenetId = this.getNodeParameter('usenet_id', i) as number;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {
		token: credentials.apiKey,
		usenet_id: usenetId,
	};

	if (fileId) qs.file_id = fileId;
	if (options.zip_link) qs.zip_link = options.zip_link;
	if (options.user_ip) qs.user_ip = options.user_ip;

	return torBoxApiRequest.call(this, 'GET', 'usenet/requestdl', undefined, qs);
}

export async function getUsenetList(this: IExecuteFunctions, i: number) {
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	const qs: IDataObject = {};

	if (options.bypass_cache) qs.bypass_cache = options.bypass_cache;
	if (options.id) qs.id = options.id;
	if (options.offset) qs.offset = options.offset;
	if (options.limit) qs.limit = options.limit;

	return torBoxApiRequest.call(this, 'GET', 'usenet/mylist', undefined, qs);
}

export async function getUsenetCachedAvailability(this: IExecuteFunctions, i: number) {
	const hash = this.getNodeParameter('hash', i) as string;
	const format = this.getNodeParameter('format', i, 'object') as string;

	return torBoxApiRequest.call(this, 'GET', 'usenet/checkcached', undefined, { hash, format });
}

// =====================
// WEB DOWNLOADS
// =====================

export async function createWebDownload(this: IExecuteFunctions, i: number) {
	const link = this.getNodeParameter('link', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	
	const formData: IDataObject = { link };

	if (options.name) formData.name = options.name;
	if (options.as_queued !== undefined) formData.as_queued = options.as_queued;

	return torBoxApiRequestFormData.call(this, 'webdl/createwebdownload', formData);
}

export async function controlWebDownload(this: IExecuteFunctions, i: number) {
	const webId = this.getNodeParameter('web_id', i) as number;
	const operation = this.getNodeParameter('controlOperation', i) as string;

	return torBoxApiRequest.call(this, 'POST', 'webdl/controlwebdownload', {
		web_id: webId,
		operation,
	});
}

export async function requestWebDownloadLink(this: IExecuteFunctions, i: number) {
	const credentials = await this.getCredentials('torBoxApi');
	const webId = this.getNodeParameter('web_id', i) as number;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {
		token: credentials.apiKey,
		web_id: webId,
	};

	if (fileId) qs.file_id = fileId;
	if (options.zip_link) qs.zip_link = options.zip_link;
	if (options.user_ip) qs.user_ip = options.user_ip;

	return torBoxApiRequest.call(this, 'GET', 'webdl/requestdl', undefined, qs);
}

export async function getWebDownloadList(this: IExecuteFunctions, i: number) {
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	const qs: IDataObject = {};

	if (options.bypass_cache) qs.bypass_cache = options.bypass_cache;
	if (options.id) qs.id = options.id;
	if (options.offset) qs.offset = options.offset;
	if (options.limit) qs.limit = options.limit;

	return torBoxApiRequest.call(this, 'GET', 'webdl/mylist', undefined, qs);
}

export async function getWebDownloadCachedAvailability(this: IExecuteFunctions, i: number) {
	const hash = this.getNodeParameter('hash', i) as string;
	const format = this.getNodeParameter('format', i, 'object') as string;

	return torBoxApiRequest.call(this, 'GET', 'webdl/checkcached', undefined, { hash, format });
}

export async function getHosterList(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'webdl/hosters');
}

// =====================
// GENERAL
// =====================

export async function getUpStatus(this: IExecuteFunctions) {
	const credentials = await this.getCredentials('torBoxApi');
	const response = await this.helpers.httpRequest({
		method: 'GET',
		headers: { Authorization: `Bearer ${credentials.apiKey}` },
		url: API_BASE,
	});
	return response;
}

export async function getStats(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'stats');
}

export async function getChangelogsRss(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'changelogs/rss');
}

export async function getChangelogsJson(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'changelogs/json');
}

export async function getSpeedtestFiles(this: IExecuteFunctions, i: number) {
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	const qs: IDataObject = {};

	if (options.test_length) qs.test_length = options.test_length;
	if (options.region) qs.region = options.region;

	return torBoxApiRequest.call(this, 'GET', 'speedtest', undefined, qs);
}

// =====================
// NOTIFICATIONS
// =====================

export async function getRssNotificationFeed(this: IExecuteFunctions) {
	const credentials = await this.getCredentials('torBoxApi');
	return torBoxApiRequest.call(this, 'GET', 'notifications/rss', undefined, {
		token: credentials.apiKey,
	});
}

export async function getNotificationFeed(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'notifications/mynotifications');
}

export async function clearAllNotifications(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'POST', 'notifications/clear');
}

export async function clearSingleNotification(this: IExecuteFunctions, i: number) {
	const notificationId = this.getNodeParameter('notification_id', i) as number;
	return torBoxApiRequest.call(this, 'POST', `notifications/clear/${notificationId}`);
}

export async function sendTestNotification(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'POST', 'notifications/test');
}

// =====================
// USER
// =====================

export async function refreshApiToken(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'POST', 'user/refreshtoken');
}

export async function getUserData(this: IExecuteFunctions, i: number) {
	const settings = this.getNodeParameter('settings', i, false) as boolean;
	return torBoxApiRequest.call(this, 'GET', 'user/me', undefined, { settings });
}

export async function addReferralToAccount(this: IExecuteFunctions, i: number) {
	const referral = this.getNodeParameter('referral', i) as string;
	return torBoxApiRequest.call(this, 'POST', 'user/addreferral', undefined, { referral });
}

export async function getConfirmationCode(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'user/getconfirmation');
}

// =====================
// RSS FEEDS
// =====================

export async function addRssFeed(this: IExecuteFunctions, i: number) {
	const url = this.getNodeParameter('url', i) as string;
	const name = this.getNodeParameter('name', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const body: IDataObject = { url, name };

	if (options.rss_type) body.rss_type = options.rss_type;
	if (options.do_regex) body.do_regex = options.do_regex;
	if (options.dont_regex) body.dont_regex = options.dont_regex;
	if (options.dont_older_than) body.dont_older_than = options.dont_older_than;
	if (options.scan_interval) body.scan_interval = options.scan_interval;
	if (options.torrent_seeding) body.torrent_seeding = options.torrent_seeding;

	return torBoxApiRequest.call(this, 'POST', 'rss/addrss', body);
}

export async function controlRssFeed(this: IExecuteFunctions, i: number) {
	const rssFeedId = this.getNodeParameter('rss_feed_id', i) as number;
	const operation = this.getNodeParameter('controlOperation', i) as string;

	return torBoxApiRequest.call(this, 'POST', 'rss/controlrss', {
		rss_feed_id: rssFeedId,
		operation,
	});
}

export async function modifyRssFeed(this: IExecuteFunctions, i: number) {
	const rssFeedId = this.getNodeParameter('rss_feed_id', i) as number;
	const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

	const body: IDataObject = { rss_feed_id: rssFeedId, ...updateFields };

	return torBoxApiRequest.call(this, 'POST', 'rss/modifyrss', body);
}

export async function getUserRssFeeds(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'rss/getfeeds');
}

export async function getRssFeedItems(this: IExecuteFunctions, i: number) {
	const rssFeedId = this.getNodeParameter('rss_feed_id', i) as number;
	return torBoxApiRequest.call(this, 'GET', 'rss/getfeeditems', undefined, { rss_feed_id: rssFeedId });
}

// =====================
// INTEGRATIONS
// =====================

export async function authenticateOAuth(this: IExecuteFunctions, i: number) {
	const provider = this.getNodeParameter('provider', i) as string;
	return torBoxApiRequest.call(this, 'GET', `integration/oauth/${provider}`);
}

export async function queueGoogleDrive(this: IExecuteFunctions, i: number) {
	const id = this.getNodeParameter('id', i) as number;
	const type = this.getNodeParameter('type', i) as string;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const zip = this.getNodeParameter('zip', i, false) as boolean;
	const googleToken = this.getNodeParameter('google_token', i) as string;

	const body: IDataObject = { id, type, google_token: googleToken };
	if (fileId) body.file_id = fileId;
	if (zip) body.zip = zip;

	return torBoxApiRequest.call(this, 'POST', 'integration/googledrive', body);
}

export async function queuePixeldrain(this: IExecuteFunctions, i: number) {
	const id = this.getNodeParameter('id', i) as number;
	const type = this.getNodeParameter('type', i) as string;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const zip = this.getNodeParameter('zip', i, false) as boolean;

	const body: IDataObject = { id, type };
	if (fileId) body.file_id = fileId;
	if (zip) body.zip = zip;

	return torBoxApiRequest.call(this, 'POST', 'integration/pixeldrain', body);
}

export async function queueOneDrive(this: IExecuteFunctions, i: number) {
	const id = this.getNodeParameter('id', i) as number;
	const type = this.getNodeParameter('type', i) as string;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const zip = this.getNodeParameter('zip', i, false) as boolean;
	const onedriveToken = this.getNodeParameter('onedrive_token', i) as string;

	const body: IDataObject = { id, type, onedrive_token: onedriveToken };
	if (fileId) body.file_id = fileId;
	if (zip) body.zip = zip;

	return torBoxApiRequest.call(this, 'POST', 'integration/onedrive', body);
}

export async function queueGoFile(this: IExecuteFunctions, i: number) {
	const id = this.getNodeParameter('id', i) as number;
	const type = this.getNodeParameter('type', i) as string;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const zip = this.getNodeParameter('zip', i, false) as boolean;
	const gofileToken = this.getNodeParameter('gofile_token', i, '') as string;

	const body: IDataObject = { id, type };
	if (fileId) body.file_id = fileId;
	if (zip) body.zip = zip;
	if (gofileToken) body.gofile_token = gofileToken;

	return torBoxApiRequest.call(this, 'POST', 'integration/gofile', body);
}

export async function queue1Fichier(this: IExecuteFunctions, i: number) {
	const id = this.getNodeParameter('id', i) as number;
	const type = this.getNodeParameter('type', i) as string;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const zip = this.getNodeParameter('zip', i, false) as boolean;
	const onefichierToken = this.getNodeParameter('onefichier_token', i, '') as string;

	const body: IDataObject = { id, type };
	if (fileId) body.file_id = fileId;
	if (zip) body.zip = zip;
	if (onefichierToken) body.onefichier_token = onefichierToken;

	return torBoxApiRequest.call(this, 'POST', 'integration/1fichier', body);
}

export async function getAllJobs(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'integration/jobs');
}

export async function getSpecificJob(this: IExecuteFunctions, i: number) {
	const jobId = this.getNodeParameter('job_id', i) as number;
	return torBoxApiRequest.call(this, 'GET', `integration/job/${jobId}`);
}

export async function getAllJobsByHash(this: IExecuteFunctions, i: number) {
	const hash = this.getNodeParameter('hash', i) as string;
	return torBoxApiRequest.call(this, 'GET', `integration/jobs/${hash}`);
}

export async function cancelSpecificJob(this: IExecuteFunctions, i: number) {
	const jobId = this.getNodeParameter('job_id', i) as number;
	return torBoxApiRequest.call(this, 'DELETE', `integration/job/${jobId}`);
}

// =====================
// QUEUED
// =====================

export async function getQueuedDownloads(this: IExecuteFunctions, i: number) {
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	const qs: IDataObject = {};

	if (options.bypass_cache) qs.bypass_cache = options.bypass_cache;
	if (options.id) qs.id = options.id;
	if (options.offset) qs.offset = options.offset;
	if (options.limit) qs.limit = options.limit;
	if (options.type) qs.type = options.type;

	return torBoxApiRequest.call(this, 'GET', 'queued/getqueued', undefined, qs);
}

export async function controlQueuedDownloads(this: IExecuteFunctions, i: number) {
	const queuedId = this.getNodeParameter('queued_id', i, 0) as number;
	const operation = this.getNodeParameter('controlOperation', i) as string;
	const all = this.getNodeParameter('all', i, false) as boolean;

	const body: IDataObject = { operation };
	if (queuedId) body.queued_id = queuedId;
	if (all) body.all = all;

	return torBoxApiRequest.call(this, 'POST', 'queued/controlqueued', body);
}

// =====================
// STREAM
// =====================

export async function createStream(this: IExecuteFunctions, i: number) {
	const id = this.getNodeParameter('id', i) as number;
	const type = this.getNodeParameter('type', i) as string;
	const fileId = this.getNodeParameter('file_id', i, 0) as number;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = { id, type };
	if (fileId) qs.file_id = fileId;
	if (options.chosen_subtitle_index) qs.chosen_subtitle_index = options.chosen_subtitle_index;
	if (options.chosen_audio_index) qs.chosen_audio_index = options.chosen_audio_index;

	return torBoxApiRequest.call(this, 'GET', 'stream/createstream', undefined, qs);
}

export async function getStreamData(this: IExecuteFunctions, i: number) {
	const presignedToken = this.getNodeParameter('presigned_token', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = { presigned_token: presignedToken };
	if (options.chosen_subtitle_index) qs.chosen_subtitle_index = options.chosen_subtitle_index;
	if (options.chosen_audio_index) qs.chosen_audio_index = options.chosen_audio_index;

	return torBoxApiRequest.call(this, 'GET', 'stream/getstreamdata', undefined, qs);
}

// =====================
// SEARCH (search-api.torbox.app)
// =====================

const SEARCH_API_BASE = 'https://search-api.torbox.app';

async function searchApiRequest(
	this: IExecuteFunctions,
	endpoint: string,
	qs?: IDataObject,
): Promise<unknown> {
	const credentials = await this.getCredentials('torBoxApi');
	
	const response = await this.helpers.httpRequest({
		method: 'GET',
		headers: {
			Authorization: `Bearer ${credentials.apiKey}`,
		},
		url: `${SEARCH_API_BASE}/${endpoint}`,
		qs,
	});

	return response;
}

export async function getMetadataById(this: IExecuteFunctions, i: number) {
	const idType = this.getNodeParameter('id_type', i) as string;
	const id = this.getNodeParameter('id', i) as string;

	return searchApiRequest.call(this, `meta/${idType}:${id}`);
}

export async function getMetadataByQuery(this: IExecuteFunctions, i: number) {
	const query = this.getNodeParameter('query', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {};
	if (options.type) qs.type = options.type;

	return searchApiRequest.call(this, `meta/search/${encodeURIComponent(query)}`, qs);
}

export async function getTorrentDataById(this: IExecuteFunctions, i: number) {
	const idType = this.getNodeParameter('id_type', i) as string;
	const id = this.getNodeParameter('id', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {};
	if (options.metadata) qs.metadata = options.metadata;
	if (options.season) qs.season = options.season;
	if (options.episode) qs.episode = options.episode;
	if (options.check_cache) qs.check_cache = options.check_cache;
	if (options.check_owned) qs.check_owned = options.check_owned;
	if (options.search_user_engines) qs.search_user_engines = options.search_user_engines;

	return searchApiRequest.call(this, `torrents/${idType}:${id}`, qs);
}

export async function getTorrentDataByQuery(this: IExecuteFunctions, i: number) {
	const query = this.getNodeParameter('query', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {};
	if (options.metadata) qs.metadata = options.metadata;
	if (options.check_cache) qs.check_cache = options.check_cache;
	if (options.check_owned) qs.check_owned = options.check_owned;
	if (options.search_user_engines) qs.search_user_engines = options.search_user_engines;

	return searchApiRequest.call(this, `torrents/search/${encodeURIComponent(query)}`, qs);
}

export async function getUsenetDataById(this: IExecuteFunctions, i: number) {
	const idType = this.getNodeParameter('id_type', i) as string;
	const id = this.getNodeParameter('id', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {};
	if (options.metadata) qs.metadata = options.metadata;
	if (options.season) qs.season = options.season;
	if (options.episode) qs.episode = options.episode;
	if (options.check_cache) qs.check_cache = options.check_cache;
	if (options.check_owned) qs.check_owned = options.check_owned;
	if (options.search_user_engines) qs.search_user_engines = options.search_user_engines;

	return searchApiRequest.call(this, `usenet/${idType}:${id}`, qs);
}

export async function getUsenetDataByQuery(this: IExecuteFunctions, i: number) {
	const query = this.getNodeParameter('query', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const qs: IDataObject = {};
	if (options.metadata) qs.metadata = options.metadata;
	if (options.season) qs.season = options.season;
	if (options.episode) qs.episode = options.episode;
	if (options.check_cache) qs.check_cache = options.check_cache;
	if (options.check_owned) qs.check_owned = options.check_owned;
	if (options.search_user_engines) qs.search_user_engines = options.search_user_engines;

	return searchApiRequest.call(this, `usenet/search/${encodeURIComponent(query)}`, qs);
}

// =====================
// VENDORS
// =====================

export async function registerNewVendor(this: IExecuteFunctions, i: number) {
	const vendorName = this.getNodeParameter('vendor_name', i) as string;
	const vendorUrl = this.getNodeParameter('vendor_url', i) as string;

	return torBoxApiRequestFormData.call(this, 'vendors/register', {
		vendor_name: vendorName,
		vendor_url: vendorUrl,
	});
}

export async function getVendorAccount(this: IExecuteFunctions) {
	return torBoxApiRequest.call(this, 'GET', 'vendors/account');
}

export async function updateVendorAccount(this: IExecuteFunctions, i: number) {
	const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

	return torBoxApiRequestFormData.call(this, 'vendors/updateaccount', updateFields);
}

export async function getVendorAccounts(this: IExecuteFunctions, i: number) {
	const options = this.getNodeParameter('options', i, {}) as IDataObject;
	const qs: IDataObject = {};

	if (options.offset) qs.offset = options.offset;
	if (options.limit) qs.limit = options.limit;

	return torBoxApiRequest.call(this, 'GET', 'vendors/getaccounts', undefined, qs);
}

export async function getSingleVendorAccount(this: IExecuteFunctions, i: number) {
	const userId = this.getNodeParameter('user_id', i) as number;

	return torBoxApiRequest.call(this, 'GET', 'vendors/getaccount', undefined, { user_id: userId });
}

export async function registerUserUnderVendor(this: IExecuteFunctions, i: number) {
	const email = this.getNodeParameter('email', i) as string;

	return torBoxApiRequestFormData.call(this, 'vendors/registeruser', { email });
}

export async function removeUserFromVendor(this: IExecuteFunctions, i: number) {
	const userId = this.getNodeParameter('user_id', i) as number;

	return torBoxApiRequest.call(this, 'DELETE', 'vendors/removeuser', undefined, { user_id: userId });
}

export async function refreshUserAccounts(this: IExecuteFunctions, i: number) {
	const userId = this.getNodeParameter('user_id', i) as number;

	return torBoxApiRequest.call(this, 'PATCH', 'vendors/refresh', undefined, { user_id: userId });
}

// =====================
// RELAY (relay.torbox.app)
// =====================

const RELAY_API_BASE = 'https://relay.torbox.app';

export async function getCurrentUsersOnline(this: IExecuteFunctions) {
	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: RELAY_API_BASE,
	});
	return response;
}

export async function requestUpdateOnTorrentInfo(this: IExecuteFunctions, i: number) {
	const userId = this.getNodeParameter('user_id', i) as number;
	const torrentId = this.getNodeParameter('torrent_id', i) as number;

	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: `${RELAY_API_BASE}/v1/inactivecheck/torrent/${userId}/${torrentId}`,
	});
	return response;
}