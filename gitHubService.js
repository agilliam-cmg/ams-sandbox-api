const octokit = require('@octokit/rest')();
const credentials = require('./credentials');

function decodeBase64(data) {
    const buff = new Buffer(data, 'base64');
    const text = buff.toString('utf-8');
    return text;
}

const gitHubService = {
    async getConfigFile(name) {
        try {
            // Authenticate
            await octokit.authenticate({
                type: 'token',
                token: credentials.accessToken,
            });
            // Get File Contents
            const result = await octokit.repos.getContents({
                owner: 'coxmediagroup',
                repo: 'cmg-app-configs-test',
                path: name,
            });
            // Decode Base64 file contents
            const content = decodeBase64(result.data.content);
            return content;
        } catch(err) {
            console.log(`Could Not Get Config File:\n\r${err}`);
        }
    }
}

module.exports = gitHubService;