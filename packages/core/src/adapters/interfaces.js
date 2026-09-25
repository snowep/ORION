/**
 * ORION adapter contracts (JSDoc).
 *
 * Outside technology belongs behind adapters. These contracts define the
 * shapes that P0.3+ implementations must satisfy. They are documentation
 * only until the concrete adapters land (P0.3 SQLite + Filesystem,
 * P0.8 Model Provider, later Search + Git).
 */

/**
 * @typedef {Object} Migration
 * @property {number} version
 * @property {string} name
 * @property {string} up
 * @property {string} down
 */

/**
 * @typedef {Object} DatabaseAdapter
 * @property {() => Promise<void>} connect
 * @property {() => Promise<void>} disconnect
 * @property {(sql: string, params?: unknown[]) => Promise<{changes: number, lastInsertRowid: number|bigint}>} run
 * @property {(sql: string, params?: unknown[]) => Promise<unknown|undefined>} get
 * @property {(sql: string, params?: unknown[]) => Promise<unknown[]>} all
 * @property {<T>(fn: () => Promise<T>) => Promise<T>} transaction
 * @property {(migrations: Migration[]) => Promise<void>} migrate
 */

/**
 * @typedef {Object} FileStat
 * @property {string} path
 * @property {boolean} isFile
 * @property {boolean} isDirectory
 * @property {number} size
 * @property {Date} modifiedAt
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} FilesystemAdapter
 * @property {(path: string) => Promise<string>} readFile
 * @property {(path: string, content: string) => Promise<void>} writeFile
 * @property {(path: string, content: string) => Promise<void>} appendFile
 * @property {(path: string) => Promise<void>} deleteFile
 * @property {(path: string) => Promise<boolean>} exists
 * @property {(dir: string, recursive?: boolean) => Promise<string[]>} listFiles
 * @property {(dir: string, recursive?: boolean) => Promise<void>} mkdir
 * @property {(path: string) => Promise<(FileStat|null)>} stat
 * @property {(relativePath: string) => string} resolvePath
 * @property {(path: string) => boolean} isWithinRoot
 */

/**
 * @typedef {Object} GenerationOptions
 * @property {string} [model]
 * @property {number} [temperature]
 * @property {number} [maxTokens]
 * @property {number} [topP]
 * @property {string} [systemPrompt]
 * @property {string[]} [stopSequences]
 */

/**
 * @typedef {Object} TokenUsage
 * @property {number} promptTokens
 * @property {number} completionTokens
 * @property {number} totalTokens
 */

/**
 * @typedef {Object} GenerationResult
 * @property {string} content
 * @property {TokenUsage} usage
 * @property {string} finishReason
 * @property {string} model
 */

/**
 * @typedef {Object} GenerationChunk
 * @property {string} content
 * @property {boolean} done
 */

/**
 * @typedef {Object} HealthCheckResult
 * @property {boolean} healthy
 * @property {number} latencyMs
 * @property {string} model
 * @property {string} [error]
 */

/**
 * @typedef {Object} ModelProvider
 * @property {(prompt: string, options?: GenerationOptions) => Promise<GenerationResult>} generate
 * @property {(prompt: string, options?: GenerationOptions) => AsyncIterable<GenerationChunk>} generateStream
 * @property {() => Promise<HealthCheckResult>} healthCheck
 * @property {() => Promise<string[]>} getModels
 */

/**
 * @typedef {Object} SearchOptions
 * @property {number} [limit]
 * @property {number} [offset]
 * @property {Record<string, unknown>} [filters]
 * @property {string} [projectId]
 */

/**
 * @typedef {Object} SearchResult
 * @property {string} id
 * @property {string} title
 * @property {string} excerpt
 * @property {number} score
 * @property {Record<string, unknown>} metadata
 */

/**
 * @typedef {Object} SearchDocument
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {Record<string, unknown>} metadata
 */

/**
 * @typedef {Object} SearchAdapter
 * @property {(query: string, options?: SearchOptions) => Promise<SearchResult[]>} search
 * @property {(document: SearchDocument) => Promise<void>} index
 * @property {(id: string) => Promise<void>} remove
 */

/**
 * @typedef {Object} GitStatus
 * @property {string[]} staged
 * @property {string[]} unstaged
 * @property {string[]} untracked
 */

/**
 * @typedef {Object} GitCommit
 * @property {string} hash
 * @property {string} message
 * @property {string} author
 * @property {Date} date
 * @property {string[]} files
 */

/**
 * @typedef {Object} GitAdapter
 * @property {() => Promise<void>} init
 * @property {() => Promise<GitStatus>} status
 * @property {(files: string[]) => Promise<void>} add
 * @property {(message: string) => Promise<string>} commit
 * @property {(limit?: number) => Promise<GitCommit[]>} log
 * @property {(file?: string) => Promise<string>} diff
 * @property {() => Promise<string>} branch
 * @property {(branch: string) => Promise<void>} checkout
 * @property {(branch: string) => Promise<void>} createBranch
 */
