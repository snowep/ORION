/** @typedef {import('./base').BaseEntity} BaseEntity */
/** @typedef {import('./base').EntityId} EntityId */

/**
 * @typedef {Object} Project
 * @property {string} name
 * @property {string} description
 * @property {string[]} goals
 * @property {'active'|'paused'|'completed'|'archived'} status
 * @property {string} workspacePath
 * @property {Record<string, unknown>} metadata
 */

/** @typedef {'active'|'paused'|'completed'|'archived'} ProjectStatus */

/**
 * @typedef {Object} Task
 * @property {EntityId} projectId
 * @property {string} title
 * @property {string} description
 * @property {TaskStatus} status
 * @property {TaskPriority} priority
 * @property {EntityId[]} assigneeIds
 * @property {EntityId[]} dependsOn
 * @property {Date|null} dueDate
 * @property {EntityId[]} artifacts
 * @property {Record<string, unknown>} metadata
 */

/** @typedef {'backlog'|'ready'|'in-progress'|'review'|'done'|'blocked'|'cancelled'} TaskStatus */
/** @typedef {'low'|'medium'|'high'|'critical'} TaskPriority */

/**
 * @typedef {Object} Action
 * @property {EntityId|null} taskId
 * @property {ActionType} type
 * @property {Record<string, unknown>} payload
 * @property {ActionStatus} status
 * @property {ActionResult|null} result
 * @property {EntityId|null} approvedProposalId
 */

/** @typedef {'create_file'|'edit_file'|'rename_file'|'delete_file'|'create_project'|'update_project'|'run_command'|'search'|'model_generate'} ActionType */
/** @typedef {'pending'|'running'|'completed'|'failed'|'cancelled'|'awaiting_approval'} ActionStatus */

/** @typedef {Object} ActionResult @property {boolean} success @property {unknown} output @property {string[]} evidence @property {string|null} error */

/**
 * @typedef {Object} Proposal
 * @property {string} title
 * @property {string} description
 * @property {ActionType} actionType
 * @property {ProposalTarget} target
 * @property {ProposalScope} scope
 * @property {string} reason
 * @property {RiskLevel} risk
 * @property {Reversibility} reversibility
 * @property {Date} expiresAt
 * @property {string[]} evidence
 * @property {ProposalStatus} status
 * @property {number} approvedVersion
 */

/** @typedef {Object} ProposalTarget @property {string} entityType @property {EntityId|null} entityId @property {string|null} path */
/** @typedef {Object} ProposalScope @property {string[]} files @property {string[]} databases @property {string[]} commands @property {string[]} external */
/** @typedef {'low'|'medium'|'high'|'critical'} RiskLevel */
/** @typedef {'trivial'|'easy'|'hard'|'impossible'} Reversibility */
/** @typedef {'draft'|'pending'|'approved'|'rejected'|'expired'|'executed'} ProposalStatus */

/**
 * @typedef {Object} Approval
 * @property {EntityId} proposalId
 * @property {number} proposalVersion
 * @property {EntityId|null} approverId
 * @property {'approved'|'rejected'} decision
 * @property {string|null} reason
 * @property {Date} expiresAt
 */

/**
 * @typedef {Object} Memory
 * @property {string} content
 * @property {MemoryType} type
 * @property {MemoryStatus} status
 * @property {MemorySource} source
 * @property {Provenance} provenance
 * @property {string[]} tags
 * @property {EntityId|null} projectId
 * @property {EntityId[]} relatedEntities
 * @property {number} confidence
 */

/** @typedef {'fact'|'opinion'|'decision'|'assumption'|'preference'|'goal'|'experience'|'observation'|'relationship'|'instruction'} MemoryType */
/** @typedef {'short-term'|'candidate'|'durable'|'experience'|'superseded'|'expired'|'forgotten'} MemoryStatus */

/** @typedef {Object} MemorySource @property {'conversation'|'file'|'web'|'tool'|'user'|'persona'|'council'|'system'} type @property {string|null} referenceId @property {Record<string, unknown>} metadata */

/** @typedef {Object} Provenance @property {MemorySource} originalSource @property {ProvenanceStep[]} transformations @property {number[]} confidenceHistory */
/** @typedef {Object} ProvenanceStep @property {string} operation @property {Date} timestamp @property {string} actor @property {Record<string, unknown>} details */

/**
 * @typedef {Object} Persona
 * @property {string} name
 * @property {string} role
 * @property {string} personality
 * @property {string[]} expertise
 * @property {string[]} knowledge
 * @property {string[]} capabilities
 * @property {PersonaPermission[]} permissions
 * @property {EntityId[]} memoryIds
 * @property {EntityId[]} councilIds
 * @property {boolean} isRealPersonInspired
 * @property {string[]} sourceReferences
 */

/** @typedef {Object} PersonaPermission @property {string} domain @property {string[]} actions @property {boolean} requiresApproval */

/**
 * @typedef {Object} Manager
 * @property {string} domain
 * @property {MonitoringRule[]} monitoringRules
 * @property {boolean} canRunUnattended
 */

/** @typedef {Object} MonitoringRule @property {EntityId} id @property {string} trigger @property {string} condition @property {string} action @property {boolean} enabled */

/**
 * @typedef {Object} Council
 * @property {string} name
 * @property {string} purpose
 * @property {CouncilType} type
 * @property {EntityId[]} permanentMemberIds
 * @property {EntityId[]} rotatingMemberIds
 * @property {CouncilRules} rules
 * @property {EntityId|null} chairId
 * @property {CouncilPermission[]} permissions
 */

