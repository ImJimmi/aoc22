import {readFileSync} from "fs";
import {join} from "path";

export function readLocalFile(localFileName: string, dirname: string): string {
    const fullPath = join(dirname, localFileName).replace("out/", "");
    return readFileSync(fullPath).toString();
}
