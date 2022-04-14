echo "Installing Talus-Analytics gatsby-source-airtable fork"
# yarn unlink "gatsby-source-airtable"
cd gatsby-source-airtable;
git submodule init;
git submodule update;
# yarn unlink; 
yarn link; 
cd ..;
yarn link "gatsby-source-airtable"
echo "Add talus-analytics registry"
npm config set '@talus-analytics:registry' https://node.bit.dev

