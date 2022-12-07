import { readLocalFile } from "../utils/io";

function applyCommand(command: string, fileHierarchy: Record<string, unknown>) {
    if (command.startsWith("cd")) {
        command = command
            .replace("cd", "")
            .trim();

        if (command === "/") {
            fileHierarchy["cwd"] = "/";
        } else if (command === "..") {
            const end = fileHierarchy["cwd"]?.toString().lastIndexOf("/");
            fileHierarchy["cwd"] = fileHierarchy["cwd"]
                ?.toString()
                .substring(0, end)
                .padStart(1, "/");
        } else {
            fileHierarchy["cwd"] = `${fileHierarchy["cwd"] || ""}/${command}`
                .replace("//", "/");
        }
    }
}

function findDirectory(directoryPath: string, hierarchy: Record<string, unknown>): Record<string, unknown> {
    let result = hierarchy;

    directoryPath
        .split("/")
        .filter(value => value.length > 0)
        .forEach(subdirectory => {
            result = result[subdirectory] as Record<string, unknown>;
        });

    return result;
}

function buildFileHierarchy(terminalOutput: string[]): Record<string, unknown> {
    const hierarchy: Record<string, unknown> = {};

    terminalOutput.forEach(line =>{
        const cwd = findDirectory(hierarchy["cwd"]?.toString() || "", hierarchy);

        if (line.startsWith("$")) {
            line = line.replace("$", "").trim();
            applyCommand(line, hierarchy);
        } else if (line.startsWith("dir")) {
            line = line.replace("dir", "").trim();
            cwd[line] = cwd[line] || {};
        } else {
            const [size, name] = line.split(" ");
            cwd[name] = parseInt(size);
        }
    });

    return hierarchy;
}

const terminalOutput = readLocalFile("terminal-output.txt", __dirname)
    .trim()
    .split("\n");
const fileHierarchy = buildFileHierarchy(terminalOutput);

function updateTotalSizes(hierarchy: Record<string, unknown>) {
    Object
        .keys(hierarchy)
        .filter(key => key !== "0" && key !== "cwd" && key !== "size")
        .forEach(key => {
            const child = hierarchy[key] as Record<string, unknown>;
            const currentSize: number = (hierarchy["size"] as number) || 0;
            let sizeToAdd = 0;

            if (Object.keys(child).filter(key => key !== "0" && key !== "size").length > 0) {
                updateTotalSizes(child);
                sizeToAdd = (child["size"] as number) || 0;
            }
            else {
                sizeToAdd = (hierarchy[key] as number) || 0;
            }

            hierarchy["size"] = currentSize + sizeToAdd;
        });
}

updateTotalSizes(fileHierarchy);

function hasSizeKey(object: Record<string, unknown>): boolean {
    return object !== undefined
        && object !== null
        && Object
            .keys(object)
            .filter(key => key === "size")
            .length > 0;
}

function collectDirectoriesNoBiggerThan(hierarchy: Record<string, unknown>, maxSize: number): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];

    Object
        .keys(hierarchy)
        .filter(key => hasSizeKey(hierarchy[key] as Record<string, unknown>))
        .filter(key => {
            return (((hierarchy[key] as Record<string, unknown>)["size"] as number) || 0) <= maxSize;
        })
        .forEach(key => {
            result.push(hierarchy[key] as Record<string, unknown>);
        });

    Object
        .keys(hierarchy)
        .filter(key => hasSizeKey(hierarchy[key] as Record<string, unknown>))
        .forEach(key => {
            result.push(...collectDirectoriesNoBiggerThan(hierarchy[key] as Record<string, unknown>, maxSize));
        });

    return result;
}

const smallDirectories = collectDirectoriesNoBiggerThan(fileHierarchy, 100000);
let sum = 0;

smallDirectories.forEach(directory => sum += (directory["size"] as number));
console.log(sum);

function collectDirectoriesBiggerThan(hierarchy: Record<string, unknown>, minSize: number): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];

    Object
        .keys(hierarchy)
        .filter(key => hasSizeKey(hierarchy[key] as Record<string, unknown>))
        .filter(key => {
            return (((hierarchy[key] as Record<string, unknown>)["size"] as number) || 0) > minSize;
        })
        .forEach(key => {
            result.push(hierarchy[key] as Record<string, unknown>);
        });

    Object
        .keys(hierarchy)
        .filter(key => hasSizeKey(hierarchy[key] as Record<string, unknown>))
        .forEach(key => {
            result.push(...collectDirectoriesBiggerThan(hierarchy[key] as Record<string, unknown>, minSize));
        });

    return result;
}

const totalUsedSpace = fileHierarchy["size"] as number;
const requiredSpaceToFreeUp = totalUsedSpace - 40000000;
console.log(
    (collectDirectoriesBiggerThan(fileHierarchy, requiredSpaceToFreeUp)
        .sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
            return (a["size"] as number) - (b["size"] as number);
        })
        .at(0) as Record<string, unknown>)["size"]
);
