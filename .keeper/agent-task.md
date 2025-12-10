# 🤖 Keeper Agent Task

## Task
Update the following documentation files to reflect recent code changes:
README.md docs/

## Scope of Work
You are strictly limited to the following actions:
1.  **Update Documentation**: Modify the documentation files to accurately reflect the code changes.
2.  **Follow Commit Instructions**: Adhere to the commit instruction provided at the end of this task.

**IMPORTANT**: Do not perform any other actions. Do not diagnose issues, suggest other code changes, or try to fix anything that is not directly related to the documentation update. If no documentation updates are needed, simply complete the task without making any changes.

## Instructions
1. Analyze the code changes below
2. Update the documentation to reflect:
   - New features or functions added
   - Modified APIs or interfaces
   - Changed dependencies or requirements
   - Updated installation or usage instructions
3. Maintain the existing tone and structure
4. Be concise but complete
5. Complete all actions using a maximum of TWO COMMANDS! If you cannot complete all actions within two commands, cancel and share your progress with the user.
6. After completing this task, run: git add . {{COMMIT_INSTRUCTION}}{{COMMIT_INSTRUCTION}} git commit -m "docs: update documentation"

---

## Changed Files
```
'README.mdn'```

## Code Changes
```diff
diff --git a/README.md b/README.md
index 9a0bb5f..03090e8 100644
--- a/README.md
+++ b/README.md
@@ -73,6 +73,7 @@ npm install
 # env
 cp .env.example .env
 # set LLM_PROVIDER, LLM_API_KEY, TAVILY_API_KEY, MCP_ENDPOINT, NEXT_PUBLIC_VERCEL_URL, etc.
+# Note: Sample data is no longer used for database seeding.
 
 # dev
 npm run dev        # Next.js dev server
@@ -163,4 +164,4 @@ Agents should output JSON matching your configured schema.
 
 MIT
 
----
+---
\ No newline at end of file
```
