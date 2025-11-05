// lib/deepResearcher/debug-tools.ts
// Run this to verify your tools are properly structured

import { thinkTool, ConductResearch, ResearchComplete, supervisorTools } from './llmUtils';

/**
 * Debug function to verify tool structure
 * Should log proper LangChain tool objects, NOT Zod schemas
 */
export function debugToolStructure() {
  console.debug('=== TOOL STRUCTURE DEBUG ===\n');
  
  console.debug('1. Individual Tools:');
  console.debug('thinkTool:', {
    name: thinkTool.name,
    description: thinkTool.description,
    hasSchema: !!thinkTool.schema,
    schemaType: typeof thinkTool.schema,
    // Check for Zod internals (should NOT be present)
    hasZodDef: !!(thinkTool as any)._def,
    hasZodStandard: !!(thinkTool as any)['~standard']
  });
  
  console.debug('\nConductResearch:', {
    name: ConductResearch.name,
    description: ConductResearch.description,
    hasSchema: !!ConductResearch.schema,
    schemaType: typeof ConductResearch.schema,
    hasZodDef: !!(ConductResearch as any)._def,
    hasZodStandard: !!(ConductResearch as any)['~standard']
  });
  
  console.debug('\nResearchComplete:', {
    name: ResearchComplete.name,
    description: ResearchComplete.description,
    hasSchema: !!ResearchComplete.schema,
    schemaType: typeof ResearchComplete.schema,
    hasZodDef: !!(ResearchComplete as any)._def,
    hasZodStandard: !!(ResearchComplete as any)['~standard']
  });
  
  console.debug('\n2. Tool Array:');
  console.debug('supervisorTools length:', supervisorTools.length);
  console.debug('supervisorTools types:', supervisorTools.map(t => ({
    name: t.name,
    type: t.constructor.name,
    isStructuredTool: t.constructor.name === 'StructuredTool' || t.constructor.name === 'DynamicStructuredTool'
  })));
  
  console.debug('\n3. Expected Structure:');
  console.debug('✓ Tools should be StructuredTool or DynamicStructuredTool instances');
  console.debug('✓ hasZodDef should be false');
  console.debug('✓ hasZodStandard should be false');
  console.debug('✗ If any are true, tools are raw Zod schemas and will fail');
  
  console.debug('\n=== END DEBUG ===');
}

// Run immediately if executed directly
if (require.main === module) {
  debugToolStructure();
}

/**
 * Alternative: Test tool schema conversion for Google AI
 */
export function testGoogleToolConversion() {
  console.debug('\n=== GOOGLE AI TOOL CONVERSION TEST ===\n');
  
  try {
    // Simulate what ChatGoogleGenerativeAI does
    const tools = supervisorTools.map(tool => {
      // LangChain should convert these to Google's function calling format
      return {
        name: tool.name,
        description: tool.description,
        parameters: tool.schema // This should be a Zod schema
      };
    });
    
    console.debug('Converted tools for Google AI:');
    tools.forEach(t => {
      console.debug(`\n${t.name}:`, {
        hasName: !!t.name,
        hasDescription: !!t.description,
        hasParameters: !!t.parameters,
        parametersType: typeof t.parameters,
        // Should NOT have these Zod internals
        hasDef: !!(t.parameters as any)?._def,
        hasStandard: !!(t.parameters as any)?['~standard']
      });
    });
    
    console.debug('\nIf hasDef or hasStandard are true, the schema is not properly formatted');
    
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}