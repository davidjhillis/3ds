# Content Hub - Functional Specification
## Grounded in Real Workflows & Use Cases

**Version:** 2.0  
**Focus:** Deep functionality, not high-level prototypes  
**Principle:** Every feature must solve a real user problem with minimal friction

---

## 1. MANAGE TAB - Content Ingestion & Processing

### 1.1 Queue Sub-tab (Primary View)

#### Real Use Case: Sarah uploads Portal v10.5 docs
**Context:** Sarah has a 247 MB ZIP file with 47 DITA topics for the upcoming product release. She needs to know if the upload succeeds and if there are any validation errors.

**Workflow:**
1. **Upload via modal** (drag & drop portal-v10-docs.zip)
2. **Select source:** "DITA" from dropdown
3. **Click Upload** → Progress notification appears (bottom-right toast)
4. **At 100%** → "Upload complete! Processing..." → Auto-navigate to Queue tab
5. **Queue shows job card:**
   ```
   ┌─────────────────────────────────────────────────┐
   │ portal-v10-docs.zip                             │
   │ ⏱️ Started: 2:34 PM • Running 00:03:24          │
   │ 📊 Progress: 23/47 topics processed             │
   │ 👤 Sarah Chen • 🔌 DITA                         │
   │ ─────────────────────────────────────────────── │
   │ [View Details] [Stop Job]                       │
   └─────────────────────────────────────────────────┘
   ```

6. **Click "View Details"** → Opens job report modal:
   ```
   ┌───────────────────────────────────────────────────────┐
   │ Job Report: portal-v10-docs.zip                       │
   │ Upload ID: 8a7f2b3c (📋 copy)                        │
   │ Status: ●Running  Duration: 00:03:24  Progress: 49%  │
   │ Source: DITA  User: Sarah Chen  Started: 2:34 PM     │
   ├───────────────────────────────────────────────────────┤
   │ Publications (47 total)                               │
   │ Filter: [All ▼] [✓ Done 23] [⚠️ Warning 2] [❌ Failed 1] [⏳ Waiting 21] │
   │                                                       │
   │ ✓ Getting Started Guide                              │
   │   Status: Done • 2:35 PM • 12s                       │
   │   OriginID: getting-started.dita                     │
   │   [▼ Show Logs]                                      │
   │                                                       │
   │ ⚠️ API Authentication                                 │
   │   Status: Warning • 2:36 PM • 23s                    │
   │   OriginID: api-auth.dita                            │
   │   [▼ Show Logs] ← Expanded:                          │
   │   └─ 2:36:12 PM [WARN] Missing alt text for image 3  │
   │   └─ 2:36:15 PM [INFO] Generated from DITA-OT        │
   │   └─ 2:36:18 PM [INFO] Indexed successfully          │
   │                                                       │
   │ ❌ Installation Guide                                 │
   │   Status: Failed • 2:37 PM • 5s                      │
   │   OriginID: install.dita                             │
   │   [▼ Show Logs] ← Expanded:                          │
   │   └─ 2:37:02 PM [ERROR] Invalid DITA structure       │
   │   └─ 2:37:03 PM [ERROR] Missing required conref      │
   │   └─ 2:37:05 PM [FATAL] Processing stopped           │
   │                                                       │
   │ ⏳ Advanced Configuration (Waiting...)                │
   │                                                       │
   ├───────────────────────────────────────────────────────┤
   │ [Download Archive] [Download Logs] [Stop Job] [✕]    │
   └───────────────────────────────────────────────────────┘
   ```

7. **After 30 minutes of no progress** → "Mark as Stalled" button appears
8. **When complete** → Job moves to History
9. **Sarah can:**
   - Download original archive (for 7 days)
   - Download logs as ZIP (index.md + per-publication logs)
   - Retry job (for 7 days, countdown shown)
   - Review failed publications and fix source files

**UI Components Needed:**
- Real-time job cards with live progress
- Elapsed time counter (updates every second)
- Job detail modal with expandable log sections
- Status filter pills
- Copy-to-clipboard for Upload ID
- Conditional action buttons (Stop/Retry/Mark Stalled/Download)
- 7-day countdown timer for retry
- Auto-refresh every 5 seconds for Queue

---

### 1.2 History Sub-tab

#### Real Use Case: Marcus needs to find a failed job from 2 weeks ago
**Context:** A customer reports missing documentation. Marcus needs to find which job published (or failed to publish) that content.

**Workflow:**
1. **Navigate to Manage > History**
2. **See comprehensive search tools:**
   ```
   ┌─────────────────────────────────────────────────────────┐
   │ 🔍 Search jobs... (name, source, user, type)            │
   │ 📅 [Last 30 Days ▼] [Status: All ▼] [🔄 Refresh]       │
   └─────────────────────────────────────────────────────────┘
   ```

3. **Search:** Types "customer-docs"
4. **Filter by date:** "Last 14 days"
5. **Filter by status:** "Failed"
6. **Results update in real-time** (debounced 300ms)
7. **Table shows:**
   ```
   Status  Archive Name           Date/Time          Duration   Files  Source  User         Type
   ❌      customer-docs-v2.zip   Oct 22, 2:15 PM   00:12:34   23/47  DITA    Sarah Chen   Publication
   ```

