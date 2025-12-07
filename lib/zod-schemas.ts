import { z } from "zod";

export const ScoreWeightSchema = z.object({
  market_demand: z.number(),
  de_risking_automation: z.number(),
  transferability: z.number(),
  salary_potential: z.number(),
  time_to_break_in: z.number(),
});

export const ScoreBreakdownSchema = z.object({
  final: z.number(),
  automation_risk: z.number(),
  market_demand: z.number(),
  transferability: z.number(),
  salary_potential: z.number(),
  time_to_break_in: z.number(),
  weights: ScoreWeightSchema,
});

export const EvidenceSchema = z.object({
  claim: z.string(),
  rationale: z.string(),
});

export const ResourceSchema = z.object({
  type: z.enum(['course', 'book', 'yt', 'project', 'cert', 'article', 'doc']),
  title: z.string(),
  provider: z.string().optional(),
  est_hours: z.number().optional(),
});

export const MissingSkillSchema = z.object({
  skill: z.string(),
  why_it_matters: z.string(),
  estimated_learning_hours: z.number(),
  learning_sequence_order: z.number(),
  resources: z.array(ResourceSchema),
});

export const SalarySchema = z.object({
  currency: z.string(),
  p50: z.number().optional(),
  p90: z.number().optional(),
  note: z.string().optional(),
});

export const EntryPathSchema = z.object({
  time_to_break_in_months: z.number(),
  starter_projects: z.array(z.string()),
  certs: z.array(z.string()).optional(),
  proof_of_work_assets: z.array(z.string()),
});

export const OutreachTemplatesSchema = z.object({
  cold_dm: z.string(),
  linkedin_about: z.string(),
  resume_headline: z.string(),
});

export const RoleOverviewSchema = z.object({
    core_responsibilities: z.string(),
    work_environment: z.string(),
    day_to_day: z.string(),
    impact_potential: z.string(),
});

export const AutomationResistanceAnalysisSchema = z.object({
    ai_displacement_risk: z.object({
        level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
        reasoning: z.string(),
    }),
    ten_year_outlook: z.object({
        outlook: z.enum(['STRONG', 'STABLE', 'WEAK']),
        projections: z.string(),
    }),
    human_centric_elements: z.object({
        level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
        aspects: z.string(),
    }),
    adaptability_score: z.number(),
    skill_durability: z.number(),
    future_trends_impact: z.array(z.object({
        trend: z.string(),
        impact: z.string(),
    })),
});

export const FitAnalysisSchema = z.object({
    match_percentage: z.number(),
    skills: z.array(z.object({
        skill: z.string(),
        transfer_type: z.enum(['Direct Transfer', 'High Applicability', 'Strong Base']),
    })),
    leverage: z.array(z.object({
        area: z.enum(['Current Role', 'Past Project', 'Industry']),
        details: z.string(),
    })),
    goals: z.array(z.object({
        goal: z.string(),
        status: z.enum(['Met', 'Satisfied']),
    })),
    edge: z.array(z.object({
        area: z.enum(['Differentiator', 'Skill Combo', 'Market Gap']),
        details: z.string(),
    })),
});

export const SkillTransferBreakdownSchema = z.array(z.object({
    current_skill: z.string(),
    how_it_transfers: z.string(),
    proficiency_level: z.enum(['Ready', 'Minor adaptation']),
    value_to_role: z.enum(['High', 'Medium', 'Low']),
}));

export const MarketIntelligenceSchema = z.object({
    job_growth_5yr: z.object({
        percentage: z.number(),
        industry_avg: z.number(),
        source: z.string(),
    }),
    current_openings: z.object({
        count: z.number(),
        source: z.string(),
    }),
    geographic_hotspots: z.array(z.object({
        city: z.string(),
        source: z.string(),
    })),
    salary_entry: SalarySchema,
    salary_mid_level_3_5yr: SalarySchema,
    salary_senior_5_8yr: SalarySchema,
    salary_top_10_percent: SalarySchema,
    remote_availability: z.object({
        percentage: z.number(),
        source: z.string(),
    }),
    industry_concentration: z.array(z.object({
        industry: z.string(),
    })),
    market_trends_5yr: z.array(z.object({
        trend: z.string(),
        impact: z.string(),
    })),
});

export const SalaryProgressionSchema = z.array(z.object({
    level: z.enum(['Entry Level', 'Mid-Level', 'Senior Level', 'Principal/Lead']),
    years: z.string(),
    salary: SalarySchema,
    growth_percentage: z.number(),
}));

export const CareerPathSuggestionSchema = z.object({
  title: z.string(),
  short_pitch: z.string(),
  why_future_proof: z.string(),
  automation_risk: z.number(),
  market_demand: z.number(),
  salary: SalarySchema,
  transferable_skills: z.array(z.string()),
  missing_skills: z.array(MissingSkillSchema),
  entry_path: EntryPathSchema,
  first_14_days: z.array(z.string()),
  outreach_templates: OutreachTemplatesSchema,
  score_breakdown: ScoreBreakdownSchema,
  evidence: z.array(EvidenceSchema),
  role_overview: RoleOverviewSchema,
  automation_resistance_analysis: AutomationResistanceAnalysisSchema,
  fit_analysis: FitAnalysisSchema,
  skill_transfer_breakdown: SkillTransferBreakdownSchema,
  market_intelligence: MarketIntelligenceSchema,
  salary_progression: SalaryProgressionSchema,
  skill_transfer_percentage: z.number(),
  estimated_pivot_time_months: z.number(),
  match_score: z.number(),
  job_growth_rate: z.number(),
  learning_investment: z.number(),
  entrepreneurial_potential: z.string(),
  geographic_flexibility: z.string(),
});

