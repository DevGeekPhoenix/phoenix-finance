import { readFileSync, readdirSync } from "fs"

import path from "path"

const dirname = path.join(process.cwd(), '/src/graphql/schema')

export default () =>
  readdirSync(dirname) // not __dirname
    .filter(item => item.includes('.graphql'))
    .reduce((acc, cur) => acc + readFileSync(path.join(dirname, `/${cur}`), { encoding: "utf8" }), '');
    