/** @typedef {'permanent'|'rotating'} CouncilType */
/** @typedef {Object} CouncilRules @property {number} quorum @property {number} decisionThreshold @property {number} maxRounds @property {boolean} allowUserParticipation @property {boolean} privateDeliberation */
/** @typedef {Object} CouncilPermission @property {string} domain @property {string[]} actions @property {boolean} requiresUserApproval */

/**
 * @typedef {Object} CouncilSession
 * @property {EntityId} councilId
 * @property {string} topic
 * @property {string} briefing
 * @property {CouncilSessionStatus} status
 * @property {EntityId[]} participantIds
 * @property {CouncilPosition[]} positions
 * @property {Disagreement[]} disagreements
 * @property {string|null} synthesis
 * @property {EntityId|null} proposalId
 * @property {Date} startedAt
 * @property {Date|null} endedAt
 */

/** @typedef {'briefing'|'deliberation'|'synthesis'|'proposal'|'approved'|'rejected'|'archived'} CouncilSessionStatus */

/** @typedef {Object} CouncilPosition @property {EntityId} personaId @property {string} stance @property {string} reasoning @property {string[]} evidence @property {number} confidence @property {number} round */
/** @typedef {Object} Disagreement @property {EntityId} id @property {string} topic @property {EntityId[]} personaIds @property {string[]} positions @property {boolean} resolved @property {string|null} resolution */

/**
 * @typedef {Object} Decision
 * @property {EntityId|null} projectId
 * @property {EntityId|null} councilSessionId
 * @property {string} question
 * @property {string} answer
 * @property {string} reasoning
 * @property {string[]} evidence
 * @property {EntityId[]} participants
 * @property {EntityId|null} approvalId
 * @property {EntityId[]} supersedes
 * @property {EntityId[]} affectedEntities
 */

/**
 * @typedef {Object} Conversation
 * @property {string} title
 * @property {EntityId|null} projectId
 * @property {EntityId[]} participantIds
 * @property {EntityId[]} messageIds
 * @property {Record<string, unknown>} metadata
 */

/**
 * @typedef {Object} Message
 * @property {EntityId} conversationId
 * @property {'user'|'assistant'|'system'|'persona'|'tool'} role
 * @property {string} content
 * @property {Citation[]} citations
 * @property {ToolCall[]} toolCalls
 * @property {Record<string, unknown>} metadata
 */

/** @typedef {Object} Citation @property {EntityId} sourceId @property {string} sourceType @property {string} excerpt @property {number} relevance */
/** @typedef {Object} ToolCall @property {string} tool @property {Record<string, unknown>} input @property {Record<string, unknown>} output @property {boolean} approved @property {EntityId|null} approvalId */

/**
 * @typedef {Object} Artifact
 * @property {string} name
 * @property {ArtifactType} type
 * @property {string} content
 * @property {string} format
 * @property {EntityId|null} projectId
 * @property {EntityId|null} sourceEntityId
 * @property {Record<string, unknown>} metadata
 */

/** @typedef {'document'|'code'|'diagram'|'decision'|'proposal'|'report'|'session'|'other'} ArtifactType */

/** @typedef {Object} Event @property {string} type @property {EntityId} aggregateId @property {string} aggregateType @property {Record<string, unknown>} payload @property {Record<string, unknown>} metadata */

/** @typedef {Object} Notification @property {EntityId} userId @property {NotificationType} type @property {string} title @property {string} message @property {NotificationPriority} priority @property {boolean} read @property {string|null} actionUrl @property {Record<string, unknown>} metadata */
/** @typedef {'approval_needed'|'task_finished'|'task_failed'|'observation'|'conflict'|'automation'|'system'} NotificationType */
/** @typedef {'low'|'medium'|'high'|'urgent'} NotificationPriority */

/** @typedef {Object} Automation @property {string} name @property {string} description @property {AutomationTrigger} trigger @property {AutomationAction} action @property {boolean} enabled @property {Date|null} lastRun @property {Date|null} nextRun */
/** @typedef {Object} AutomationTrigger @property {'schedule'|'event'|'condition'} type @property {string|null} cron @property {string|null} eventType @property {string|null} condition */
/** @typedef {Object} AutomationAction @property {string} type @property {Record<string, unknown>} payload @property {boolean} requiresApproval */

/** @typedef {Object} Tool @property {string} name @property {string} description @property {Record<string, unknown>} inputSchema @property {Record<string, unknown>} outputSchema @property {string} adapter @property {string[]} permissions @property {boolean} requiresApproval */

/** @typedef {Object} Permission @property {EntityId} subjectId @property {'user'|'persona'|'manager'|'council'} subjectType @property {string} resource @property {string[]} actions @property {Record<string, unknown>} conditions */

/** @typedef {Object} Conflict @property {string} entityType @property {EntityId} entityId @property {string} field @property {ConflictValue[]} values @property {ConflictStatus} status @property {ConflictResolution|null} resolution */
/** @typedef {Object} ConflictValue @property {unknown} value @property {string} source @property {Date} timestamp @property {number} confidence */
/** @typedef {'detected'|'evaluating'|'resolved'|'escalated'} ConflictStatus */
/** @typedef {'user_chosen'|'authority_based'|'latest_wins'|'merge'|'preserve_both'} ConflictResolution */

