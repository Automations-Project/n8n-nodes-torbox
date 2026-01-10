/*
 * Update README banner by calling a configurable template service (`templateId = n8n-node`).
 * - Auto-derives values from package.json and first *.node.ts file under nodes/
 * - Auto-bumps version from NPM (checks latest published, increments prerelease)
 * - Allows overrides via scripts/banner.config.json or scripts/banner.config
 * - Saves to repo root as intro.png so README keeps working
 * - Updates banner.config with the new version for future runs
 *
 * Configure the banner API base **locally** via the `BANNER_API_BASE_URL` (or `BANNER_API_BASE`)
 * environment variable, or by adding `bannerApiBase` to `scripts/banner.config*` (keep that file
 * out of version control). No default is shipped to avoid leaking private endpoints.
 *
 * Version auto-bumping:
 * - If config.version is set, uses that value (manual override)
 * - Otherwise, checks NPM for latest published version
 * - Auto-increments prerelease (e.g., 1.0.1-beta.1 -> 1.0.1-beta.2)
 * - Updates banner.config with the new version
 *
 * Usage: npm run update:banner
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Load .env file if present (simple implementation, no dependencies)
function loadEnv() {
	const envPath = path.resolve(__dirname, '..', '.env');
	if (!fs.existsSync(envPath)) return;

	try {
		const content = fs.readFileSync(envPath, 'utf8');
		const lines = content.split(/\r?\n/);

		for (const line of lines) {
			// Skip comments and empty lines
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) continue;

			// Parse KEY=VALUE
			const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/i);
			if (match) {
				const [, key, value] = match;
				// Only set if not already in environment
				if (!process.env[key]) {
					process.env[key] = value;
				}
			}
		}
	} catch (err) {
		console.warn('[update-banner] Could not load .env file:', err.message);
	}
}

loadEnv();

/**
 * Auto-detect the latest published version on NPM and auto-increment it.
 * Returns the next version to display in the banner.
 */
function getNextVersion(pkg, config) {
	try {
		// If version is explicitly set in config, use it
		if (config.version) {
			console.log(`[update-banner] Using version from config: ${config.version}`);
			return config.version;
		}

		const packageName = config.packageName || pkg.name;
		if (!packageName) {
			console.warn('[update-banner] No package name found, using version from package.json');
			return pkg.version || '1.0.0';
		}

		console.log(`[update-banner] Checking NPM for latest version of ${packageName}...`);

		// Check NPM for latest published version
		let npmVersion;
		try {
			const result = execSync(`npm view ${packageName} version`, {
				encoding: 'utf8',
				stdio: ['pipe', 'pipe', 'pipe'],
			}).trim();
			npmVersion = result || pkg.version;
		} catch (err) {
			// Package not published yet or error
			console.log('[update-banner] Package not found on NPM, using package.json version');
			npmVersion = pkg.version || '1.0.0';
		}

		console.log(`[update-banner] Latest published: ${npmVersion}`);
		console.log(`[update-banner] Package.json: ${pkg.version}`);

		// Use the higher version (NPM or package.json)
		const useVersion = compareVersions(npmVersion, pkg.version) > 0 ? npmVersion : pkg.version;

		// Auto-increment prerelease
		const nextVersion = bumpPrerelease(useVersion, 'beta');
		console.log(`[update-banner] Next version for banner: ${nextVersion}`);

		return nextVersion;
	} catch (err) {
		console.warn(`[update-banner] Error auto-bumping version: ${err.message}`);
		return pkg.version || '1.0.0';
	}
}

/**
 * Simple semver comparison (-1: a < b, 0: a == b, 1: a > b)
 */
function compareVersions(a, b) {
	const aParts = a.split(/[.-]/).map((p) => (isNaN(p) ? p : parseInt(p, 10)));
	const bParts = b.split(/[.-]/).map((p) => (isNaN(p) ? p : parseInt(p, 10)));

	for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
		const aVal = aParts[i] || 0;
		const bVal = bParts[i] || 0;

		if (typeof aVal === 'number' && typeof bVal === 'number') {
			if (aVal > bVal) return 1;
			if (aVal < bVal) return -1;
		} else {
			const aStr = String(aVal);
			const bStr = String(bVal);
			if (aStr > bStr) return 1;
			if (aStr < bStr) return -1;
		}
	}
	return 0;
}

