import { EventEmitter } from 'events';

/**
 * @typedef {Object} DomainEvent
 * @property {string} type
 * @property {string} aggregateId
 * @property {string} aggregateType
 * @property {Record<string, unknown>} payload
 * @property {Record<string, unknown>} metadata
 * @property {Date} timestamp
 */

/** @typedef {(event: DomainEvent) => Promise<void>|void} EventHandler */

export class EventBus extends EventEmitter {
  constructor() {
    super();
    /** @type {Map<string, EventHandler[]>} */
    this.handlers = new Map();
  }

  /**
   * @param {DomainEvent} event
   */
  emitEvent(event) {
    super.emit(event.type, event);
    super.emit('*', event);
  }

  /**
   * @param {string} type
   * @param {EventHandler} handler
   */
  onEvent(type, handler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    /** @type {EventHandler[]} */ (this.handlers.get(type)).push(handler);
    super.on(type, handler);
  }

  /**
   * @param {EventHandler} handler
   */
  onAny(handler) {
    super.on('*', handler);
  }

  /**
   * @param {string} type
   * @param {EventHandler} handler
   */
  offEvent(type, handler) {
    const handlers = this.handlers.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index >= 0) handlers.splice(index, 1);
    }
    super.off(type, handler);
  }
}

export const eventBus = new EventBus();

/**
 * @param {string} type
 * @param {string} aggregateId
 * @param {string} aggregateType
 * @param {Record<string, unknown>} payload
 * @param {Record<string, unknown>} [metadata]
 * @returns {DomainEvent}
 */
export function createEvent(type, aggregateId, aggregateType, payload, metadata = {}) {
  return {
    type,
    aggregateId,
    aggregateType,
    payload,
    metadata,
    timestamp: new Date()
  };
}

export const EventTypes = {
  PROJECT_CREATED: 'project.created',
  PROJECT_UPDATED: 'project.updated',
  PROJECT_ARCHIVED: 'project.archived',
  TASK_CREATED: 'task.created',
  TASK_UPDATED: 'task.updated',
  TASK_COMPLETED: 'task.completed',
  ACTION_CREATED: 'action.created',
  ACTION_STARTED: 'action.started',
  ACTION_COMPLETED: 'action.completed',
  ACTION_FAILED: 'action.failed',
  PROPOSAL_CREATED: 'proposal.created',
  PROPOSAL_APPROVED: 'proposal.approved',
  PROPOSAL_REJECTED: 'proposal.rejected',
  PROPOSAL_EXECUTED: 'proposal.executed',
  APPROVAL_GRANTED: 'approval.granted',
  APPROVAL_DENIED: 'approval.denied',
  MEMORY_CAPTURED: 'memory.captured',
  MEMORY_PROMOTED: 'memory.promoted',
  MEMORY_SUPERSEDED: 'memory.superseded',
  PERSONA_CREATED: 'persona.created',
  MANAGER_TRIGGERED: 'manager.triggered',
  COUNCIL_CREATED: 'council.created',
  COUNCIL_SESSION_STARTED: 'council.session.started',
  COUNCIL_SESSION_ENDED: 'council.session.ended',
  DECISION_MADE: 'decision.made',
  CONVERSATION_STARTED: 'conversation.started',
  MESSAGE_SENT: 'message.sent',
  FILE_CREATED: 'file.created',
  FILE_UPDATED: 'file.updated',
  FILE_DELETED: 'file.deleted',
  SYNC_CONFLICT: 'sync.conflict',
  SYNC_RESOLVED: 'sync.resolved',
  NOTIFICATION_CREATED: 'notification.created',
  AUTOMATION_TRIGGERED: 'automation.triggered',
  AUTOMATION_COMPLETED: 'automation.completed',
  CONFLICT_DETECTED: 'conflict.detected',
  CONFLICT_RESOLVED: 'conflict.resolved'
};