export const DecisionRowSchema = z.object({
  title: z.string(),
  final_score: z.number(),
  automation_risk: z.number(),
  market_demand: z.number(),
  transferability: z.number(),
  salary_potential: z.number(),
  time_to_break_in: z.number(),
});

export const MetadataSchema = z.object({
  titles: z.array(z.string()),
  highlights: z.array(z.string()),
  best_path: z.string(),
  summary: z.string(),
  scores: z.array(z.object({ title: z.string(), score: z.number() })),
  candidate_count: z.number(),
  generated_at: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  notes: z.string().optional(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  })
});

export const ComparisonMatrixRowSchema = z.object({
    factor: z.string(),
    path1: z.string(),
    path2: z.string(),
    path3: z.string(),
    path4: z.string(),
});

export const TransitionPhaseSchema = z.object({
    phase: z.string(),
    timeline: z.string(),
    key_activities: z.string(),
    success_metrics: z.string(),
    budget: z.string(),
});

export const DailyTaskSchema = z.object({
    day: z.number(),
    primary_task: z.string(),
    time: z.string(),
    output: z.string(),
});

export const WeeklySprintSchema = z.object({
    week: z.number(),
    title: z.string(),
    daily_tasks: z.array(DailyTaskSchema),
});

export const SprintSuccessMetricsSchema = z.array(z.object({
    metric: z.string(),
}));

export const ScriptTemplateSchema = z.object({
    title: z.string(),
    subject_line: z.string().optional(),
    body: z.string(),
});

export const TopCompanySchema = z.object({
    company: z.string(),
    locations: z.string(),
    why_hiring: z.string(),
    application_tips: z.string(),
});

export const IndustryHotspotSchema = z.object({
    industry: z.string(),
    details: z.string(),
});

export const GeographicDemandSchema = z.object({
    city: z.string(),
    openings: z.number(),
    avg_salary: z.number(),
    top_employers: z.array(z.string()),
});

export const ApplicationStrategySchema = z.object({
    company_type: z.enum(['Startups', 'Mid-Size Companies', 'Enterprise']),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    strategy: z.string(),
});

export const SourceSchema = z.object({
    id: z.number(),
    description: z.string(),
    url: z.string(),
    data_used: z.string(),
});

export const FinalRecommendationSchema = z.object({
    primary_focus: z.object({
        title: z.string(),
        why: z.string(),
        timeline_months: z.number(),
        first_actions: z.array(z.object({ action: z.string(), deadline: z.string() })),
    }),
    backup_option: z.object({
        title: z.string(),
        when_to_consider: z.string(),
        key_difference: z.string(),
    }),
});

export const SuccessMindsetSchema = z.array(z.object({
    point: z.string(),
}));

export const RedFlagSchema = z.array(z.object({
    area: z.enum(['Job Search', 'Transition']),
    flag: z.string(),
}));

export const CommunitySchema = z.object({
    platform: z.string(),
    name: z.string(),
    why_valuable: z.string(),
});

export const BookPodcastSchema = z.object({
    type: z.enum(['Book', 'Podcast']),
    title: z.string(),
    author_or_host: z.string(),
    why_relevant: z.string(),
});

export const CoachingMentorshipSchema = z.object({
    type: z.enum(['Coaching', 'Mentorship']),
    details: z.string(),
});

export const CareerPathResponseSchema = z.object({
  metadata: MetadataSchema,
  decisionMatrix: z.array(DecisionRowSchema),
  suggestions: z.array(CareerPathSuggestionSchema),
  globalRationale: z.string(),
  executive_summary: z.string(),
  path_rankings_overview: z.object({
    why_winner: z.string(),
  }),
  head_to_head_comparison_matrix: z.array(ComparisonMatrixRowSchema),
  personalized_transition_strategy: z.object({
      overall_timeline: z.array(TransitionPhaseSchema),
      detailed_breakdown: z.array(TransitionPhaseSchema),
  }),
  thirty_day_action_sprint: z.object({
      weeks: z.array(WeeklySprintSchema),
      success_metrics: SprintSuccessMetricsSchema,
  }),
  offer_getting_scripts: z.array(ScriptTemplateSchema),
  top_employers_application_strategies: z.object({
      top_companies: z.array(TopCompanySchema),
      industry_hotspots: z.array(IndustryHotspotSchema),
      geographic_demand: z.array(GeographicDemandSchema),
      application_strategies: z.array(ApplicationStrategySchema),
  }),
  source_list: z.array(SourceSchema),
  final_recommendations: z.object({
      optimal_path: FinalRecommendationSchema,
      success_mindset: SuccessMindsetSchema,
      red_flags: RedFlagSchema,
  }),
  additional_resources: z.object({
      communities: z.array(CommunitySchema),
      books_podcasts: z.array(BookPodcastSchema),
      coaching_mentorship: z.array(CoachingMentorshipSchema),
  }),
});