8. **Click row** → Opens job report (same as Queue)
9. **Actions available:**
   - View detailed logs
   - Download archive (if < 7 days old)
   - Retry job (if < 7 days old, shows "Retry available for 3d 4h")
   - If > 7 days: "Retry expired" tooltip

**UI Components:**
- Search input with debounce
- Date picker with presets
- Status multi-select dropdown
- Sortable table with pagination
- Result count: "Showing 12 of 1,247 jobs"
- Retry countdown badge
- Empty state for no results

---

### 1.3 Library Sub-tab (Enhanced)

#### Real Use Case: Sarah needs to find all v10.5 docs that aren't deployed yet
**Context:** Release is in 2 days. Sarah needs to verify all v10.5 docs are ready and deployed to staging.

**Functional Enhancements:**
```
┌─────────────────────────────────────────────────────────────┐
│ Library Header                                              │
│ 📊 2,847 documents • 1,892 Production • 543 Staging •       │
│     412 Not Deployed                                        │
│                                                             │
│ [Bulk Actions ▼]  Selected: 23 documents                   │
│   → Deploy to Staging                                       │
│   → Add to Release                                          │
│   → Update Metadata                                         │
│   → Delete                                                  │
│   → Export List                                             │
└─────────────────────────────────────────────────────────────┘
```

**Contextual Actions (per document row):**
- **Hover actions:**
  - 👁️ Preview
  - 📝 View Metadata Journal (shows all past metadata changes)
  - 📊 View Job History (all jobs that touched this doc)
  - 🎯 Add to Release
  - 🗑️ Delete (confirmation required)

**Advanced Filters:**
- Version: v10.5, v10.4, v10.3, etc.
- Product: Portal, API, Mobile SDK
- Deployment Status: Production, Staging, Not Deployed
- Source: DITA, Markdown, OpenAPI
- Last Updated: Today, This Week, This Month, Custom Range
- Has Warnings: Yes/No
- **Smart Filters:**
  - "Ready for v10.5 Release" (version=v10.5, status=staging, no warnings)
  - "Outdated" (last updated > 6 months)
  - "Needs Review" (has warnings, not deployed)

---

## 2. TRANSFORM TAB - Content Processing & Enrichment

### 2.1 Metadata Schema Sub-tab (Functional)

#### Real Use Case: Marcus needs to add "API Version" field for OpenAPI docs
**Context:** API team wants to show API version separately from Portal version. Need to add custom metadata field and reprocess existing API docs.

**Workflow:**
1. **Click "Create Field"** → Opens modal:
   ```
   ┌──────────────────────────────────────────────────┐
   │ Create Metadata Field                            │
   ├──────────────────────────────────────────────────┤
   │ Field Name: api_version                          │
   │   (used in APIs and exports)                     │
   │                                                  │
   │ Display Label: API Version                       │
   │ Help Text: Version of the API (e.g., v2.3, v3.0) │
   │                                                  │
   │ Data Type: [Text ▼]                              │
   │   Options: Text, Number, Date, Enum, Multi-Select│
   │                                                  │
   │ Required: [ ] Required field                     │
   │ Default Value: (leave blank for none)            │
   │                                                  │
   │ Applies To: ☑️ API Reference                      │
   │             ☐ Documentation                      │
   │             ☐ Tutorials                          │
   │                                                  │
   │ ⚠️ Reprocessing Required                          │
   │ Adding this field will reprocess 543 documents.  │
   │ Estimated time: 8 minutes                        │
   │                                                  │
   │ [Cancel] [Create Field & Reprocess]              │
   └──────────────────────────────────────────────────┘
   ```

2. **Click "Create Field & Reprocess"**
3. **Confirmation:** "This will create a reprocessing job. Continue?"
4. **Auto-navigate to Queue** → Shows reprocessing job
5. **Job card shows:**
   ```
   🔄 Metadata Reprocessing: api_version field
   ⏱️ Started: 3:45 PM • Running 00:02:15
   📊 Progress: 234/543 documents
   📝 Triggered by: Metadata change
   ```

**After Completion:**
- New field appears in Metadata Schema table
- All API docs now have `api_version` field available
- Can bulk-update values in Library

---

### 2.2 AI Enrichment Sub-tab (Functional)

#### Real Use Case: Auto-generate summaries for 2,847 docs
**Context:** Portal needs document summaries for search results and cards. Don't want to write them manually.

**Workflow:**
1. **AI Summaries card:**
   ```
   ┌──────────────────────────────────────────────┐
   │ ✨ AI Summaries                              │
   │ Auto-generate 2-3 sentence summaries         │
   │                                              │
   │ Status: ● Active                      [ON/OFF]│
   │ Documents processed: 2,847                   │
   │ Avg. processing time: 1.2s per doc           │
   │ Last run: 2h ago                             │
   │                                              │
   │ Model: GPT-4 Turbo                           │
   │ Max tokens: 150                              │
   │ Temperature: 0.3 (factual)                   │
   │                                              │
   │ [Configure] [Reprocess All] [View Samples]   │
   └──────────────────────────────────────────────┘
   ```

