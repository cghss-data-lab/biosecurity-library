<h1 align="center">
  Biosecurity Central
</h1>

## 📈 Analytics

- [Plausible Dashboard](https://plausible.io/biosecuritycentral.org?period=30d)
- [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain%3Abiosecuritycentral.org)
- [Google Analytics](https://analytics.google.com/analytics/web/?authuser=1#/p305404298/reports/intelligenthome)

## 🚀 Deployment Status

| Branch  | CI/CD Status                                                                                                                                                                                                                                                                               | Url                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Prod    | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/talus-analytics-bus/biosecurity-library/tree/prod.svg?style=svg&circle-token=6b8c304f660fc23bf6f01234a4b0fbe32f419c39)](https://dl.circleci.com/status-badge/redirect/gh/talus-analytics-bus/biosecurity-library/tree/prod)       | [biosecuritycentral.org](https://biosecuritycentral.org/)                 |
| Staging | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/talus-analytics-bus/biosecurity-library/tree/staging.svg?style=svg&circle-token=6b8c304f660fc23bf6f01234a4b0fbe32f419c39)](https://dl.circleci.com/status-badge/redirect/gh/talus-analytics-bus/biosecurity-library/tree/staging) | [staging.biosecuritycentral.org](https://staging.biosecuritycentral.com/) |
| Review  | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/talus-analytics-bus/biosecurity-library/tree/review.svg?style=svg&circle-token=6b8c304f660fc23bf6f01234a4b0fbe32f419c39)](https://dl.circleci.com/status-badge/redirect/gh/talus-analytics-bus/biosecurity-library/tree/review)   | [review.biosecuritycentral.org](https://review.biosecuritycentral.com/)   |
| Dev     | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/talus-analytics-bus/biosecurity-library/tree/dev.svg?style=svg&circle-token=6b8c304f660fc23bf6f01234a4b0fbe32f419c39)](https://dl.circleci.com/status-badge/redirect/gh/talus-analytics-bus/biosecurity-library/tree/dev)         | [dev.biosecuritycentral.org](https://dev.biosecuritycentral.org/)         |

Automated deployment schedule: all data are ingested to `Staging` weekly.

## 📄 Ingest Latest Data from Airtable

1. Click the "CI/CD Status" badge above next to the site where you want to update data
2. Click "Trigger Pipeline" button on the top right section of that page.

## 👩‍💻 Local Development Quick start

1. [Install](https://bit.dev/docs/getting-started/installing-bit/installing-bit) & [log in](https://bit.dev/reference/reference/cli-reference/#login) to Bit

2. Install dependencies

```
yarn
```

3. Start development server

```
yarn start
```

## 🖥 Deployment Infrastructure

All Biosecurity Central Infrastructure is managed using the CloudFormation template within
the `/CloudFormation/` directory. All changes to hosting, domain names, alternate domain
names, and access control must be made in the template and deployed using the update command.

Infrastructure updates must be made with care as they can cause site downtime.
