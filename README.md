# Biosecurity Central (https://www.biosecuritycentral.org)

Biosecurity Central is a publicly available web-based library that helps users find relevant and reliable sources of information for key areas of biosecurity.

## Getting started

Instructions for setting up and starting the local develop server for Biosecurity Central follow.

### What you need

1. Your Airtable API key, obtained from https://airtable.com/account
1. Read access to the `Biosecurity Library (workspace)` Airtable base here: https://airtable.com/app708Ctx0rz1c1n7
1. `git` command line interface (CLI) installation

### Installation checklist

1. In your GitHub directory, install the Talus fork of the `gatsby-source-airtable` plugin.

   ```bash
   git clone https://github.com/ryan-talus/gatsby-source-airtable.git
   ```

1. Enter the cloned directory, install Node packages, and link the package.

   ```bash
   cd gatsby-source-airtable && \
   yarn && \
   yarn link;
   ```

1. Return to this repo's directory and install Node packages.

   ```bash
   cd ../biosecurity-library && \
   yarn;
   ```

1. Configure `@talus-analytics` on bit.dev as a Scoped Registry to allow installing bit.dev packages from `@talus-analytics`.

   ```bash
   npm config set '@talus-analytics:registry' https://node.bit.dev
   ```

1. Install bit.dev packages, i.e., Talus reusable and extendable components.

   ```bash
   bit install
   ```

1. Link the Talus fork of `gatsby-source-airtable` that you installed above to this project.

   ```bash
   yarn link "gatsby-source-airtable"
   ```

1. Create a start script for yourself at `sh/start.sh` with the below content, replacing `xxxxxx` with your Airtable API key. **Important: Never commit API keys to version control or otherwise share them.**

   ```bash
   # !/bin/bash
   export AIRTABLE_API_KEY=xxxxxx && yarn start;
   ```

1. Start the local develop server.

   ```bash
   bash ./sh/start.sh
   ```
