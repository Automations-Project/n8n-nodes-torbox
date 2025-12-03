import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import * as methods from './methods';

export async function executeTorBox(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	i: number,
) {
	switch (resource) {
		case 'torrents':
			switch (operation) {
				case 'createTorrent':
					return methods.createTorrent.call(this, i);
				case 'controlTorrent':
					return methods.controlTorrent.call(this, i);
				case 'requestDownloadLink':
					return methods.requestDownloadLink.call(this, i);
				case 'getTorrentList':
					return methods.getTorrentList.call(this, i);
				case 'getTorrentCachedAvailability':
					return methods.getTorrentCachedAvailability.call(this, i);
				case 'exportTorrentData':
					return methods.exportTorrentData.call(this, i);
				case 'getTorrentInfo':
					return methods.getTorrentInfo.call(this, i);
			}
			break;

		case 'usenet':
			switch (operation) {
				case 'createUsenetDownload':
					return methods.createUsenetDownload.call(this, i);
				case 'controlUsenetDownload':
					return methods.controlUsenetDownload.call(this, i);
				case 'requestUsenetDownloadLink':
					return methods.requestUsenetDownloadLink.call(this, i);
				case 'getUsenetList':
					return methods.getUsenetList.call(this, i);
				case 'getUsenetCachedAvailability':
					return methods.getUsenetCachedAvailability.call(this, i);
			}
			break;

		case 'webdl':
			switch (operation) {
				case 'createWebDownload':
					return methods.createWebDownload.call(this, i);
				case 'controlWebDownload':
					return methods.controlWebDownload.call(this, i);
				case 'requestWebDownloadLink':
					return methods.requestWebDownloadLink.call(this, i);
				case 'getWebDownloadList':
					return methods.getWebDownloadList.call(this, i);
				case 'getWebDownloadCachedAvailability':
					return methods.getWebDownloadCachedAvailability.call(this, i);
				case 'getHosterList':
					return methods.getHosterList.call(this);
			}
			break;

		case 'general':
			switch (operation) {
				case 'getUpStatus':
					return methods.getUpStatus.call(this);
				case 'getStats':
					return methods.getStats.call(this);
				case 'getChangelogsRss':
					return methods.getChangelogsRss.call(this);
				case 'getChangelogsJson':
					return methods.getChangelogsJson.call(this);
				case 'getSpeedtestFiles':
					return methods.getSpeedtestFiles.call(this, i);
			}
			break;

		case 'notifications':
			switch (operation) {
				case 'getRssNotificationFeed':
					return methods.getRssNotificationFeed.call(this);
				case 'getNotificationFeed':
					return methods.getNotificationFeed.call(this);
				case 'clearAllNotifications':
					return methods.clearAllNotifications.call(this);
				case 'clearSingleNotification':
					return methods.clearSingleNotification.call(this, i);
				case 'sendTestNotification':
					return methods.sendTestNotification.call(this);
			}
			break;

		case 'user':
			switch (operation) {
				case 'refreshApiToken':
					return methods.refreshApiToken.call(this);
				case 'getUserData':
					return methods.getUserData.call(this, i);
				case 'addReferralToAccount':
					return methods.addReferralToAccount.call(this, i);
				case 'getConfirmationCode':
					return methods.getConfirmationCode.call(this);
			}
			break;

		case 'rss':
			switch (operation) {
				case 'addRssFeed':
					return methods.addRssFeed.call(this, i);
				case 'controlRssFeed':
					return methods.controlRssFeed.call(this, i);
				case 'modifyRssFeed':
					return methods.modifyRssFeed.call(this, i);
				case 'getUserRssFeeds':
					return methods.getUserRssFeeds.call(this);
				case 'getRssFeedItems':
					return methods.getRssFeedItems.call(this, i);
			}
			break;

		case 'integrations':
			switch (operation) {
				case 'authenticateOAuth':
					return methods.authenticateOAuth.call(this, i);
				case 'queueGoogleDrive':
					return methods.queueGoogleDrive.call(this, i);
				case 'queuePixeldrain':
					return methods.queuePixeldrain.call(this, i);
				case 'queueOneDrive':
					return methods.queueOneDrive.call(this, i);
				case 'queueGoFile':
					return methods.queueGoFile.call(this, i);
				case 'queue1Fichier':
					return methods.queue1Fichier.call(this, i);
				case 'getAllJobs':
					return methods.getAllJobs.call(this);
				case 'getSpecificJob':
					return methods.getSpecificJob.call(this, i);
				case 'getAllJobsByHash':
					return methods.getAllJobsByHash.call(this, i);
				case 'cancelSpecificJob':
					return methods.cancelSpecificJob.call(this, i);
			}
			break;

		case 'queued':
			switch (operation) {
				case 'getQueuedDownloads':
					return methods.getQueuedDownloads.call(this, i);
				case 'controlQueuedDownloads':
					return methods.controlQueuedDownloads.call(this, i);
			}
			break;

		case 'stream':
			switch (operation) {
				case 'createStream':
					return methods.createStream.call(this, i);
				case 'getStreamData':
					return methods.getStreamData.call(this, i);
			}
			break;

		case 'search':
			switch (operation) {
				case 'getMetadataById':
					return methods.getMetadataById.call(this, i);
				case 'getMetadataByQuery':
					return methods.getMetadataByQuery.call(this, i);
				case 'getTorrentDataById':
					return methods.getTorrentDataById.call(this, i);
				case 'getTorrentDataByQuery':
					return methods.getTorrentDataByQuery.call(this, i);
				case 'getUsenetDataById':
					return methods.getUsenetDataById.call(this, i);
				case 'getUsenetDataByQuery':
					return methods.getUsenetDataByQuery.call(this, i);
			}
			break;

		case 'vendors':
			switch (operation) {
				case 'registerNewVendor':
					return methods.registerNewVendor.call(this, i);
				case 'getVendorAccount':
					return methods.getVendorAccount.call(this);
				case 'updateVendorAccount':
					return methods.updateVendorAccount.call(this, i);
				case 'getVendorAccounts':
					return methods.getVendorAccounts.call(this, i);
				case 'getSingleVendorAccount':
					return methods.getSingleVendorAccount.call(this, i);
				case 'registerUserUnderVendor':
					return methods.registerUserUnderVendor.call(this, i);
				case 'removeUserFromVendor':
					return methods.removeUserFromVendor.call(this, i);
				case 'refreshUserAccounts':
					return methods.refreshUserAccounts.call(this, i);
			}
			break;

		case 'relay':
			switch (operation) {
				case 'getCurrentUsersOnline':
					return methods.getCurrentUsersOnline.call(this);
				case 'requestUpdateOnTorrentInfo':
					return methods.requestUpdateOnTorrentInfo.call(this, i);
			}
			break;
	}

	throw new NodeOperationError(
		this.getNode(),
		`Operation "${operation}" for resource "${resource}" is not supported`,
	);
}