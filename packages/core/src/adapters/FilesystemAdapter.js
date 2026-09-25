import { promises as fs } from 'fs';
import path from 'path';

/**
 * FilesystemAdapter - Implements FilesystemAdapter interface
 * Provides safe, root-constrained filesystem operations
 */
export class FilesystemAdapter {
  /**
   * @param {string} root - Root directory for all operations (absolute path)
   */
  constructor(root) {
    this.root = path.resolve(root);
  }

  /**
   * Resolve a relative path to absolute path within root
   * @param {string} relativePath
   * @returns {string}
   */
  resolvePath(relativePath) {
    const resolved = path.resolve(this.root, relativePath);
    if (!this.isWithinRoot(resolved)) {
      throw new Error(`Path traversal attempt blocked: ${relativePath}`);
    }
    return resolved;
  }

  /**
   * Check if a path is within the root directory
   * @param {string} absolutePath
   * @returns {boolean}
   */
  isWithinRoot(absolutePath) {
    const resolvedRoot = path.resolve(this.root);
    const resolvedPath = path.resolve(absolutePath);
    return resolvedPath.startsWith(resolvedRoot + path.sep) || resolvedPath === resolvedRoot;
  }

  /**
   * Read a file as string
   * @param {string} relativePath
   * @returns {Promise<string>}
   */
  async readFile(relativePath) {
    const absolutePath = this.resolvePath(relativePath);
    return fs.readFile(absolutePath, 'utf-8');
  }

  /**
   * Write a file (atomic write via temp file)
   * @param {string} relativePath
   * @param {string} content
   * @returns {Promise<void>}
   */
  async writeFile(relativePath, content) {
    const absolutePath = this.resolvePath(relativePath);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });

    // Atomic write: write to temp file then rename
    const tempPath = absolutePath + '.tmp.' + Date.now() + Math.random().toString(36).slice(2);
    await fs.writeFile(tempPath, content, 'utf-8');
    await fs.rename(tempPath, absolutePath);
  }

  /**
   * Append to a file
   * @param {string} relativePath
   * @param {string} content
   * @returns {Promise<void>}
   */
  async appendFile(relativePath, content) {
    const absolutePath = this.resolvePath(relativePath);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.appendFile(absolutePath, content, 'utf-8');
  }

  /**
   * Delete a file
   * @param {string} relativePath
   * @returns {Promise<void>}
   */
  async deleteFile(relativePath) {
    const absolutePath = this.resolvePath(relativePath);
    await fs.unlink(absolutePath);
  }

  /**
   * Check if a file/directory exists
   * @param {string} relativePath
   * @returns {Promise<boolean>}
   */
  async exists(relativePath) {
    const absolutePath = this.resolvePath(relativePath);
    try {
      await fs.access(absolutePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * List files in a directory
   * @param {string} relativeDir
   * @param {boolean} recursive
   * @returns {Promise<string[]>}
   */
  async listFiles(relativeDir, recursive = false) {
    const absoluteDir = this.resolvePath(relativeDir);

    if (!recursive) {
      const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
      return entries
        .filter(e => e.isFile())
        .map(e => path.relative(this.root, path.join(absoluteDir, e.name)));
    }

    // Recursive listing
    const results = [];
    async function walk(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else {
          results.push(path.relative(this.root, fullPath));
        }
      }
    }
    await walk(absoluteDir);
    return results;
  }

  /**
   * Create a directory
   * @param {string} relativeDir
   * @param {boolean} recursive
   * @returns {Promise<void>}
   */
  async mkdir(relativeDir, recursive = true) {
    const absoluteDir = this.resolvePath(relativeDir);
    await fs.mkdir(absoluteDir, { recursive });
  }

  /**
   * Get file stat
   * @param {string} relativePath
   * @returns {Promise<FileStat|null>}
   */
  async stat(relativePath) {
    const absolutePath = this.resolvePath(relativePath);
    try {
      const stat = await fs.stat(absolutePath);
      return {
        path: relativePath,
        isFile: stat.isFile(),
        isDirectory: stat.isDirectory(),
        size: stat.size,
        modifiedAt: stat.mtime,
        createdAt: stat.birthtime
      };
    } catch {
      return null;
    }
  }
}

/**
 * Create a FilesystemAdapter for system storage
 * @param {string} orionHome
 * @returns {FilesystemAdapter}
 */
export function createSystemFilesystemAdapter(orionHome) {
  return new FilesystemAdapter(orionHome);
}

/**
 * Create a FilesystemAdapter for workspace storage
 * @param {string} workspaceRoot
 * @returns {FilesystemAdapter}
 */
export function createWorkspaceFilesystemAdapter(workspaceRoot) {
  return new FilesystemAdapter(workspaceRoot);
}