2. **Click "Configure"** → Advanced settings:
   - Model selection (GPT-4, Claude, Llama)
   - Custom prompt template
   - Token limits
   - Temperature (creativity vs accuracy)
   - Cost estimate per document
   - Apply to: [All content types] or specific types

3. **Click "Reprocess All"** → Creates reprocessing job
4. **Auto-navigate to Queue** → Monitor progress
5. **Click "View Samples"** → Shows 10 random summaries for quality review

**Automation Hook:**
- ✅ Auto-generate summaries on every new upload
- ✅ Regenerate if doc changes significantly (>30%)
- ✅ Alert if AI confidence < 70%

---

### 2.3 Quality Rules Sub-tab (Functional)

#### Real Use Case: Alert team when broken links are detected
**Context:** Documentation has 23 broken links. Need to notify content team and track fixes.

**Workflow:**
1. **Broken Links card shows issues:**
   ```
   ┌──────────────────────────────────────────────┐
   │ 🔗 Broken Links                       [ON/OFF]│
   │ Detect invalid URLs and references           │
   │                                              │
   │ Issues found: 23 ⚠️                          │
   │ Last check: 2h ago                           │
   │                                              │
   │ Notify: ✉️ content-team@example.com          │
   │ Alert frequency: Immediate + Daily digest    │
   │                                              │
   │ [View Issues] [Configure] [Run Check Now]    │
   └──────────────────────────────────────────────┘
   ```

2. **Click "View Issues"** → Detailed list:
   ```
   ┌──────────────────────────────────────────────────────────┐
   │ Broken Links Report (23 issues)                         │
   │ [Export CSV] [Create Jira Tickets] [Email Team]         │
   ├──────────────────────────────────────────────────────────┤
   │ 📄 Getting Started Guide                                │
   │    Line 47: https://old-docs.com/setup → 404           │
   │    Suggested fix: https://docs.example.com/v10/setup   │
   │    [Copy Fix] [Edit Document] [Ignore This]            │
   │                                                         │
   │ 📄 API Reference                                        │
   │    Line 123: ../images/auth-flow.png → Not found       │
   │    [Upload Missing Image] [Change Reference] [Ignore]   │
   └──────────────────────────────────────────────────────────┘
   ```

3. **Automation options:**
   - ✅ Auto-check on every upload
   - ✅ Daily scheduled scan
   - ✅ Email digest to content-team@example.com
   - ✅ Slack webhook notification
   - ✅ Block deployment if critical issues (configurable)
   - ✅ Auto-create Jira/GitHub issues

4. **Click "Create Jira Tickets"** → Bulk creates tickets:
   - One ticket per broken link
   - Includes document name, line number, URL
   - Assigns to content owner (from metadata)
   - Links back to Content Hub

---

## 3. TARGET TAB - Portal Structure & Rules

### 3.1 Portal Map Sub-tab (Deeply Functional)

#### Real Use Case: Route all v10.5 content to new navigation section
**Context:** Portal v10.5 launch is in 2 days. Need to add a new "What's New in v10.5" section to navigation and automatically route all v10.5 tagged content there.

**Enhanced Wizard (3 steps → 5 steps):**

**Step 1: What content?**
```
┌───────────────────────────────────────────────┐
│ Step 1 of 5: Select Content                  │
│                                               │
│ How do you want to select content?           │
│ ○ By metadata rules (smart, auto-updates)    │
│ ○ By manual selection (fixed list)           │
│ ○ By collection (use existing collection)    │
│ ○ By release (from a specific release)       │
│                                               │
│ [← Back] [Next →]                             │
└───────────────────────────────────────────────┘
```

**Step 2: Define rules (if "By metadata rules" selected):**
```
┌────────────────────────────────────────────────────┐
│ Step 2 of 5: Define Rules                         │
│                                                    │
│ IF document matches ALL of these:                 │
│ ┌────────────────────────────────────────────────┐│
││ Version       [equals ▼]  [v10.5            ▼] ││
││ Product       [equals ▼]  [Portal           ▼] ││
││ Content Type  [is one of] [☑️ Guide ☑️ Tutorial] ││
│ └────────────────────────────────────────────────┘│
│                                                    │
│ [+ Add Rule] [- Remove]                           │
│                                                    │
│ 📊 This will match 47 documents                   │
│ [Preview Matches]                                 │
│                                                    │
│ [← Back] [Next →]                                 │
└────────────────────────────────────────────────────┘
```

**Step 3: Where should it appear?**
```
┌────────────────────────────────────────────────┐
│ Step 3 of 5: Navigation Placement             │
│                                                │
│ Where should this content appear?             │
│ ○ Main navigation (create new section)        │
│ ○ Sub-menu under: [Product Docs ▼]            │
│ ○ Home page - Featured section                │
│ ○ Search only (no navigation)                 │
│                                                │
│ Section Name: What's New in v10.5              │
│ Icon: [🎉 ▼] Position: [After "Get Started"]  │
│                                                │
│ [← Back] [Next →]                              │
└────────────────────────────────────────────────┘
```

