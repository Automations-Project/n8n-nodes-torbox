[![n8n.io - Workflow Automation](https://github.com/Automations-Project/n8n-nodes-torbox/raw/master/intro.png)](https://torbox.app)
# TorBox n8n Node
[![CI](https://github.com/Automations-Project/n8n-nodes-torbox/actions/workflows/ci.yml/badge.svg)](https://github.com/Automations-Project/n8n-nodes-torbox/actions/workflows/ci.yml)

[![n8n community node](https://img.shields.io/badge/n8n-community%20node-orange)](https://docs.n8n.io/integrations/community-nodes/)
[![TorBox API](https://img.shields.io/badge/TorBox-API-green)](https://www.postman.com/torbox/torbox/overview)
[![n8n Nodes API](https://img.shields.io/badge/n8n%20Nodes%20API-v1-blue)](#contributing)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-torbox?logo=npm)](https://www.npmjs.com/package/n8n-nodes-torbox)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-torbox?logo=npm)](https://www.npmjs.com/package/n8n-nodes-torbox)
[![n8n Node version](https://img.shields.io/github/package-json/v/Automations-Project/n8n-nodes-torbox?logo=n8n&label=n8n%20node)](https://github.com/Automations-Project/n8n-nodes-torbox)
[![n8n compatibility](https://img.shields.io/github/v/release/n8n-io/n8n?logo=n8n&label=)](https://n8n.io)
[![Node.js compatibility](https://img.shields.io/badge/Node.js-%E2%89%A520.15-green?logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/github/license/Automations-Project/n8n-nodes-torbox)](LICENSE.md)

[![GitHub stars](https://img.shields.io/github/stars/Automations-Project/n8n-nodes-torbox?style=social)](https://github.com/Automations-Project/n8n-nodes-torbox/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Automations-Project/n8n-nodes-torbox?style=social)](https://github.com/Automations-Project/n8n-nodes-torbox/network)
[![GitHub issues](https://img.shields.io/github/issues/Automations-Project/n8n-nodes-torbox)](https://github.com/Automations-Project/n8n-nodes-torbox/issues)
[![Last commit](https://img.shields.io/github/last-commit/Automations-Project/n8n-nodes-torbox)](https://github.com/Automations-Project/n8n-nodes-torbox/commits)

This is an n8n community node for **TorBox** cloud storage and download management service. It provides comprehensive operations for managing torrents, usenet downloads, web downloads, and cloud storage integrations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform where you can host and automate your workflows locally or on cloud.

## Features

### 🌊 Torrents Operations
- **Create Torrent** - Add torrents via magnet links or files
- **Control Torrent** - Pause, resume, or delete torrents
- **Request Download Link** - Generate download links for torrent files
- **Get Torrent List** - Browse all your torrents
- **Get Torrent Cached Availability** - Check if torrents are cached
- **Export Torrent Data** - Export torrent information
- **Get Torrent Info** - Retrieve detailed torrent metadata

### 📡 Usenet Operations
- **Create Usenet Download** - Add usenet downloads via NZB files
- **Control Usenet Download** - Manage usenet downloads
- **Request Download Link** - Generate download links for usenet files
- **Get Usenet List** - Browse all your usenet downloads
- **Get Usenet Cached Availability** - Check usenet cache status

### 🌐 Web Downloads Operations
- **Create Web Download** - Download files from direct links
- **Control Web Download** - Manage web downloads
- **Request Download Link** - Generate download links
- **Get Web Download List** - Browse all web downloads
- **Get Web Download Cached Availability** - Check cache status
- **Get Hoster List** - List supported file hosting services

### 🔔 Notifications Operations
- **Get RSS Notification Feed** - Retrieve notifications as RSS
- **Get Notification Feed** - Get all notifications
- **Clear All Notifications** - Remove all notifications
- **Clear Single Notification** - Remove specific notification
- **Send Test Notification** - Test notification settings

### 👤 User Operations
- **Refresh API Token** - Regenerate your API token
- **Get User Data** - Retrieve account information
- **Add Referral To Account** - Apply referral codes
- **Get Confirmation Code** - Retrieve confirmation codes

### 📰 RSS Feeds Operations
- **Add RSS Feed** - Subscribe to RSS feeds for automatic downloads
- **Control RSS Feed** - Pause, resume, or delete RSS feeds
- **Modify RSS Feed** - Update RSS feed settings
- **Get User RSS Feeds** - List all RSS subscriptions
- **Get RSS Feed Items** - Browse items from RSS feeds

### 🔗 Integrations Operations
- **Authenticate OAuth** - Connect cloud storage services
- **Queue Google Drive** - Upload to Google Drive
- **Queue Pixeldrain** - Upload to Pixeldrain
- **Queue OneDrive** - Upload to OneDrive
- **Queue GoFile** - Upload to GoFile
- **Queue 1Fichier** - Upload to 1Fichier
- **Get All Jobs** - List all integration jobs
- **Get Specific Job** - Get job details
- **Get All Jobs By Hash** - Find jobs by hash
- **Cancel Specific Job** - Cancel integration jobs

### 📥 Queued Downloads Operations
- **Get Queued Downloads** - List queued downloads
- **Control Queued Downloads** - Manage download queue

### 🎬 Stream Operations
- **Create Stream** - Generate streaming links
- **Get Stream Data** - Retrieve stream information

### 🔍 Search Operations
- **Get Metadata By ID** - Search metadata by ID
- **Get Metadata By Query** - Search metadata by query
- **Get Torrent Data By ID** - Find torrents by ID
- **Get Torrent Data By Query** - Search torrents
- **Get Usenet Data By ID** - Find usenet by ID
- **Get Usenet Data By Query** - Search usenet

### 🏢 Vendors Operations
- **Register New Vendor** - Create vendor account
- **Get Vendor Account** - Retrieve vendor details
- **Update Vendor Account** - Modify vendor settings
- **Get Vendor TorBox Accounts** - List managed accounts
- **Get Single Vendor TorBox Account** - Get specific account
- **Register New User Under Vendor** - Create user accounts
- **Remove User From Vendor** - Delete user accounts
- **Refresh User Accounts** - Update account information

### 🔄 Relay Operations
- **Get Current Users Online** - Check online users
- **Request Update On Torrent Info** - Force torrent info refresh

### ⚙️ General Operations
- **Get Up Status** - Check API status
- **Get Stats** - Retrieve TorBox statistics
- **Get Changelogs RSS Feed** - Get changelogs as RSS
- **Get Changelogs JSON** - Get changelogs as JSON
- **Get Speedtest Files** - Access speedtest files

### ✨ Advanced Features
- ✅ Full TorBox API v1 support
- ✅ Comprehensive error handling
- ✅ Binary data support for file operations
- ✅ Pagination for large result sets
- ✅ OAuth integration for cloud services
- ✅ RSS feed automation
- ✅ Multi-format download support (torrents, usenet, web)
- ✅ Real-time streaming capabilities
- ✅ Vendor management for resellers

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm
```bash
npm install @n8n-nodes-torbox
```

### n8n Cloud & Self-Hosted
You can install community nodes directly in n8n Cloud through the **Settings → Community Nodes** menu.

## Credentials

To use this node, you need a TorBox API token:

1. Log in to your TorBox account at [torbox.app](https://torbox.app)
2. Navigate to **Settings → API**
3. Generate or copy your **API Token**

### Configuration

In n8n, go to **Credentials → New → TorBox API** and enter:

| Field | Required | Description |
|-------|----------|-------------|
| API Token | Yes | Your TorBox API token |

## Usage

### Example 1: Create a Torrent Download

1. Add the **TorBox** node to your workflow
2. Connect your credentials
3. Select:
   - **Resource**: Torrents
   - **Operation**: Create Torrent
   - **Magnet Link**: `magnet:?xt=urn:btih:...`
4. Execute the node

The torrent will be added to your TorBox account and start downloading.

### Example 2: Get Download Link

1. Add the **TorBox** node to your workflow
2. Configure:
   - **Resource**: Torrents
   - **Operation**: Request Download Link
   - **Torrent ID**: `12345`
   - **File ID**: `67890`
3. Execute the node

Returns a direct download link for the specified file.

### Example 3: List All Torrents

1. Add the **TorBox** node
2. Configure:
   - **Resource**: Torrents
   - **Operation**: Get Torrent List
3. Execute the node

Returns an array of all your torrents with their status and details.

### Example 4: Upload to Google Drive

1. Add the **TorBox** node
2. Configure:
   - **Resource**: Integrations
   - **Operation**: Queue Google Drive
   - **Torrent ID**: `12345`
   - **File ID**: `67890`
3. Execute the node

Queues the file for upload to your connected Google Drive account.

### Example 5: Add RSS Feed for Automation

1. Add the **TorBox** node
2. Configure:
   - **Resource**: RSS Feeds
   - **Operation**: Add RSS Feed
   - **RSS URL**: `https://example.com/feed.xml`
   - **Filter**: Optional regex filter
3. Execute the node

Automatically downloads new items matching your filter from the RSS feed.

### Example 6: Create Streaming Link

1. Add the **TorBox** node
2. Configure:
   - **Resource**: Stream
   - **Operation**: Create Stream
   - **Torrent ID**: `12345`
   - **File ID**: `67890`
3. Execute the node

Generates a streaming link for direct playback in media players.

## Operations Reference

### Torrents Operations

#### Create Torrent
Adds a new torrent to your account.

**Parameters**:
- `magnetLink` or `torrentFile` (required): Magnet link or torrent file
- `seed` (optional): Keep seeding after download
- `allowZip` (optional): Allow ZIP extraction

**Returns**: Torrent ID, hash, and initial status.

#### Control Torrent
Manages existing torrents.

**Parameters**:
- `torrentId` (required): ID of the torrent
- `operation` (required): `pause`, `resume`, or `delete`

**Returns**: Operation status and updated torrent info.

#### Request Download Link
Generates a direct download link.

**Parameters**:
- `torrentId` (required): ID of the torrent
- `fileId` (required): ID of the file within torrent
- `zipLink` (optional): Generate ZIP download link

**Returns**: Download URL with expiration time.

### Usenet Operations

#### Create Usenet Download
Adds a usenet download via NZB file.

**Parameters**:
- `nzbFile` (required): NZB file content or URL

**Returns**: Download ID and status.

### Web Downloads Operations

#### Create Web Download
Downloads files from direct links.

**Parameters**:
- `url` (required): Direct download URL

**Returns**: Download ID and status.

#### Get Hoster List
Lists all supported file hosting services.

**Returns**: Array of supported hosters with status.

### Integrations Operations

#### Queue Google Drive
Uploads files to Google Drive.

**Parameters**:
- `torrentId` (required): Source torrent ID
- `fileId` (required): File to upload
- `folderId` (optional): Destination folder

**Returns**: Job ID and status.

### RSS Feeds Operations

#### Add RSS Feed
Subscribes to an RSS feed for automatic downloads.

**Parameters**:
- `rssUrl` (required): RSS feed URL
- `filter` (optional): Regex filter for items
- `downloadAutomatically` (optional): Auto-download matches

**Returns**: RSS feed ID and configuration.

### Stream Operations

#### Create Stream
Generates streaming links for media files.

**Parameters**:
- `torrentId` (required): Source torrent
- `fileId` (required): Media file to stream

**Returns**: Streaming URL and metadata.

## TorBox API Features

TorBox provides a comprehensive cloud storage and download management platform with:

| Feature | Status | Description |
|---------|--------|-------------|
| Torrent downloads | ✅ Supported | Full torrent support with caching |
| Usenet downloads | ✅ Supported | NZB file support |
| Web downloads | ✅ Supported | Direct link downloads |
| Cloud integrations | ✅ Supported | Google Drive, OneDrive, etc. |
| RSS automation | ✅ Supported | Automatic download monitoring |
| Streaming | ✅ Supported | Direct media streaming |
| Vendor API | ✅ Supported | Reseller management |
| Real-time updates | ✅ Supported | Relay system for live updates |

## Validation & Error Handling

The node performs comprehensive validation:

### API Token
- Must be a valid TorBox API token
- Token is validated on first request

### Error Messages
Errors include:
- **Validation errors**: Clear explanation of invalid parameters
- **API errors**: HTTP status codes and TorBox error messages
- **Network errors**: Connection issues, timeouts
- **Authentication errors**: Invalid or expired tokens

All errors include the item index for multi-item operations.

## Technical Details

### Built With
- **n8n-workflow**: Node execution framework
- **TypeScript**: Strict typing for reliability
- **TorBox API v1**: Official API integration

### Architecture
The node is built with a modular architecture:
- `TorBox.node.ts` - Main node class
- `operators.ts` - Resource and operation definitions
- `fields.ts` - Parameter definitions
- `methods.ts` - Operation handler implementations
- `execute.ts` - Execution orchestrator

### API Compatibility
TorBox API v1 provides comprehensive cloud storage and download management. This node leverages the official REST API, ensuring compatibility and reliability.

## Development

### Prerequisites
- Node.js >= 20.15.0
- npm or pnpm
- n8n instance for testing

### Setup
```bash
# Clone the repository
git clone https://github.com/Automations-Project/n8n-nodes-torbox.git
cd n8n-nodes-torbox

# Install dependencies
npm install

# Build the node
npm run build

# Lint and format
npm run lint
npm run format
```

### Local Testing
```bash
# Build and install to local n8n (Windows)
npm run start:dev-windows

# Watch mode for development
npm run dev
```

### Project Structure
```
n8n-nodes-torbox/
├── credentials/
│   ├── TorBoxApi.credentials.ts
│   └── torbox.svg
├── nodes/
│   └── TorBox/
│       ├── TorBox.node.ts
│       ├── TorBox.node.json
│       ├── torbox.svg
│       ├── operators.ts
│       ├── fields.ts
│       ├── methods.ts
│       └── execute.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

### "Invalid API token" error
1. Verify your API token is correct in credentials
2. Check that your TorBox account is active
3. Try regenerating your API token in TorBox settings

### "Download not found" error
1. Confirm the torrent/download ID is correct
2. Check if the download still exists in your account
3. Verify you have permission to access the download

### "Integration failed" error
1. Ensure OAuth is properly configured for cloud services
2. Check that you have sufficient storage space
3. Verify the integration service is online

### Streaming issues
1. Ensure the file is a supported media format
2. Check that the download is complete
3. Verify your network connection supports streaming

### RSS feed not working
1. Verify the RSS feed URL is accessible
2. Check that the filter regex is valid
3. Ensure automatic downloads are enabled

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## License

[MIT](LICENSE.md)

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [TorBox API Documentation](https://www.postman.com/torbox/torbox/overview)
- [TorBox Website](https://torbox.app)

## Support

- **n8n Community Forum**: [community.n8n.io](https://n8n.community?ref=nskha)
- **Issues**: [GitHub Issues](https://github.com/Automations-Project/n8n-nodes-torbox/issues)
- **TorBox Support**: [torbox.app/support](https://support.torbox.app/en/)

**Created with ❤️ for the n8n & TorBox community**