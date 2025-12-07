"use client";

import { CareerPathResponse } from "@/lib/types";
import Markdown from "react-markdown";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">{title}</h2>
        {children}
    </section>
);

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-gray-50 p-6 rounded-lg shadow-sm mb-6 ${className}`}>
        {children}
    </div>
);

const ExecutiveSummarySection = ({ summary }: { summary: string }) => (
    <Section title="Executive Summary">
        <p className="text-gray-600 leading-relaxed">{summary}</p>
    </Section>
);

const SuggestionsSection = ({ suggestions }: { suggestions: CareerPathResponse['suggestions'] }) => (
    <Section title="Career Path Suggestions">
        <div className="grid md:grid-cols-2 gap-8">
            {suggestions.map((suggestion, index) => (
                <Card key={index}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{index + 1}. {suggestion.title}</h3>
                    <p className="text-gray-600 mb-4">{suggestion.short_pitch}</p>
                    <div className="text-sm">
                        <p><strong>Automation Risk:</strong> {suggestion.automation_risk}%</p>
                        <p><strong>Market Demand:</strong> {suggestion.market_demand}/10</p>
                        <p><strong>Salary:</strong> {suggestion.salary.p50} - {suggestion.salary.p90} {suggestion.salary.currency}</p>
                        <p><strong>Pivot Time:</strong> {suggestion.estimated_pivot_time_months} months</p>
                    </div>
                </Card>
            ))}
        </div>
    </Section>
);

const ComparisonMatrixSection = ({ matrix }: { matrix: CareerPathResponse['head_to_head_comparison_matrix'] }) => (
    <Section title="Head-to-Head Comparison">
        <Card>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="font-semibold text-gray-700 pb-2">Factor</th>
                        <th className="font-semibold text-gray-700 pb-2">Path 1</th>
                        <th className="font-semibold text-gray-700 pb-2">Path 2</th>
                        <th className="font-semibold text-gray-700 pb-2">Path 3</th>
                        <th className="font-semibold text-gray-700 pb-2">Path 4</th>
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="py-2 font-medium">{row.factor}</td>
                            <td className="py-2">{row.path1}</td>
                            <td className="py-2">{row.path2}</td>
                            <td className="py-2">{row.path3}</td>
                            <td className="py-2">{row.path4}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </Section>
);

const TransitionStrategySection = ({ strategy }: { strategy: CareerPathResponse['personalized_transition_strategy'] }) => (
    <Section title="Personalized Transition Strategy">
        <Card>
            <h3 className="text-xl font-semibold mb-4">Overall Timeline</h3>
            <div className="space-y-4">
            {strategy.overall_timeline.map((phase, index) => (
                <div key={index}>
                    <p><strong>{phase.phase}:</strong> {phase.timeline}</p>
                </div>
            ))}
            </div>
        </Card>
    </Section>
);

const SprintSection = ({ sprint }: { sprint: CareerPathResponse['thirty_day_action_sprint'] }) => (
    <Section title="30-Day Action Sprint">
        {sprint.weeks.map((week, index) => (
            <Card key={index}>
                <h3 className="text-lg font-semibold mb-3">Week {week.week}: {week.title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {week.daily_tasks.map(task => (
                        <li key={task.day}>Day {task.day}: {task.primary_task} ({task.time})</li>
                    ))}
                </ul>
            </Card>
        ))}
    </Section>
);

import { SimpleBarChart, SimpleRadarChart } from "@/components/charts";

const ScriptsSection = ({ scripts }: { scripts: CareerPathResponse['offer_getting_scripts'] }) => (
    <Section title="Offer-Getting Scripts">
        {scripts.map((script, index) => (
            <Card key={index}>
                <h3 className="text-lg font-semibold mb-2">{script.title}</h3>
                {script.subject_line && <p className="mb-2"><strong>Subject:</strong> {script.subject_line}</p>}
                <p className="text-gray-600 whitespace-pre-wrap">{script.body}</p>
            </Card>
        ))}
    </Section>
);

const SalaryProgressionSection = ({ salaryProgression }: { salaryProgression: CareerPathResponse['suggestions'][0]['salary_progression'] }) => {
    const chartData = salaryProgression.map(p => ({ name: p.level, salary: p.salary.p50 }));
    return (
        <Section title="Salary Progression">
            <Card>
                <SimpleBarChart data={chartData} xKey="name" yKey="salary" />
            </Card>
        </Section>
    )
};

const FitAnalysisSection = ({ fitAnalysis }: { fitAnalysis: CareerPathResponse['suggestions'][0]['fit_analysis'] }) => {
    const chartData = fitAnalysis.skills.map(s => ({ subject: s.skill, A: 100, fullMark: 100 }));
    return (
        <Section title="Fit Analysis">
            <Card>
                <SimpleRadarChart data={chartData} />
            </Card>
        </Section>
    )
};

const TopEmployersSection = ({ top_employers_application_strategies }: { top_employers_application_strategies: CareerPathResponse['top_employers_application_strategies'] }) => (
    <Section title="Top Employers & Application Strategies">
        <Card>
            <h3 className="text-xl font-semibold mb-4">Top Hiring Companies</h3>
            <div className="space-y-4">
            {top_employers_application_strategies.top_companies.map((company, index) => (
                <div key={index}>
                    <p><strong>{company.company}:</strong> {company.application_tips}</p>
                </div>
            ))}
            </div>
        </Card>
    </Section>
);

const FinalRecommendationsSection = ({ recommendations }: { recommendations: CareerPathResponse['final_recommendations'] }) => (
    <Section title="Final Recommendations">
        <Card>
            <h3 className="text-xl font-semibold mb-4">Your Optimal Path Forward</h3>
            <p><strong>Primary Focus:</strong> {recommendations.optimal_path.primary_focus.title}</p>
            <p>{recommendations.optimal_path.primary_focus.why}</p>
        </Card>
    </Section>
);

const AdditionalResourcesSection = ({ resources }: { resources: CareerPathResponse['additional_resources'] }) => (
    <Section title="Additional Resources">
        <Card>
            <h3 className="text-xl font-semibold mb-4">Communities to Join</h3>
            <div className="space-y-2">
            {resources.communities.map((community, index) => (
                <p key={index}><strong>{community.name}:</strong> {community.why_valuable}</p>
            ))}
            </div>
        </Card>
    </Section>
);

const SourcesSection = ({ sources }: { sources: CareerPathResponse['source_list'] }) => (
    <Section title="Sources">
        <Card>
            <ul className="list-disc pl-5 space-y-2 text-sm">
                {sources.map(source => (
                    <li key={source.id}><a href={source.url} className="text-blue-600 hover:underline">{source.description}</a>: {source.data_used}</li>
                ))}
            </ul>
        </Card>
    </Section>
);

export function FullReport({ report }: { report: CareerPathResponse }) {
  return (
    <div className="font-sans p-8 bg-white text-gray-800">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900">Your Automation-Resistant Career Path Report</h1>
        <p className="text-xl text-gray-600 mt-4">Prepared for: {report.metadata.user.name}</p>
      </header>
      
      <main>
        <ExecutiveSummarySection summary={report.executive_summary} />
        <SuggestionsSection suggestions={report.suggestions} />
        {report.suggestions.map((suggestion, index) => (
            <div key={index}>
                <SalaryProgressionSection salaryProgression={suggestion.salary_progression} />
                <FitAnalysisSection fitAnalysis={suggestion.fit_analysis} />
            </div>
        ))}
        <ComparisonMatrixSection matrix={report.head_to_head_comparison_matrix} />
        <TransitionStrategySection strategy={report.personalized_transition_strategy} />
        <SprintSection sprint={report.thirty_day_action_sprint} />
        <ScriptsSection scripts={report.offer_getting_scripts} />
        <TopEmployersSection top_employers_application_strategies={report.top_employers_application_strategies} />
        <FinalRecommendationsSection recommendations={report.final_recommendations} />
        <AdditionalResourcesSection resources={report.additional_resources} />
        <SourcesSection sources={report.source_list} />
      </main>

      <footer className="text-center mt-16 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">Report generated on {report.metadata.generated_at}</p>
      </footer>
    </div>
  );
}

export function PreviewReport({ preview }: { preview: string }) {
  return <Markdown>{preview}</Markdown>;
}
