const octokit = require('@octokit/rest')();
const credentials = require('./credentials');

const gitHubService = {
    async getConfigFile(name){
        try {
            // Authenticate
            await octokit.authenticate({
                type: 'token',
                token: credentials.accessToken,
            });
            // Get File Contents
            const result = await octokit.repos.getContents({
                owner: 'coxmediagroup',
                repo: 'cmg-app-configs',
                path: name,
            });
            return result;
        } catch(err) {
            console.log(`Could Not Get Config File:\n\r${err}`);
        }
    }
}

module.exports = gitHubService;