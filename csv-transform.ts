// @deno-types="npm:@types/node@22"
import fs from "node:fs";
// @deno-types="npm:@types/node@22"
import path from "node:path";

import { parse, stringify, transform } from "npm:csv@6.3.11";

function ltrim(str?: string, trimChar?: string) {
  if (!str) return trimChar;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== trimChar) {
      return str.slice(i);
    }
  }
  return trimChar;
}

const [fileName, yearArg] = Deno.args;
const year = Number(yearArg);
if (!fileName || Number.isNaN(year)) {
  Deno.exit(1);
}

// deno-lint-ignore no-explicit-any
(parse(fs.readFileSync(fileName, "utf-8"), { columns: true }) as any)
  .pipe(
    // adr => hnr
    transform(({ plz, strasse, adr: hnr, wol, stadtteil, plr_name }) => [
      strasse,
      ltrim(hnr, "0"),
      Number(stadtteil == "Ost"),
      plr_name,
      year,
      String(wol).toLowerCase(),
      plz,
    ])
  )
  .pipe(stringify())
  .pipe(
    fs.createWriteStream(
      path.join(
        path.dirname(fileName),
        path.basename(fileName, ".csv") + "_sql.csv"
      )
    )
  );