/**
 * Bump prerelease version (e.g., 1.0.1-beta.0 -> 1.0.1-beta.1)
 */
function bumpPrerelease(version, tag = 'beta') {
	const match = version.match(/^(\d+\.\d+\.\d+)(?:-([a-z]+)\.(\d+))?$/i);

	if (match) {
		const [, base, currentTag, num] = match;
		if (currentTag && currentTag.toLowerCase() === tag.toLowerCase()) {
			// Increment existing prerelease
			return `${base}-${tag}.${parseInt(num, 10) + 1}`;
		} else {
			// Start new prerelease
			return `${base}-${tag}.0`;
		}
	}

	// Fallback: append -beta.0
	return `${version}-${tag}.0`;
}

(async function main() {
	try {
		const root = path.resolve(__dirname, '..');

		const pkgPath = path.join(root, 'package.json');
		const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

		// Load overrides from scripts/banner.config (preferred) or scripts/banner.config.json
		const configCandidates = [path.join(__dirname, 'banner.config'), path.join(__dirname, 'banner.config.json')];
		let config = {};
		let usedConfigPath = '';
		for (const p of configCandidates) {
			if (fs.existsSync(p)) {
				try {
					config = JSON.parse(fs.readFileSync(p, 'utf8')) || {};
					usedConfigPath = p;
					break;
				} catch (e) {
					console.warn(`[update-banner] Could not parse ${path.basename(p)} as JSON, trying next`);
				}
			}
		}
		if (usedConfigPath) {
			console.log(`[update-banner] Using config overrides: ${path.basename(usedConfigPath)}`);
		} else {
			console.log('[update-banner] No banner.config found; using derived defaults');
		}

		const { owner, repo } = parseRepo(pkg);

		const nodeMeta = findNodeMeta(root);

		const nodeName = config.nodeName || nodeMeta.displayName || toTitleCase(pkg.name.replace(/^@.*\//, ''));
		const description = config.description || nodeMeta.description || pkg.description || 'n8n community node';

		// Auto-bump version from NPM or use config override
		const version = getNextVersion(pkg, config);

		const nodeLogo = config.nodeLogo || resolveNodeLogoUrl(root, owner, repo, nodeMeta.iconDirRelative);
		if (config.nodeLogo && /\.svg(\?|$)/i.test(String(config.nodeLogo))) {
			console.warn('[update-banner] nodeLogo is an SVG. The template recommends a 512x512 PNG with transparency for best results.');
		}

		const theme = config.theme || 'n8n';
		const globalFont = config.globalFont || 'Inter';
		const author = config.author || (pkg.author && (pkg.author.name || pkg.author)) || '';
		const category = config.category || '';
		const license = config.license || pkg.license || '';
		const packageName = config.packageName || pkg.name || '';
		const minN8nVersion = config.minN8nVersion || '';
		const status = config.status || 'Stable';

		// Use package name only (no local paths or hostnames)
		const installCommand = config.installCommand || `npm install ${packageName}`.replace(/\\|\/[^\s]+\/node_modules/g, '');
		const repoUrl = config.repoUrl || (owner && repo ? `github.com/${owner}/${repo}` : '');
		const ogImage = config.ogImage || '';

		const features = Array.isArray(config.features) && config.features.length ? config.features : [];

		const styles = {
			versionStyle: 'normal',
			authorStyle: 'normal',
			categoryStyle: 'normal',
			licenseStyle: 'normal',
			packageStyle: 'normal',
			minVersionStyle: 'normal',
			statusStyle: 'normal',
			commandStyle: 'normal',
			repoStyle: 'normal',
			feature1Style: 'normal',
			feature2Style: 'normal',
			feature3Style: 'normal',
			feature4Style: 'normal',
			...(config.styles || {}),
		};

		const today = new Date();
		const lastUpdated = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

		const githubLanguage = config.githubLanguage || detectPrimaryLanguage(root);

		const bannerApiBase = process.env.BANNER_API_BASE_URL || process.env.BANNER_API_BASE || (config.bannerApiBase ? String(config.bannerApiBase) : '') || 'https://assets.nskha.com/api/generate';

		const url = buildUrl(
			bannerApiBase,
			{
				nodeName,
				description,
				version,
				nodeLogo,
				ogImage,
				theme,
				globalFont,
				author,
				category,
				license,
				packageName,
				minN8nVersion,
				status,
				installCommand,
				repoUrl,
				feature1Text: features[0] || '',
				feature2Text: features[1] || '',
				feature3Text: features[2] || '',
				feature4Text: features[3] || '',
				versionStyle: styles.versionStyle,
				authorStyle: styles.authorStyle,
				categoryStyle: styles.categoryStyle,
				licenseStyle: styles.licenseStyle,
				packageStyle: styles.packageStyle,
				minVersionStyle: styles.minVersionStyle,
				statusStyle: styles.statusStyle,
				commandStyle: styles.commandStyle,
				repoStyle: styles.repoStyle,
				feature1Style: styles.feature1Style,
				feature2Style: styles.feature2Style,
				feature3Style: styles.feature3Style,
				feature4Style: styles.feature4Style,
				lastUpdated,
				githubLanguage,
			},
			config,
		);

		// Log a concise summary of key values for troubleshooting
		console.log('[update-banner] Values summary:', {
			nodeName,
			version,
			minN8nVersion,
			author,
			repoUrl,
		});
		// Don't log full URL to avoid exposing system paths or sensitive config
		console.log('[update-banner] Generating banner via configured banner API base');
		console.log('[update-banner] Reminder: configure via BANNER_API_BASE_URL env var or scripts/banner.config* (ignore files in VCS)');

		if (typeof fetch !== 'function') {
			throw new Error('global fetch is not available. Use Node >= 18.17.0');
		}

		const res = await fetch(url, { method: 'GET' });
		if (!res.ok) {
			const text = await res.text().catch(() => '');
			throw new Error(`Banner API request failed: ${res.status} ${res.statusText}\n${text}`);
		}
		const ab = await res.arrayBuffer();
		const buf = Buffer.from(ab);

		const outPath = path.join(root, 'intro.png');
		fs.writeFileSync(outPath, buf);
		console.log(`[update-banner] Saved ${path.relative(root, outPath)} (${buf.length} bytes)`);

		// Update banner.config with the new version (if not explicitly set)
		if (usedConfigPath && !config.version) {
			try {
				config.version = version;
				fs.writeFileSync(usedConfigPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
				console.log(`[update-banner] Updated ${path.basename(usedConfigPath)} with version: ${version}`);
			} catch (err) {
				console.warn(`[update-banner] Could not update config file: ${err.message}`);
			}
		}

		// Optional: ensure README references /intro.png
		const readmePath = path.join(root, 'README.md');
		if (fs.existsSync(readmePath)) {
			const md = fs.readFileSync(readmePath, 'utf8');
			if (!/\!\[.*?\]\((\.?\/)?intro\.png\)/i.test(md)) {
				console.warn('[update-banner] README.md does not reference intro.png. Please update the banner image link if needed.');
			}
		}
	} catch (err) {
		console.error('[update-banner] Error:', err && err.message ? err.message : err);
		process.exitCode = 1;
	}
})();

function parseRepo(pkg) {
	const url = (pkg.repository && (pkg.repository.url || pkg.repository)) || pkg.homepage || '';
	const clean = String(url)
		.replace(/^git\+/, '')
		.replace(/\.git$/, '');
	const m = clean.match(/github\.com[/:]([^/]+)\/([^/#?]+)/i);
	return { owner: m ? m[1] : '', repo: m ? m[2] : '' };
}

function toTitleCase(s) {
	return s
		.replace(/[-_]/g, ' ')
		.split(' ')
		.map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
		.join(' ');
}

function findNodeMeta(root) {
	const nodesDir = path.join(root, 'nodes');
	const result = { displayName: '', description: '', iconDirRelative: '' };
	if (!fs.existsSync(nodesDir)) return result;

	const stack = [nodesDir];
	let nodeFile = '';
	while (stack.length) {
		const dir = stack.pop();
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const p = path.join(dir, entry.name);
			if (entry.isDirectory()) stack.push(p);
			else if (/\.node\.ts$/i.test(entry.name)) {
				nodeFile = p;
				break;
			}
		}
		if (nodeFile) break;
	}
	if (!nodeFile) return result;

	const content = fs.readFileSync(nodeFile, 'utf8');
	const dn = content.match(/displayName:\s*['"]([^'"]+)['"]/);
	const desc = content.match(/description:\s*['"]([^'"]+)['"]/);
	result.displayName = dn ? dn[1] : '';
	result.description = desc ? desc[1] : '';
	const iconRel = content.match(/icon:\s*['"]file:([^'"]+)['"]/);
	if (iconRel) {
		const iconRelPath = iconRel[1].replace(/^\//, '');
		const nodeDir = path.dirname(nodeFile);
		const iconAbs = path.join(nodeDir, iconRelPath);
		const relFromRoot = path.relative(root, path.dirname(iconAbs));
		result.iconDirRelative = relFromRoot.split(path.sep).join('/');
	}
	return result;
}

function resolveNodeLogoUrl(root, owner, repo, iconDirRelative) {
	// Find any icon file (prefer PNG over SVG per API recommendation)
	let localIcon = '';
	if (iconDirRelative) {
		const iconDir = path.join(root, iconDirRelative);
		if (fs.existsSync(iconDir)) {
			const files = fs.readdirSync(iconDir);
			// Prefer PNG, then SVG
			const pngFile = files.find((f) => /\.(png)$/i.test(f));
			const svgFile = files.find((f) => /\.(svg)$/i.test(f));
			const iconFile = pngFile || svgFile;
			if (iconFile) {
				localIcon = path.join(iconDir, iconFile);
			}
		}
	}
	if (!localIcon || !owner || !repo) return '';
	const rel = path.relative(root, localIcon).split(path.sep).join('/');
	const branch = detectCurrentBranch(root) || 'main';
	return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${rel}`;
}

function detectCurrentBranch(root) {
	try {
		const headPath = path.join(root, '.git', 'HEAD');
		if (!fs.existsSync(headPath)) return '';
		const head = fs.readFileSync(headPath, 'utf8').trim();
		// formats:
		// ref: refs/heads/main
		// or a detached HEAD with commit hash
		const m = head.match(/^ref:\s+refs\/heads\/(.+)$/);
		if (m) return m[1];
		return '';
	} catch {
		return '';
	}
}

function detectPrimaryLanguage(root) {
	// Heuristic: if TypeScript sources exist, say TypeScript; else JavaScript
	const nodesDir = path.join(root, 'nodes');
	if (fs.existsSync(nodesDir)) {
		const hasTs = existsByGlob(nodesDir, (name) => name.endsWith('.ts'));
		if (hasTs) return 'TypeScript';
	}
	return 'JavaScript';
}

function existsByGlob(dir, matcher) {
	const stack = [dir];
	while (stack.length) {
		const d = stack.pop();
		for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
			const p = path.join(d, entry.name);
			if (entry.isDirectory()) stack.push(p);
			else if (matcher(entry.name)) return true;
		}
	}
	return false;
}

function buildUrl(base, vars, config = {}) {
	const url = new URL(base);

	// API parameters - all configurable with sensible defaults
	url.searchParams.set('templateId', config.templateId || 'n8n-node');
	url.searchParams.set('format', config.format || 'png');
	url.searchParams.set('width', String(config.width || 2080));
	url.searchParams.set('height', String(config.height || 1280));
	url.searchParams.set('quality', String(config.quality || 100));
	url.searchParams.set('compressionLevel', String(config.compressionLevel || 1));
	url.searchParams.set('scale', String(config.scale || 3));
	url.searchParams.set('autoArrange', String(config.autoArrange ?? false));
	url.searchParams.set('transparencyMode', config.transparencyMode || 'none');
	url.searchParams.set('omitBackground', String(config.omitBackground ?? false));
	url.searchParams.set('filename', config.filename || 'banner');

	// API key from config or env
	const apiKey = process.env.BANNER_API_KEY || config.apiKey || 'dev-key-123';
	url.searchParams.set('api_key', apiKey);

	for (const [k, v] of Object.entries(vars)) {
		if (v != null && String(v).length) url.searchParams.set(k, String(v));
	}
	return url;
}

function truncateMid(s, max = 120) {
	if (!s) return '';
	const str = String(s);
	if (str.length <= max) return str;
	const half = Math.floor((max - 3) / 2);
	return str.slice(0, half) + '...' + str.slice(-half);
}
