import type { InferUITool, UIMessage } from "ai";
import { z } from "zod";
// import type { ArtifactKind } from "@/components/artifact";
// import type { createDocument } from "./ai/tools/create-document";
// import type { getWeather } from "./ai/tools/get-weather";
// import type { requestSuggestions } from "./ai/tools/request-suggestions";
// import type { updateDocument } from "./ai/tools/update-document";
import type { AppUsage } from "./usage";
import { activityLogs, chats, invitations, messages, reports, researchSessions, stream, teamMembers, teams, users } from "./db/schema";

export type Chat = typeof chats.$inferSelect;
export type NewChat = typeof chats.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Stream = typeof stream.$inferSelect;
export type NewStream = typeof stream.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert & {
  password?: string;
  passwordHash?: string;
};
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;

export type Invitation = typeof invitations.$inferSelect;
export type TeamDataWithMembers = Team & {
  users: Pick<User, 'id' | 'name' | 'email' | 'role'>[];
  invitations: Invitation[];
};

export type NewActivityLog = typeof activityLogs.$inferInsert;

export type Report = Omit<typeof reports.$inferSelect, keyof CareerPathResponse> & CareerPathResponse;
export type NewReport = typeof reports.$inferInsert;
export type ResearchSession = typeof researchSessions.$inferSelect;
export type NewResearchSession = typeof researchSessions.$inferInsert;

export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

// type weatherTool = InferUITool<typeof getWeather>;
// type createDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
// type updateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
// type requestSuggestionsTool = InferUITool<
//   ReturnType<typeof requestSuggestions>
// >;

export type ChatTools = {
  // getWeather: weatherTool;
  // createDocument: createDocumentTool;
  // updateDocument: updateDocumentTool;
  // requestSuggestions: requestSuggestionsTool;
};

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  // suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: string;
  // kind: ArtifactKind;
  clear: null;
  finish: null;
  usage: AppUsage;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};


import {
    ScoreWeightSchema,
    ScoreBreakdownSchema,
    EvidenceSchema,
    ResourceSchema,
    MissingSkillSchema,
    SalarySchema,
    EntryPathSchema,
    OutreachTemplatesSchema,
    RoleOverviewSchema,
    AutomationResistanceAnalysisSchema,
    FitAnalysisSchema,
    SkillTransferBreakdownSchema,
    MarketIntelligenceSchema,
    SalaryProgressionSchema,
    ComparisonMatrixRowSchema,
    TransitionPhaseSchema,
    DailyTaskSchema,
    WeeklySprintSchema,
    SprintSuccessMetricsSchema,
    ScriptTemplateSchema,
    TopCompanySchema,
    IndustryHotspotSchema,
    GeographicDemandSchema,
    ApplicationStrategySchema,
    SourceSchema,
    FinalRecommendationSchema,
    SuccessMindsetSchema,
    RedFlagSchema,
    CommunitySchema,
    BookPodcastSchema,
    CoachingMentorshipSchema,
    CareerPathSuggestionSchema,
    DecisionRowSchema,
    MetadataSchema,
    CareerPathResponseSchema
} from './zod-schemas';


/** =========================
    Career Report Data Types
 *  ========================= */

export type ScoreWeight = z.infer<typeof ScoreWeightSchema>;
export type ScoreBreakdown = z.infer<typeof ScoreBreakdownSchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type MissingSkill = z.infer<typeof MissingSkillSchema>;
export type Salary = z.infer<typeof SalarySchema>;
export type EntryPath = z.infer<typeof EntryPathSchema>;
export type OutreachTemplates = z.infer<typeof OutreachTemplatesSchema>;
export type RoleOverview = z.infer<typeof RoleOverviewSchema>;
export type AutomationResistanceAnalysis = z.infer<typeof AutomationResistanceAnalysisSchema>;
export type FitAnalysis = z.infer<typeof FitAnalysisSchema>;
export type SkillTransferBreakdown = z.infer<typeof SkillTransferBreakdownSchema>;
export type MarketIntelligence = z.infer<typeof MarketIntelligenceSchema>;
export type SalaryProgression = z.infer<typeof SalaryProgressionSchema>;
export type ComparisonMatrixRow = z.infer<typeof ComparisonMatrixRowSchema>;
export type TransitionPhase = z.infer<typeof TransitionPhaseSchema>;
export type DailyTask = z.infer<typeof DailyTaskSchema>;
export type WeeklySprint = z.infer<typeof WeeklySprintSchema>;
export type SprintSuccessMetrics = z.infer<typeof SprintSuccessMetricsSchema>;
export type ScriptTemplate = z.infer<typeof ScriptTemplateSchema>;
export type TopCompany = z.infer<typeof TopCompanySchema>;
export type IndustryHotspot = z.infer<typeof IndustryHotspotSchema>;
export type GeographicDemand = z.infer<typeof GeographicDemandSchema>;
export type ApplicationStrategy = z.infer<typeof ApplicationStrategySchema>;
export type Source = z.infer<typeof SourceSchema>;
export type FinalRecommendation = z.infer<typeof FinalRecommendationSchema>;
export type SuccessMindset = z.infer<typeof SuccessMindsetSchema>;
export type RedFlag = z.infer<typeof RedFlagSchema>;
export type Community = z.infer<typeof CommunitySchema>;
export type BookPodcast = z.infer<typeof BookPodcastSchema>;
export type CoachingMentorship = z.infer<typeof CoachingMentorshipSchema>;
export type CareerPathSuggestion = z.infer<typeof CareerPathSuggestionSchema>;
export type DecisionRow = z.infer<typeof DecisionRowSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type CareerPathResponse = z.infer<typeof CareerPathResponseSchema>;


export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
