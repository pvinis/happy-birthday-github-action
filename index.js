const core = require('@actions/core')
const github = require('@actions/github')


const run = async () => {
	try {
		console.debug('start')
		// if (github.context.payload.action !== "kati") return

		console.debug('get issue')
		const issue = github.context.payload.issue
		if (!issue) {
			console.error('no issue')
			return
		}
		console.log('issue owner?', issue.owner)

		console.debug('get token')
		const token = core.getInput('github-token')
		if (!token) {
			console.error('no token')
			return
		}

		console.debug('init github')
		const octokit = new github.GitHub(token)
		const {owner, repo} = github.context.payload.repo

		console.debug('send message')
		const happyBirthdayMessage = 'Happy Birthday!!'
		const issueCommentResponse = await octokit.issues.createComment({
			owner, repo, issue_number: issue.number,
			body: happyBirthdayMessage,
		})
		console.log('wrote happy borthday')
		console.debug('end')
	} catch (error) {
		console.error(error.message)
		core.setFailed(`happy-birthday action failure: ${error}`)
	}
}

run()
