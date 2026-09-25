/**
 * @typedef {Object} BaseEntity
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {number} version
 */

/**
 * Branded entity id — a string at runtime.
 * @typedef {string} EntityId
 */

/**
 * @returns {EntityId}
 */
export function createEntityId() {
  const g = /** @type {{ crypto?: { randomUUID?: () => string } }} */ (globalThis);
  return /** @type {EntityId} */ (
    g.crypto?.randomUUID?.() ||
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );
}

/**
 * @typedef {Object} Timestamped
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/** @typedef {Object} Versioned @property {number} version */
