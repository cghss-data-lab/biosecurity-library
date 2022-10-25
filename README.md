<h1 align="center">
  Biosecurity Central
</h1>

| Branch  | Status                                                                                                                                                                                                                                                                                     | Url                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Prod    | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/talus-analytics-bus/biosecurity-library/tree/prod.svg?style=svg&circle-token=6b8c304f660fc23bf6f01234a4b0fbe32f419c39)](https://dl.circleci.com/status-badge/redirect/gh/talus-analytics-bus/biosecurity-library/tree/prod)       | [https://www.biosecuritycentral.org/](biosecuritycentral.org)                             |
| Staging | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/talus-analytics-bus/biosecurity-library/tree/staging.svg?style=svg&circle-token=6b8c304f660fc23bf6f01234a4b0fbe32f419c39)](https://dl.circleci.com/status-badge/redirect/gh/talus-analytics-bus/biosecurity-library/tree/staging) | [https://staging-biosecurity.talusanalytics.com/](staging-biosecurity.talusanalytics.com) |

## 🚀 Quick start

1.  **Clone This Starter.**

    And pull it before using it!

2.  **Build AWS Stack & Update CCI config**

    Use the `build-stack` repo to set up all AWS resources for this project:

    ```shell
    aws cloudformation deploy --stack-name [project-name] --template-file build-stack.yaml --capabilities CAPABILITY_NAMED_IAM
    ```

    The "Outputs" tab of the CloudFormation stack will contain the distribution IDs which should be used in `/.circleci/config.yml`.

3.  **Check Gatsby CLI configuration**

    To be compatible with our CCI build scripts, Gatsby CLI should use `yarn`:

    `~/.config/gatsby/config.json` should include:

    ```json
    "cli": {
      "packageManager": "yarn"
    }
    ```

4.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying this local starter.

    ```shell
    # create a new Gatsby site using the talus starter
    gatsby new [project-name] ./talus-gatsby-starter
    ```

5.  **Set AIRTABLE_API_KEY env var**

    The easiest way to do this locally is in a script in the `sh/` directory, which is included in the starter but all contents are gitignored.

    ```shell
    export AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX;
    gatsby develop;
    ```

6.  **Set up Git**

    Execute the included `setup-repo.sh` script to initialize a git repo with the continuous integration and deployment branches configured to match the CCI config.

    ```shell
    ./setup-repo.sh
    ```

7.  **Update `gatsby-config.js`.**

    `gatsby-config.js` will automatically configure opt-in analytics, cookieconsent, and airtable connections based on the values provided.
