const core = require('@actions/core')
const github = require('@actions/github')

const {
    execSync
} = require('child_process')
const fs = require('fs')

function buildApp() {
    let githubRef = github.context.ref
    let commitSha = github.context.sha
    let eventPayload = github.context.payload
    let message = ''
    if (typeof (eventPayload.release) !== 'undefined') {
        message = 'Release: ' + eventPayload.release.name + ' - "' + eventPayload.release.body + '" '
    } else if (typeof (eventPayload.commits) !== 'undefined') {
        message = 'Commit: "' + eventPayload.commits[0].message + '" '
    }
    message = message + 'Ref: ' + githubRef + ' (' + commitSha.substring(0, 7) + ')'
    console.log(execSync('composer validate').toString())
    console.log(execSync(`composer install --prefer-dist --no-progress --no-suggest`).toString())
    console.log(execSync(`sudo npm install -g n`).toString())
    if (fs.existsSync('./.nvmrc')) {
        console.log(execSync(`sudo n auto`).toString())
    } else {
        console.log(execSync(`sudo n v10.15`).toString())
    }
    console.log(execSync(`npm ci`).toString())
    console.log(execSync(`npm run build`).toString())
    execSync(`mkdir dist`).toString()
    execSync(`cp -R vendor dist`).toString()
    execSync(`cp -R wp dist`).toString()
    execSync(`cp -R wp-content dist`).toString()
    execSync(`cp -R index.php dist`).toString()
    execSync(`cp -R wp-config.* dist`).toString()
    execSync(`cp -R robots.txt dist 2>/dev/null || :`).toString()
    execSync(`rsync -ax --exclude node_modules packages dist 2>/dev/null || :`).toString()
    execSync(`zip -rq build ./dist`).toString()
}

try {
    buildApp()
} catch (error) {
    core.setFailed(error.message)
}