**Step 4: Set URL structure:**
```
┌────────────────────────────────────────────────────┐
│ Step 4 of 5: URL Pattern                          │
│                                                    │
│ URL Template:                                      │
│ /portal/{{version}}/{{slug}}                       │
│                                                    │
│ Examples:                                          │
│ • /portal/v10.5/getting-started                   │
│ • /portal/v10.5/api-authentication                │
│ • /portal/v10.5/advanced-configuration            │
│                                                    │
│ Variables available:                               │
│ {{product}}, {{version}}, {{type}}, {{slug}},     │
│ {{category}}, {{locale}}                          │
│                                                    │
│ [Use Custom Pattern] [Restore Default]            │
│                                                    │
│ [← Back] [Next →]                                 │
└────────────────────────────────────────────────────┘
```

**Step 5: Preview & Confirm:**
```
┌────────────────────────────────────────────────────────┐
│ Step 5 of 5: Review & Activate                        │
│                                                        │
│ Summary:                                               │
│ • Content: 47 documents (Version=v10.5, Product=Portal)│
│ • Location: Main Nav → "What's New in v10.5" 🎉       │
│ • URL Pattern: /portal/v10.5/{{slug}}                 │
│ • Auto-update: ✓ New matching docs added automatically│
│                                                        │
│ This will:                                             │
│ ✓ Create navigation entry "What's New in v10.5"       │
│ ✓ Route 47 documents to this section                  │
│ ✓ Generate URLs using pattern                         │
│ ✓ Reprocess navigation (est. 30 seconds)              │
│                                                        │
│ ⚠️ Changes take effect immediately on next deploy      │
│                                                        │
│ [← Back] [Save as Draft] [Activate Rule]              │
└────────────────────────────────────────────────────────┘
```

6. **Click "Activate Rule"** → Creates reprocessing job
7. **Auto-navigate to Queue** → Monitor navigation rebuild
8. **When complete** → New section appears in Portal Map tree view

**Automation:**
- ✅ Auto-add new docs matching rules (no manual intervention)
- ✅ Alert when > 100 docs would be affected by a rule change
- ✅ Suggest rules based on common patterns (AI-powered)

---

## 4. DELIVER TAB - Release Management & Deployment

### 4.1 Releases Sub-tab (Deeply Functional)

#### Real Use Case: Coordinate Portal v10.5 launch with 47 docs, 12 videos, 3 API updates
**Context:** Product launch is Jan 15 @ 9:00 AM. Multiple teams contributing content. Need to bundle everything, track approvals, and deploy atomically.

**Enhanced Release Card:**
```
┌─────────────────────────────────────────────────────────────┐
│ 📦 Portal v10.5 Launch                          [Product Release]│
│ Scheduled: Jan 15, 2025 9:00 AM EST            [⏰ Scheduled]   │
│ Created by Sarah Chen • 12 contributors                       │
├─────────────────────────────────────────────────────────────┤
│ Content Summary:                                            │
│ • 47 Documentation topics (DITA)          [✓ All validated]  │
│ • 12 Tutorial videos (MP4)                [✓ All uploaded]   │
│ • 3 API specifications (OpenAPI)          [⚠️ 1 has warnings]│
│ • 8 Images & diagrams                     [✓ All validated]  │
│                                                             │
│ Deployment Targets:                                         │
│ ✓ Production Portal (docs.example.com)                      │
│ ✓ Production VectorDB (Pinecone)                            │
│ ✓ Customer Portal (customers.example.com)                   │
│                                                             │
│ Approvals:                                                  │
│ ✓ Content Team  - Marcus Lee (Dec 20)                       │
│ ✓ Product Team  - Lisa Wong (Jan 2)                         │
│ ⏳ Legal Review  - Pending                                   │
│                                                             │
│ Checklist:                                                  │
│ ✓ All content uploaded                                      │
│ ✓ Metadata validated                                        │
│ ✓ Quality checks passed                                     │
│ ⏳ Legal approval                                            │
│ ⏳ Final review by Product Manager                           │
│                                                             │
│ [View All Content] [Activity Log] [Edit Release]            │
│ [Request Approval] [Schedule Deploy]                        │
└─────────────────────────────────────────────────────────────┘
```

