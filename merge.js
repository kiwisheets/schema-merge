const { writeFileSync } = require('fs');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { print } = require('graphql');

const filepath = process.env.SCHEMA_ROOT || '.';
const outputFile = process.env.SCHEMA_OUTPUT || './schema.graphql';

console.log(`looking for graphql files in: ${filepath}`);

const schemasArray = loadFilesSync(filepath, {
  recursive: true,
  extensions: [
    'graphql',
    'graphqls',
    'gql',
    'gqls',
  ],
});

console.log(`found ${schemasArray.length} files`)
const merged = mergeTypeDefs(schemasArray);

console.log('merging...');
const output = print(merged);

console.log(`output file: ${outputFile}`);
writeFileSync(outputFile, output);
