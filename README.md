# WF WordPress Build Action
This action builds WF WordPress projects.

## Example usage
```yaml
uses: wunderfarm/wordpress-release-action@v4
with:
  wf-webname: 'example2020'
  wf-client: 'example2020'
  app-name: 'example_production'
  aws-s3-bucket: ${{ secrets.AWS_S3_BUCKET }}
  database-host: ${{ secrets.APP_DB_HOST }}
  database-slavehost: ${{ secrets.APP_DB_SLAVEHOST }}
  database-name: 'example2020_production'
  database-user: ${{ secrets.APP_DB_USER }}
  database-password: ${{ secrets.APP_DB_PASSWORD }}
  deployment-environment: 'staging'
  deployment-domains: 'www.example.com,test.example.com'
  php-timeout: '60'
  php-version: '8.0'
  memory-limit: '256M'
  upload-max-filesize: '64M'
  force-https: 'true'
  app-wpml-site-key: ${{ secrets.APP_WPML_SITE_KEY }}
  secondary-domains:  'www.example2.com,test.example2.com'
  wf-auth-user: ${{ secrets.WF_AUTHUSER }}
  wf-auth-password: ${{ secrets.WF_AUTHPASSWORD }}
  app-aws-access-key-id: ${{ secrets.APP_AWS_ACCESS_KEY_ID }}
  app-aws-secret-access-key: ${{ secrets.APP_AWS_SECRET_ACCESS_KEY }}
  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  aws-region: 'eu-west-1'
  aws-opsworks-stack-id: ${{ secrets.AWS_STACK_ID }}
  aws-rds-arn: ${{ secrets.AWS_RDS_ARN }}
  remote-api-uri: ${{ secrets.REMOTE_API_URI }}
  remote-api-user: ${{ secrets.REMOTE_API_USER }}
  remote-api-password: ${{ secrets.REMOTE_API_PASSWORD }}
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run package

```bash
npm run package
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
$ git checkout -b v1
$ git commit -a -m "v1 release"
```

```bash
$ git push origin v1
```

Your action is now published!

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
