export const compressResearchSimpleHumanMessage = (tokenLimit: number): string => `
Clean up these research findings per compression guidelines, and ensure all actionable content—custom strategy, skills gap, 30-day sprint, and scripts—remain complete, easy to use, and well-labeled.

**Remember:**
- Consolidate duplicate information
- Preserve all unique data points, numbers, and actionable checklists/plans/scripts
- Keep citations for every claim and script
- Organize by topic, not chronologically
- Target ${tokenLimit} tokens maximum
- Number sources sequentially without gaps

Do NOT summarize or lose any practical, how-to, or script/template content. Present findings clearly, concisely, and in a way that allows immediate user action.
`;