**Click "View All Content"** → Release detail view:
```
┌──────────────────────────────────────────────────────────────┐
│ Release: Portal v10.5 Launch                                 │
│ [← Back to Releases]                              [•••More]  │
├──────────────────────────────────────────────────────────────┤
│ Tabs: [Content] [Contributors] [Activity] [Settings]         │
├──────────────────────────────────────────────────────────────┤
│ Content (70 items)                                           │
│ [+ Add Content] [Remove Selected] [Bulk Update Metadata]     │
│                                                              │
│ Group by: [Type ▼]                                           │
│                                                              │
│ 📚 Documentation (47)                                        │
│   ✓ Getting Started Guide         Sarah Chen    Jan 5       │
│   ✓ Advanced Configuration        Marcus Lee    Jan 8       │
│   ⚠️ Installation Guide            Sarah Chen    Jan 10      │
│      └─ Warning: Missing alt text for 2 images              │
│                                                              │
│ 🎥 Videos (12)                                               │
│   ✓ Intro to Portal v10.5          Video Team   Dec 28      │
│   ✓ Setup Walkthrough              Video Team   Jan 3       │
│                                                              │
│ 🔌 API Specs (3)                                             │
│   ✓ REST API v2.3                  API Team     Jan 7       │
│   ⚠️ GraphQL API v1.2               API Team     Jan 9       │
│      └─ Warning: Deprecation notice missing                  │
└──────────────────────────────────────────────────────────────┘
```

**Click "Activity" tab:**
```
┌──────────────────────────────────────────────────────────────┐
│ Activity Log & Collaboration                                 │
├──────────────────────────────────────────────────────────────┤
│ 💬 Jan 10, 3:45 PM - Marcus Lee                             │
│    @sarah The Installation Guide has 2 broken image links.  │
│    Can you fix before Friday?                               │
│    [Reply] [Resolve] [Assign to Sarah]                      │
│                                                              │
│ 📝 Jan 10, 2:15 PM - Sarah Chen                             │
│    Added 3 new tutorial topics to the release               │
│    [View Changes]                                            │
│                                                              │
│ ✅ Jan 9, 10:30 AM - Lisa Wong (Product Team)                │
│    Approved release for deployment                          │
│                                                              │
│ ⚠️ Jan 8, 4:20 PM - System Alert                             │
│    Quality check found 3 warnings in API specifications     │
│    [View Report]                                             │
│                                                              │
│ 📌 Jan 5, 9:00 AM - Sarah Chen                              │
│    Created release "Portal v10.5 Launch"                    │
│                                                              │
│ ─────────────────────────────────────────────────────────── │
│ 💬 Add comment or mention someone with @                    │
│ [Attach File] [@ Mention] [Add Checklist Item]              │
└──────────────────────────────────────────────────────────────┘
```

**Collaboration Features:**
- ✅ @mention team members → sends notification
- ✅ Add comments to release (threaded discussions)
- ✅ Attach files (updated specs, screenshots, notes)
- ✅ Create checklist items (manual approval gates)
- ✅ Tag issues as blocking/non-blocking
- ✅ Email notifications for activity
- ✅ Slack integration for @mentions

**Click "Settings" tab:**
```
┌──────────────────────────────────────────────────────────────┐
│ Release Settings                                             │
├──────────────────────────────────────────────────────────────┤
│ Deployment Schedule:                                         │
│ ○ Deploy immediately when ready                              │
│ ● Deploy on specific date/time:                              │
│   📅 Jan 15, 2025  ⏰ 9:00 AM  🌍 EST                        │
│   [Set Timezone]                                             │
│                                                              │
│ Approval Workflow:                                           │
│ ☑️ Require content team approval (Marcus Lee)                │
│ ☑️ Require product team approval (Lisa Wong)                 │
│ ☑️ Require legal review (if privacy-related)                 │
│ ☐ Require executive sign-off (for major releases)            │
│                                                              │
│ Deployment Targets:                                          │
│ ☑️ Production Portal                                          │
│ ☑️ Production VectorDB                                        │
│ ☑️ Customer Portal                                            │
│ ☐ Partner Portal                                             │
│                                                              │
│ Notifications:                                               │
│ ☑️ Email team when release is deployed                       │
│ ☑️ Slack notification to #product-releases                   │
│ ☑️ Post to status page (status.example.com)                  │
│                                                              │
│ Rollback Plan:                                               │
│ ☑️ Create snapshot before deploy (enables 1-click rollback)  │
│ ☑️ Monitor error rate for 1 hour post-deploy                 │
│ ☑️ Auto-rollback if error rate > 5%                          │
│                                                              │
│ [Save Settings]                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. AUTOMATION & AI INTELLIGENCE

### 5.1 Smart Workflows (Reduce manual work)

#### Workflow 1: Auto-deploy staging → prod
```
Automation Rule: "Friday Auto-Deploy"
Trigger: Every Friday at 5:00 PM
Conditions:
  - All staging content has been in staging > 48 hours
  - No quality issues detected
  - No pending approvals
Action:
  - Create release "Weekly Update #{{week_number}}"
  - Add all staging content
  - Deploy to Production
  - Send Slack notification
  - Post to status page
```

#### Workflow 2: AI-powered content routing
```
AI Rule: "Smart Portal Map"
Trigger: New document uploaded
AI Analysis:
  - Analyze document title, summary, content
  - Extract: product, version, audience, topic
  - Suggest navigation placement (with confidence %)
Action if confidence > 85%:
  - Auto-apply metadata
  - Auto-route to appropriate section
  - Notify content owner (FYI, can override)
Action if confidence < 85%:
  - Create suggestion for manual review
  - Email content team with recommendation
