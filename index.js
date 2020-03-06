const core = require('@actions/core')
const github = require('@actions/github')


const run = async () => {
	try {
		// if (github.context.payload.action !== "kati") return

		const issue = github.context.payload.issue
		if (!issue) return

		const token = process.env['GITHUB_TOKEN']
		if (!token) return

		const octokit = new github.GitHub(token)
		const nwo = process.env['GITHUB_REPOSITORY'] || '/'
		const [owner, repo] = nwo.split('/')

		const happyBirthdayMessage = 'Happy Birthday!!'
		const issueCommentResponse = await octokit.issues.createComment({
			owner, repo, issue_number: issue.number,
			body: happyBirthdayMessage,
		})
		console.log('wrote happy borthday')
	} catch (error) {
		console.error(error.message)
		core.setFailed(`happy-birthday action failure: ${error}`)
	}
}

run()

export default run
