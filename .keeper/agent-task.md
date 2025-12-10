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
'.vscode/launch.jsonn''components/messages.tsxn''design-system/Header.tsxn''lib/deepResearcher/actions/finalReportGeneration.tsn''lib/deepResearcher/configuration.tsn''lib/deepResearcher/llmUtils.tsn''next.config.jsn'```

## Code Changes
```diff
diff --git a/.vscode/launch.json b/.vscode/launch.json
index 40d32d0..de2257b 100644
--- a/.vscode/launch.json
+++ b/.vscode/launch.json
@@ -23,18 +23,34 @@
             "name": "Next.js: debug full stack",
             "type": "node",
             "request": "launch",
-            "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
-            "runtimeArgs": ["--inspect"],
-            "skipFiles": ["<node_internals>/**"],
-            "outFiles": [
-                "${workspaceFolder}/**/*.js"
+            "program": "${workspaceFolder}/node_modules/.bin/next",
+            "args": [
+                "dev"
+            ],
+            "runtimeArgs": [
+                "--inspect"
+            ],
+            "env": {
+                "__NEXT_DISABLE_TURBOPACK": "1"
+            },
+            "cwd": "${workspaceFolder}",
+            "sourceMaps": true,
+            "skipFiles": [
+                "<node_internals>/**",
+                "node_modules/**"
+            ],
+            "console": "integratedTerminal",
+            "internalConsoleOptions": "neverOpen",
+            "resolveSourceMapLocations": [
+                "${workspaceFolder}/**",
+                "!**/node_modules/**"
             ],
             "serverReadyAction": {
-              "action": "debugWithChrome",
-              "killOnServerStop": true,
-              "pattern": "- Local:.+(https?://.+)",
-              "uriFormat": "%s",
-              "webRoot": "${workspaceFolder}"
+                "action": "debugWithChrome",
+                "killOnServerStop": true,
+                "pattern": "- Local:.+(https?://.+)",
+                "uriFormat": "%s",
+                "webRoot": "${workspaceFolder}"
             }
         }
     ]
diff --git a/components/messages.tsx b/components/messages.tsx
index 99e30f4..5158939 100644
--- a/components/messages.tsx
+++ b/components/messages.tsx
@@ -57,7 +57,7 @@ function PureMessages({
       style={{ overflowAnchor: "none" }}
     >
       <Conversation className="flex flex-col w-full min-w-0 gap-4 mx-auto md:gap-6">
-        <ConversationContent className="flex flex-col max-w-3xl gap-4 px-2 py-4 mx-auto md:gap-4 md:px-4">
+        <ConversationContent className="flex flex-col max-w-4xl gap-4 px-4 py-4 mx-auto md:gap-4 md:px-6">
           {messages.map((message, index) => {
             const delay = isShowingGreeting ? greetingDelays[index] : 0;
             return (
diff --git a/design-system/Header.tsx b/design-system/Header.tsx
index 32eb88f..5b918d1 100644
--- a/design-system/Header.tsx
+++ b/design-system/Header.tsx
@@ -101,7 +101,7 @@ function UserMenu({ session }: any) {
 
 export function Header({ session }: any) {
   return (
-    <header className="fixed top-0 z-[10] h-[52px] w-full transition-all duration-300 mask-b-from-0% backdrop-blur-md bg-transparent md:block">
+    <header className="fixed top-0 z-[10] h-[52px] w-full transition-all duration-300 backdrop-blur-md bg-transparent md:block">
       <div className="flex items-center justify-between px-3 pt-2 mx-auto">
         <Link href="/" className="flex items-center">
           <div className='hidden'>
diff --git a/lib/deepResearcher/actions/finalReportGeneration.ts b/lib/deepResearcher/actions/finalReportGeneration.ts
index 32a8714..f872c32 100644
--- a/lib/deepResearcher/actions/finalReportGeneration.ts
+++ b/lib/deepResearcher/actions/finalReportGeneration.ts
@@ -176,4 +176,4 @@ export async function finalReportGeneration(
             notes: []
         }
     });
-}
\ No newline at end of file
+}
diff --git a/lib/deepResearcher/configuration.ts b/lib/deepResearcher/configuration.ts
index 8e0873c..67ca56f 100644
--- a/lib/deepResearcher/configuration.ts
+++ b/lib/deepResearcher/configuration.ts
@@ -553,4 +553,4 @@ export class ModelSelector {
   }
 }
 
-export const configurableModel = new ModelSelector();
\ No newline at end of file
+export const configurableModel = new ModelSelector();
diff --git a/lib/deepResearcher/llmUtils.ts b/lib/deepResearcher/llmUtils.ts
index f53247e..8467db8 100644
--- a/lib/deepResearcher/llmUtils.ts
+++ b/lib/deepResearcher/llmUtils.ts
@@ -992,4 +992,4 @@ export function getTodayStr(): string {
     "Dec",
   ];
   return `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
-}
\ No newline at end of file
+}
diff --git a/next.config.js b/next.config.js
index 241c96f..0def435 100644
--- a/next.config.js
+++ b/next.config.js
@@ -1,5 +1,6 @@
 /** @type {import('next').NextConfig} */
 const nextConfig = {
+  productionBrowserSourceMaps: true,
   experimental: {
     clientSegmentCache: true,
   },
```