```

#### Workflow 3: Quality gate automation
```
Automation: "Block Bad Deploys"
Trigger: Attempting to deploy to Production
Conditions checked:
  - Broken links count = 0
  - Missing required metadata count = 0
  - All images < 500 KB (performance)
  - No documents with "DRAFT" in title
  - Legal-flagged content has approval
Action if ANY condition fails:
  - Block deployment
  - Show detailed error report
  - Email responsible parties
  - Suggest fixes with 1-click apply
```

### 5.2 Alert & Notification System

**User Preferences:**
```
┌──────────────────────────────────────────────────┐
│ Notification Preferences                         │
├──────────────────────────────────────────────────┤
│ Job Completion:                                  │
│ ☑️ Email when my uploads complete                │
│ ☑️ Email only if warnings or errors              │
│ ☐ Slack DM for all jobs                          │
│                                                  │
│ Quality Issues:                                  │
│ ☑️ Daily digest of all issues                    │
│ ☑️ Immediate alert for critical issues           │
│ ☑️ Weekly summary report                         │
│                                                  │
│ Mentions & Collaboration:                        │
│ ☑️ Email when @mentioned in releases             │
│ ☑️ Email when assigned to review                 │
│ ☑️ Slack for urgent mentions                     │
│                                                  │
│ Scheduled Reports:                               │
│ ☑️ Monday: Content health report                 │
│ ☑️ Friday: Weekly deployment summary             │
│ ☐ Monthly: Usage analytics                       │
│                                                  │
│ [Save Preferences]                               │
└──────────────────────────────────────────────────┘
```

---

## 6. SOURCES TAB - Real Pipeline Configuration

### Real Use Case: Configure DITA-OT 4.0 with custom plugins

**Functional Source Configuration:**
```
┌──────────────────────────────────────────────────────────────┐
│ Source: DITA                                      [Active ✓]  │
│ [Edit] [Test] [Clean] [Delete]                               │
├──────────────────────────────────────────────────────────────┤
│ Processing Pipeline:                                         │
│                                                              │
│ DITA-OT Version: [4.0 ▼]  [Upload Custom OT Config]         │
│                                                              │
│ Installed Plugins:                                           │
│ ✓ PDF Plugin 2.5.1                          [Configure]      │
│ ✓ HTML5 Plugin 3.1.0                        [Configure]      │
│ ✓ Custom Branding Plugin 1.2                [Configure]      │
│   └─ Logo: discover-cx-logo.svg                              │
│   └─ CSS: custom-theme.css                                   │
│   └─ Last updated: Dec 15, 2024                              │
│                                                              │
│ [+ Add Plugin] [Upload Plugin ZIP]                           │
│                                                              │
│ Transformation Settings:                                     │
│ ☑️ Generate HTML5 output                                      │
│ ☑️ Generate PDF output                                        │
│ ☐ Generate EPUB output                                       │
│                                                              │
│ Validation Rules:                                            │
│ ☑️ Validate DITA structure                                    │
│ ☑️ Check conref resolution                                    │
│ ☑️ Validate xref links                                        │
│ ☑️ Check image references                                     │
│ ☐ Require alt text (strict)                                  │
│                                                              │
│ Performance:                                                 │
│ Documents processed: 1,247                                   │
│ Avg. processing time: 8.3s per document                      │
│ Success rate: 94.2% (58 failed in last 30 days)             │
│                                                              │
│ [Test Source] ← Uploads sample doc, shows full report        │
│ [View Failed Jobs] ← Shows all 58 failures                   │
│ [Download Config] ← Exports full pipeline config as JSON     │
│                                                              │
│ Last used: 2h ago                                            │
└──────────────────────────────────────────────────────────────┘
```

**Click "Test Source":**
```
┌────────────────────────────────────────────────┐
│ Test Source: DITA                              │
│                                                │
│ Upload a sample document to test this source: │
│ [📎 Browse...] or drag & drop                  │
│                                                │
│ Test will:                                     │
│ • Validate DITA structure                      │
│ • Run DITA-OT transformation                   │
│ • Check all validation rules                   │
│ • Generate test output                         │
│ • Show detailed log                            │
│                                                │
│ Results will NOT be published to portal        │
│                                                │
│ [Cancel] [Run Test]                            │
└────────────────────────────────────────────────┘
```

**Test Results:**
```
┌────────────────────────────────────────────────────────┐
│ Test Results: sample-dita-doc.zip             [✓ Pass] │
├────────────────────────────────────────────────────────┤
│ Processing completed in 12.3 seconds                   │
│                                                        │
│ Validation:                                            │
│ ✓ DITA structure valid                                 │
│ ✓ All conrefs resolved                                 │
│ ✓ All xrefs valid                                      │
│ ⚠️ 2 images missing alt text (non-blocking)             │
│                                                        │
│ Output Generated:                                      │
│ ✓ HTML5: 234 KB                    [Preview] [Download]│
│ ✓ PDF: 1.2 MB                      [Preview] [Download]│
│                                                        │
│ Detailed Log:                                          │
│ [▼ Show Full Log]                                      │
│ └─ 3:45:01 PM [INFO] Starting DITA-OT 4.0             │
│ └─ 3:45:02 PM [INFO] Resolving conrefs...             │
│ └─ 3:45:05 PM [WARN] Image missing alt text: fig1.png │
│ └─ 3:45:12 PM [INFO] HTML5 generation complete        │
│                                                        │
│ [Close] [Upload to Production]                         │
└────────────────────────────────────────────────────────┘
```

---

## 7. IMPORTS TAB - Scheduled Automation

### Real Use Case: Auto-import from GitHub every night

**Enhanced GitHub Connector:**
```
┌──────────────────────────────────────────────────────────────┐
│ 🔌 GitHub Import                                  [🟢 Active]│
│ Auto-import documentation from GitHub repository            │
├──────────────────────────────────────────────────────────────┤
│ Repository: github.com/yourorg/docs                         │
│ Branch: main                                                │
│ Path: /docs                                                 │
│ Auth: GitHub App (expires: Jan 2026)         [Reconnect]    │
│                                                             │
│ Schedule:                                                   │
│ ○ Manual only                                               │
│ ● Scheduled: Daily at 2:00 AM EST                           │
│ ○ On commit (webhook)                                       │
│ ○ On tag/release                                            │
│                                                             │
│ File Filters:                                               │
│ Include: *.md, *.mdx, images/**                             │
│ Exclude: DRAFT-*, temp/**, .github/**                       │
│                                                             │
│ Processing:                                                 │
│ Source: [Markdown ▼]                                        │
│ ☑️ Auto-extract frontmatter as metadata                      │
│ ☑️ Convert relative links to absolute                        │
│ ☑️ Download and host images                                  │
│                                                             │
│ Automation:                                                 │
│ On successful import:                                       │
│   ☑️ Deploy to Staging automatically                         │
│   ☑️ Send Slack notification to #docs-team                   │
│   ☐ Create release draft (if version tag changes)           │
│                                                             │
│ On import failure:                                          │
│   ☑️ Email admin@example.com                                 │
│   ☑️ Post to #docs-alerts Slack channel                      │
│   ☑️ Retry 3 times with 5-min delay                          │
│   ☐ Create GitHub issue                                     │
│                                                             │
│ Status:                                                     │
│ Last import: Jan 10, 2:00 AM (✓ Success)                    │
│ Next import: Jan 11, 2:00 AM (in 18h 23m)                  │
│ Total imports: 127 (125 success, 2 failed)                  │
│ Documents imported: 892                                      │
│                                                             │
│ [Run Now] [View Import History] [Edit] [Pause Schedule]     │
└──────────────────────────────────────────────────────────────┘
```

**Click "View Import History":**
```
┌────────────────────────────────────────────────────────┐
│ GitHub Import History                                  │
│ [← Back]                                               │
├────────────────────────────────────────────────────────┤
│ Date/Time          Status  Files  Changes  Duration   │
│ Jan 10, 2:00 AM    ✓       12     +3 -1    00:02:15   │
│ Jan 9, 2:00 AM     ✓       8      +2       00:01:45   │
│ Jan 8, 2:00 AM     ❌      0      -        Failed      │
│   └─ Error: GitHub API rate limit exceeded             │
│   └─ [View Full Log] [Retry Now]                       │
│ Jan 7, 2:00 AM     ✓       15     +5 -2    00:03:10   │
└────────────────────────────────────────────────────────┘
```

---

## 8. AI-POWERED FEATURES (Make Work Easier)

### 8.1 AI Content Router
**Problem:** Manual routing is tedious for 100s of docs  
**Solution:** AI suggests where content should go

```
After upload, AI analyzes each document:

┌────────────────────────────────────────────────────────┐
│ AI Routing Suggestions (23 documents pending)         │
│ [Review All] [Auto-Apply High Confidence] [Dismiss]   │
├────────────────────────────────────────────────────────┤
│ 📄 "Getting Started with GraphQL"                     │
│    Confidence: 94% ⭐⭐⭐⭐                             │
│    Suggested: API Reference > GraphQL > Tutorials     │
│    Metadata: product=API, version=v2.3, type=Tutorial │
│    URL: /api/v2.3/graphql/getting-started            │
│    [✓ Apply] [✏️ Edit] [✕ Reject]                      │
│                                                        │
│ 📄 "Security Best Practices"                          │
│    Confidence: 67% ⭐⭐⭐                              │
│    Suggested: Portal v10 > Security > Guides          │
│    Alternative: Operations > Security                 │
│    [✓ Apply] [Choose Alternative] [Manual Route]      │
└────────────────────────────────────────────────────────┘
```

### 8.2 AI Release Planner
**Problem:** Creating release bundles is complex  
**Solution:** AI suggests what should be released together

```
Click "Create Release" → AI Assistant appears:

┌────────────────────────────────────────────────────────┐
│ 🤖 AI Release Assistant                                │
│                                                        │
│ I noticed you have 47 documents tagged with v10.5     │
│ that are currently in staging. Would you like to      │
│ create a coordinated release?                         │
│                                                        │
│ Suggested Release:                                     │
│ Name: "Portal v10.5 Launch"                           │
│ Content: 47 docs + 12 videos + 3 API specs            │
│ Deploy to: Production + VectorDB                      │
│ Recommended date: Jan 15 (product launch date)       │
│                                                        │
│ Why this suggestion?                                   │
│ • All content shares version=v10.5 metadata           │
│ • Product launch is scheduled for Jan 15              │
│ • Content has been in staging 14+ days (stable)       │
│ • No quality issues detected                          │
│                                                        │
│ [Create This Release] [Customize] [Start from Scratch]│
└────────────────────────────────────────────────────────┘
```

### 8.3 AI Quality Assistant
**Problem:** Reviewing 100s of quality issues is time-consuming  
**Solution:** AI auto-fixes common issues

```
In Quality Rules, click "23 Broken Links":

┌────────────────────────────────────────────────────────┐
│ Broken Links (23 found)                      [🤖 AI Fix]│
├────────────────────────────────────────────────────────┤
│ AI can auto-fix 18 of these issues:                   │
│                                                        │
│ 12 links: Old domain → New domain                      │
│    old-docs.com → docs.example.com                     │
│    [Preview Changes] [Auto-Fix All 12]                 │
│                                                        │
│ 6 links: Moved pages (AI found new locations)         │
│    /setup → /v10/getting-started/setup                 │
│    [Preview Changes] [Auto-Fix All 6]                  │
│                                                        │
│ 5 links: Need manual review                           │
│    - External link returns 404 (no replacement found) │
│    - Internal page deleted (suggest alternatives?)    │
│    [Review Manually]                                   │
│                                                        │
│ [Auto-Fix 18 Issues] [Preview All] [Cancel]           │
└────────────────────────────────────────────────────────┘
```

---

## 9. EMAIL-DRIVEN WORKFLOWS (Work Outside the App)

### 9.1 Email Approvals
**Problem:** Stakeholders don't want to log in just to approve  
**Solution:** Approve via email

```
Email sent to Lisa Wong (Product Manager):

Subject: [Action Required] Approve Portal v10.5 Release

Hi Lisa,

Sarah Chen has requested your approval for the "Portal v10.5 Launch" release.

Release Details:
- Deploy Date: Jan 15, 2025 9:00 AM EST
- Content: 47 docs, 12 videos, 3 API specs
- Targets: Production Portal + VectorDB

Quick Actions:
┌─────────────────────────────────────────┐
│ [✅ Approve Release]  [❌ Reject]  [💬 Add Comment] │
└─────────────────────────────────────────┘

Or view full details: https://admin.example.com/releases/abc123

Approval expires in: 3 days

---
Reply to this email to add comments to the release.
```

### 9.2 Email Job Reports
**Problem:** Users want to know job status without logging in  
**Solution:** Email when jobs complete

```
Email sent to Sarah Chen:

Subject: ✅ Upload Complete: portal-v10-docs.zip

Hi Sarah,

Your upload has finished processing.

Job Summary:
- Archive: portal-v10-docs.zip (247 MB)
- Status: ✅ Success with 2 warnings
- Duration: 00:12:34
- Documents: 47 total (45 success, 2 warnings, 0 failed)

Warnings:
⚠️ api-auth.dita - Missing alt text for image
⚠️ install.dita - Deprecated conref detected

Next Steps:
• View full report: https://admin.example.com/jobs/xyz789
• Documents are now in Library (Staging)
• Ready to add to "Portal v10.5 Launch" release

[View Report] [Add to Release] [Deploy to Staging]
```

---

## 10. IMPLEMENTATION PRIORITIES

### Phase 1: Core Functionality (2 weeks)
1. ✅ Queue with real-time job cards
2. ✅ Job detail modal with expandable logs
3. ✅ History with search/filter/date picker
4. ✅ Stop/Retry/Download actions with 7-day limit
5. ✅ Mark as Stalled (30-min threshold)

### Phase 2: Automation & Intelligence (2 weeks)
6. ✅ AI content routing with confidence scoring
7. ✅ Email notifications and approvals
8. ✅ Scheduled imports with retry logic
9. ✅ Quality auto-fix suggestions
10. ✅ Smart release bundling

### Phase 3: Collaboration & Advanced (2 weeks)
11. ✅ Release activity log with @mentions
12. ✅ Approval workflows
13. ✅ Source testing and config management
14. ✅ Scheduled reports and digests
15. ✅ Slack/webhook integrations

---

## KEY DIFFERENCES FROM PROTOTYPE

### Before (High-Level Prototype):
- Toggle switches with no real actions
- Static numbers (no context)
- No workflows or state management
- No error handling or edge cases
- No automation or AI assistance

### After (Deeply Functional):
- Every action has a clear outcome
- Real job lifecycle management
- Contextual buttons based on state
- Comprehensive error handling
- AI-powered suggestions and automation
- Email-driven workflows (work outside app)
- Collaboration features (comments, @mentions, approvals)
- Time-aware features (retry limits, countdowns)
- Test modes for safe configuration changes

This is the difference between a **design mockup** and a **production-ready enterprise CDP**. 🚀

