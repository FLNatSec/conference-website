// Minimal typing for the parts of mapshaper's API used by the geometry script.
declare module "mapshaper" {
  const mapshaper: {
    /** Runs commands; `input` maps virtual filenames (used in -i / -erase) to file contents. */
    applyCommands(commands: string, input?: Record<string, string>): Promise<Record<string, string | Uint8Array>>;
  };
  export default mapshaper;
}
