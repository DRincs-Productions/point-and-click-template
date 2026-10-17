# my-app-project-name

my-app-description

## Install dependencies

Use `npm ci --include=optional` with the committed lockfile. TypeScript 7 uses native
optional packages for each platform; keep their lockfile entries for Windows, Linux and
macOS when updating dependencies. A lockfile containing only the developer's platform can
install successfully elsewhere but leave `tsc` without its executable.
