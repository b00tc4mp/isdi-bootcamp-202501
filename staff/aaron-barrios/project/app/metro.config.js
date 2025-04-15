const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, ".."); // raíz del monorepo

const config = getDefaultConfig(projectRoot);

config.watchFolders = [
    path.resolve(workspaceRoot, "com"), // 👈 observar los cambios en com
];

config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
