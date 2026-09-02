# Content Hub - User Story-Driven Implementation Plan

**Version:** 1.0  
**Date:** January 2025  
**Based on:** Content Hub TDD and existing UX review  
**Status:** Implementation Planning

---

## Executive Summary

This document defines the implementation plan for the Content Hub based on user stories, aligned with the technical requirements in `CONTENT_HUB_TDD.md`. The current implementation has general UX structure (tabs, filters, document list) but lacks integration with the core publishing and job management workflows defined in the TDD.

### Current State Assessment

**What Exists:**
- ✅ Tab navigation structure (Library, Collections, Sources, Add Content, Releases, Metadata, Search Config)
- ✅ Filter sidebar with Product, Content Type, Status, Language filters
- ✅ Document list view with metadata display
- ✅ Bulk selection and actions UI
- ✅ Smart collections UI concept
- ✅ Basic styling and components

**What's Missing (Critical Gaps):**
- ❌ Publishing workflow (upload, source selection, progress tracking)
- ❌ Job Queue interface (active jobs, real-time status)
- ❌ Job History interface (search, filter, browse past jobs)
- ❌ Job Report detail view (logs, errors, actions)
- ❌ Source management interface (view, configure, create sources)
- ❌ Metadata configuration interface
- ❌ Access rules interface
- ❌ Real job data integration (currently static demo data)

---

## User Personas

### 1. Content Publisher (Sarah)
- **Role:** CONTENT_PUBLISHER
- **Goals:** Publish content quickly, track upload status, fix errors
- **Pain Points:** Confusing upload errors, unclear job status, hard to find failed jobs
- **Technical Skill:** Medium (understands file formats, metadata basics)

### 2. Knowledge Hub Admin (Marcus)
- **Role:** KHUB_ADMIN
- **Goals:** Configure sources, manage metadata schemas, maintain content quality
- **Pain Points:** Complex source configuration, hard to debug processing errors
- **Technical Skill:** High (understands XML, DITA, processing pipelines)

### 3. System Administrator (Elena)
- **Role:** ADMIN
- **Goals:** Full system control, user management, monitoring
- **Pain Points:** Needs visibility across all operations, troubleshooting
- **Technical Skill:** Very High (dev/ops background)

---

## User Story Map

### Epic 1: Content Publishing
**Value:** Enable users to upload and publish content to the portal

#### Story 1.1: Upload Content Archive
**As a** Content Publisher  
**I want to** upload a content archive (ZIP file)  
**So that** I can publish new or updated documentation to the portal

**Acceptance Criteria:**
- [ ] Click "Add Content" tab to access upload interface
- [ ] See prominent drag-and-drop upload zone
- [ ] Browse button for file picker as alternative
- [ ] Select source from dropdown (DITA, Markdown, Word, etc.)
- [ ] See source description and supported formats
- [ ] Upload shows real-time progress (0-100%)
- [ ] Can cancel upload before 100%
- [ ] Error message if file exceeds 1.85 GB
- [ ] Success notification when upload completes
- [ ] Automatically navigate to Queue to see processing

**UI Components:**
- Upload dropzone (centered, prominent)
- Source selector dropdown
- Progress indicator overlay
- Cancel button
- File size validation
- Success/error notifications

**Priority:** P0 (Critical - MVP)  
**Effort:** 5 points  
**Dependencies:** None

---

#### Story 1.2: View Active Processing Jobs
**As a** Content Publisher  
**I want to** see all actively processing jobs in real-time  
**So that** I can monitor upload progress and identify issues quickly

**Acceptance Criteria:**
- [ ] "Queue" tab shows all active jobs
- [ ] Each job displays as a card with:
  - Archive/job name
  - Start time (local timezone)
  - Status badge (Waiting, Running)
  - Elapsed time for running jobs
  - Progress indicator (if available)
- [ ] Jobs auto-refresh every 5-10 seconds
- [ ] Manual refresh button available
- [ ] Click job card to view detailed report
- [ ] Empty state when no active jobs

**UI Components:**
- Queue tab navigation
- Job card component (reusable)
- Status badge component
- Auto-refresh mechanism
- Empty state illustration

**Priority:** P0 (Critical - MVP)  
**Effort:** 5 points  
**Dependencies:** Story 1.1

---

#### Story 1.3: View Job Details and Logs
**As a** Content Publisher  
**I want to** view detailed information about a processing job  
**So that** I can understand what's happening and troubleshoot errors

**Acceptance Criteria:**
- [ ] Click job card opens full-page or modal report view
- [ ] Report shows:
  - Job name and upload ID
  - Current status
  - Start time, duration
  - User who uploaded
  - Source name
- [ ] List of all publications in the job
- [ ] Filter publications by status (Done, Failed, Warning, Waiting, Stopped)
- [ ] Expandable logs for each publication
- [ ] Time-stamped log entries
- [ ] Color-coded log levels (Error=red, Warning=yellow, Info=white)
- [ ] Copy upload ID button
- [ ] Back button to Queue

**UI Components:**
- Job report page/modal
- Publication list with filters
- Expandable log sections
- Log entry component
- Copy-to-clipboard button

**Priority:** P0 (Critical - MVP)  
**Effort:** 8 points  
**Dependencies:** Story 1.2

---

#### Story 1.4: Stop Running Job
**As a** Content Publisher  
**I want to** stop a running job that I uploaded by mistake  
**So that** I don't waste processing resources

**Acceptance Criteria:**
- [ ] "Stop" button visible in job report for running jobs
- [ ] Confirmation dialog appears: "Are you sure you want to stop this job?"
- [ ] Job status changes to "Stopped"
- [ ] Job removed from Queue
- [ ] Job appears in History with "Stopped" status
- [ ] Cannot stop reprocessing jobs (button disabled with tooltip)
- [ ] Success notification on stop

**UI Components:**
- Stop button (conditional)
- Confirmation dialog
- Disabled state with tooltip

**Priority:** P1 (High)  
**Effort:** 3 points  
**Dependencies:** Story 1.3

---

#### Story 1.5: Mark Stalled Job
**As a** Content Publisher  
**I want to** mark a job as stalled if it's inactive for 30+ minutes  
**So that** I can clear stuck jobs from my queue view

**Acceptance Criteria:**
- [ ] "Mark as Stalled" button appears after 30 minutes of inactivity
- [ ] Button shows warning icon
- [ ] Confirmation dialog explains job will be marked failed
- [ ] Job status changes to "Failed"
- [ ] Job removed from Queue
- [ ] Warning message: "Job may still succeed in background"
- [ ] Job appears in History as Failed with stalled indicator

**UI Components:**
- Mark as Stalled button (conditional)
- Warning dialog
- Stalled indicator badge

**Priority:** P2 (Medium)  
**Effort:** 3 points  
**Dependencies:** Story 1.2

---

### Epic 2: Job History & Management
**Value:** Enable users to browse, search, and manage past publishing jobs

#### Story 2.1: Browse Job History
**As a** Content Publisher  
**I want to** see a list of all past publishing jobs  
**So that** I can review what was published and when

**Acceptance Criteria:**
- [ ] "History" tab shows all completed jobs
- [ ] Table view with columns:
  - Status (badge)
  - Archive name
  - Date/time launched
  - Duration (processing + total)
  - Files processed
  - Source
  - User
  - Job type
- [ ] Pagination (50 items per page)
- [ ] Sort by date (newest first default)
- [ ] Click row to view job report
- [ ] Status filter in header (All, Done, Failed, Warning, Stopped)

**UI Components:**
- History table component
- Status filter dropdown
- Pagination controls
- Sortable column headers

**Priority:** P0 (Critical - MVP)  
**Effort:** 5 points  
**Dependencies:** Story 1.3

---

#### Story 2.2: Search Job History
**As a** Content Publisher  
**I want to** search past jobs by name, source, or user  
**So that** I can quickly find specific uploads

**Acceptance Criteria:**
- [ ] Search bar above history table
- [ ] Search across: archive name, source name, user name, job type
- [ ] Live search (debounced 300ms)
- [ ] Clear search button (X icon)
- [ ] Results update table in real-time
- [ ] Show result count: "Showing 12 of 1,247 jobs"
- [ ] Empty state if no matches

**UI Components:**
- Search input with icon
- Clear button
- Result count display
- Empty state

**Priority:** P1 (High)  
**Effort:** 3 points  
**Dependencies:** Story 2.1

---

#### Story 2.3: Filter Jobs by Date
**As a** Content Publisher  
**I want to** filter jobs by a specific date or date range  
**So that** I can find jobs from a particular time period

**Acceptance Criteria:**
- [ ] Date picker dropdown next to search
- [ ] Single date or date range selection
- [ ] Presets: Today, Yesterday, Last 7 days, Last 30 days, Custom range
- [ ] Apply button to confirm selection
- [ ] Clear filter button
- [ ] Active filter indicator
- [ ] Combine with search and status filters

**UI Components:**
- Date picker component
- Date range presets
- Apply/Clear buttons
- Active filter badge

**Priority:** P1 (High)  
**Effort:** 5 points  
**Dependencies:** Story 2.1

---

#### Story 2.4: Retry Failed Job
**As a** Content Publisher  
**I want to** retry a failed or stopped job  
**So that** I can publish content without re-uploading

**Acceptance Criteria:**
- [ ] "Retry" button in job report for failed/stopped jobs
- [ ] Confirmation dialog: "Retry with current portal configuration?"
- [ ] New job created in Queue
- [ ] Uses same archive and source
- [ ] Original job remains in History
- [ ] New job linked to original (badge: "Retry of job #123")
- [ ] Only available for 7 days after completion (countdown shown)
- [ ] Disabled button with tooltip after 7 days
- [ ] Success notification with link to new job

**UI Components:**
- Retry button (conditional)
- Retry confirmation dialog
- Retry badge/link
- Countdown timer
- Disabled state with tooltip

**Priority:** P1 (High)  
**Effort:** 5 points  
**Dependencies:** Story 1.3, 2.1

---

#### Story 2.5: Download Job Archive
**As a** Knowledge Hub Admin  
**I want to** download the original uploaded archive  
**So that** I can inspect the source files for debugging

**Acceptance Criteria:**
- [ ] "Download Archive" button in job report
- [ ] Button only visible to KHUB_ADMIN and ADMIN roles
- [ ] Click downloads original ZIP file
- [ ] File name includes job ID and timestamp
- [ ] Progress indicator for large files
- [ ] Not available for reprocessing jobs (no source archive)
- [ ] Tooltip explains action

**UI Components:**
- Download button (role-gated)
- Download progress
- Not available state

**Priority:** P2 (Medium)  
**Effort:** 3 points  
**Dependencies:** Story 1.3

---

#### Story 2.6: Download Processing Logs
**As a** Knowledge Hub Admin  
**I want to** download all processing logs for a job  
**So that** I can share them with support or analyze offline

**Acceptance Criteria:**
- [ ] "Download Logs" button in job report
- [ ] Downloads ZIP archive containing:
  - `index.md` with job summary
  - `publications/` folder with per-publication logs
- [ ] File name includes job ID and timestamp
- [ ] Success notification
- [ ] Available for all completed jobs
- [ ] Markdown format for logs

**UI Components:**
- Download Logs button
- Download progress
- Success notification

**Priority:** P2 (Medium)  
**Effort:** 3 points  
**Dependencies:** Story 1.3

---

### Epic 3: Source Management
**Value:** Enable admins to configure and manage content sources

#### Story 3.1: View All Sources
**As a** Knowledge Hub Admin  
**I want to** see all configured content sources  
**So that** I understand what content types are supported

**Acceptance Criteria:**
- [ ] "Sources" tab shows all sources
- [ ] Card-based grid layout (3 columns)
- [ ] Each source card shows:
  - Source icon/type
  - Source name
  - Source type (DITA, Markdown, etc.)
  - Status (Active, Inactive)
  - Document count (how many docs use this source)
  - Last used date
  - Edit button
- [ ] Default sources clearly marked
- [ ] Filter: All, Default, Custom, Active, Inactive
- [ ] Search by source name

**UI Components:**
- Source card component
- Card grid layout
- Source type icons
- Status badges
- Filter buttons
- Search input

**Priority:** P1 (High)  
**Effort:** 5 points  
**Dependencies:** None

---

#### Story 3.2: View Source Details
**As a** Knowledge Hub Admin  
**I want to** view detailed configuration for a source  
**So that** I can understand how it processes content

**Acceptance Criteria:**
- [ ] Click source card opens detail view (modal or page)
- [ ] Shows:
  - Source name and type
  - Description
  - Supported formats
  - Configuration options (read-only for default sources)
  - Processing pipeline info
  - DITA-OT config (if applicable)
  - List of recent jobs using this source
  - Statistics (total jobs, success rate, avg processing time)
- [ ] Edit button (if not default source)
- [ ] Delete button (if no documents use it)
- [ ] Back to Sources list

**UI Components:**
- Source detail modal/page
- Configuration display
- Statistics dashboard
- Recent jobs list
- Action buttons

**Priority:** P1 (High)  
**Effort:** 5 points  
**Dependencies:** Story 3.1

---

#### Story 3.3: Create Custom Source
**As a** Knowledge Hub Admin  
**I want to** create a custom content source  
**So that** I can support additional content formats

**Acceptance Criteria:**
- [ ] "Create Source" button on Sources page
- [ ] Multi-step form modal:
  - Step 1: Basic Info (name, description)
  - Step 2: Source Type selection
  - Step 3: Configuration options
  - Step 4: Review and Create
- [ ] Form validation at each step
- [ ] Can go back to previous steps
- [ ] Preview configuration before creating
- [ ] Success notification
- [ ] New source appears in list
- [ ] Can immediately use for publishing

**UI Components:**
- Create Source button
- Multi-step form wizard
- Step progress indicator
- Form validation
- Preview step
- Success notification

**Priority:** P2 (Medium)  
**Effort:** 8 points  
**Dependencies:** Story 3.1, 3.2

---

#### Story 3.4: Edit Source Configuration
**As a** Knowledge Hub Admin  
**I want to** modify a source's configuration  
**So that** I can adjust processing behavior

**Acceptance Criteria:**
- [ ] Edit button in source detail view
- [ ] Cannot edit default sources (button disabled)
- [ ] Form pre-populated with current config
- [ ] Validation on all fields
- [ ] Warning: "Will affect future jobs, not existing content"
- [ ] Confirmation dialog for save
- [ ] Success notification
- [ ] Source detail view updates

**UI Components:**
- Edit form (reuse Create form)
- Pre-populated fields
- Warning callout
- Save confirmation dialog

**Priority:** P2 (Medium)  
**Effort:** 5 points  
**Dependencies:** Story 3.2

---

#### Story 3.5: Delete Unused Source
**As a** Knowledge Hub Admin  
**I want to** delete a custom source that's no longer needed  
**So that** I can keep my source list clean

**Acceptance Criteria:**
- [ ] Delete button in source detail view
- [ ] Only enabled if document count = 0
- [ ] Cannot delete default sources
- [ ] Confirmation dialog:
  - Shows source name
  - Warning: "This action cannot be undone"
  - Type source name to confirm
- [ ] Source removed from list
- [ ] Success notification
- [ ] Redirects to Sources list

**UI Components:**
- Delete button (conditional)
- Confirmation dialog with text input
- Success notification

**Priority:** P3 (Low)  
**Effort:** 3 points  
**Dependencies:** Story 3.2

---

### Epic 4: Document Library Management
**Value:** Enable users to browse, organize, and manage published content

#### Story 4.1: Browse Published Documents
**As a** Content Publisher  
**I want to** see all published documents in the portal  
**So that** I can find and manage content

**Acceptance Criteria:**
- [ ] "Library" tab shows all documents (default view)
- [ ] List view with document rows showing:
  - Checkbox for selection
  - Title
  - Description (truncated)
  - Status badge
  - Product/version
  - Content type
  - Language
  - Last updated date
  - Actions (Preview, Edit, More)
- [ ] Displays 50 documents per page
- [ ] Pagination controls at bottom
- [ ] Total document count shown
- [ ] Sorting options (Recent, Title A-Z, Z-A, Oldest)

**Current Status:** ✅ Implemented (needs real data integration)

**Priority:** P0 (Critical - MVP)  
**Effort:** 2 points (integration only)  
**Dependencies:** None

---

#### Story 4.2: Filter Documents
**As a** Content Publisher  
**I want to** filter documents by product, type, status, and language  
**So that** I can quickly find relevant content

**Acceptance Criteria:**
- [ ] Filter sidebar on left
- [ ] Filter groups:
  - Product (multi-select checkboxes with counts)
  - Content Type (multi-select)
  - Status (multi-select)
  - Language (multi-select)
- [ ] Filters applied immediately (live)
- [ ] Document count updates with filters
- [ ] Active filter badges above list
- [ ] Clear all filters button
- [ ] Filters persist in URL (shareable)

**Current Status:** ✅ UI Implemented (needs backend integration)

**Priority:** P0 (Critical - MVP)  
**Effort:** 3 points (backend integration)  
**Dependencies:** Story 4.1

---

#### Story 4.3: Search Documents
**As a** Content Publisher  
**I want to** search documents by title, description, or tags  
**So that** I can quickly locate specific content

**Acceptance Criteria:**
- [ ] Search input at top of filter sidebar
- [ ] Live search (debounced 300ms)
- [ ] Search across: title, description, tags, metadata
- [ ] Clear search button
- [ ] Highlight search terms in results
- [ ] Combine with filters
- [ ] Empty state if no results

**Current Status:** ✅ UI Implemented (needs backend)

**Priority:** P1 (High)  
**Effort:** 3 points  
**Dependencies:** Story 4.1

---

#### Story 4.4: Bulk Select and Manage Documents
**As a** Content Publisher  
**I want to** select multiple documents and perform bulk actions  
**So that** I can manage content efficiently

**Acceptance Criteria:**
- [ ] Checkbox on each document row
- [ ] Master checkbox in header (select all on page)
- [ ] Bulk actions bar appears when items selected
- [ ] Shows selection count
- [ ] Actions: Add to Collection, Archive, Delete
- [ ] "Select all X matching" option for filtered results
- [ ] Confirmation dialog for destructive actions
- [ ] Success notification with count

**Current Status:** ✅ UI Implemented (needs backend)

**Priority:** P1 (High)  
**Effort:** 5 points  
**Dependencies:** Story 4.1

---

#### Story 4.5: View Document Metadata Journal
**As a** Content Publisher  
**I want to** view complete metadata for a document  
**So that** I can verify content information and history

**Acceptance Criteria:**
- [ ] "More actions" → "View Metadata" option
- [ ] Modal or side panel opens
- [ ] Shows all metadata fields:
  - originId, khubId
  - Title, description
  - Source
  - Publication date
  - Last processed date
  - Editorial type
  - Locale
  - All custom metadata
- [ ] Expandable sections for groups
- [ ] Copy ID buttons
- [ ] Link to source job
- [ ] Metadata history (last 20 changes per field)
- [ ] Close button

**Priority:** P1 (High)  
**Effort:** 5 points  
**Dependencies:** Story 4.1

---

#### Story 4.6: Delete Published Document
**As a** Knowledge Hub Admin  
**I want to** delete a published document  
**So that** I can remove outdated or incorrect content

**Acceptance Criteria:**
- [ ] "More actions" → "Delete Document" option
- [ ] Only visible to KHUB_ADMIN and ADMIN roles
- [ ] Opens metadata journal first for verification
- [ ] Confirmation dialog:
  - Shows document title
  - Warning: "This cannot be undone"
  - Type document title to confirm
- [ ] Creates deletion job in Queue
- [ ] Document marked as deleting
- [ ] Success notification
- [ ] Link to track deletion job

**Priority:** P2 (Medium)  
**Effort:** 5 points  
**Dependencies:** Story 4.5, 1.2

---

### Epic 5: Metadata Configuration
**Value:** Enable admins to define and manage metadata schemas

#### Story 5.1: View Metadata Schema
**As a** Knowledge Hub Admin  
**I want to** see all defined metadata fields  
**So that** I understand what metadata is available

**Acceptance Criteria:**
- [ ] "Metadata" tab shows all fields
- [ ] Table view with columns:
  - Field name
  - Display label
  - Data type
  - Required/Optional
  - Applies to (content types)
  - Used by (count of documents)
  - Edit button
- [ ] Filter by content type
- [ ] Search by field name
- [ ] System fields vs custom fields indicator
- [ ] Cannot edit system fields

**Priority:** P2 (Medium)  
**Effort:** 5 points  
**Dependencies:** None

---

#### Story 5.2: Create Custom Metadata Field
**As a** Knowledge Hub Admin  
**I want to** create a custom metadata field  
**So that** I can capture additional content information

**Acceptance Criteria:**
- [ ] "Create Field" button
- [ ] Form with:
  - Field name (validated, unique)
  - Display label
  - Help text
  - Data type (text, number, date, enum, multi-select)
  - Required toggle
  - Default value (optional)
  - Applies to content types (checkboxes)
  - Link to vocabulary (if enum/multi-select)
- [ ] Field name preview (how it appears in API/exports)
- [ ] Validation on all fields
- [ ] Confirmation dialog
- [ ] Reprocessing required notice
- [ ] Success notification
- [ ] Field appears in list

**Priority:** P2 (Medium)  
**Effort:** 8 points  
**Dependencies:** Story 5.1

---

### Epic 6: Collections & Organization
**Value:** Enable users to organize content into logical groups

#### Story 6.1: View Collections
**As a** Content Publisher  
**I want to** see all content collections  
**So that** I can organize and group related documents

**Acceptance Criteria:**
- [ ] "Collections" tab shows all collections
- [ ] Card grid layout showing:
  - Collection name
  - Description
  - Document count
  - Last updated
  - Collection type (Manual, Smart)
  - Preview thumbnails (first 4 docs)
  - Edit/Delete buttons
- [ ] Filter: All, Manual, Smart
- [ ] Search collections
- [ ] Sort: Name, Recent, Size

**Current Status:** ⚠️ Partially implemented (UI exists, needs backend)

**Priority:** P2 (Medium)  
**Effort:** 5 points  
**Dependencies:** Story 4.1

---

#### Story 6.2: Create Manual Collection
**As a** Content Publisher  
**I want to** create a collection and manually add documents  
**So that** I can group related content

**Acceptance Criteria:**
- [ ] "Create Collection" button
- [ ] Form with name, description, color/icon
- [ ] Can add documents during creation or after
- [ ] Document picker modal with search and filters
- [ ] Save and open collection
- [ ] Success notification

**Priority:** P2 (Medium)  
**Effort:** 5 points  
**Dependencies:** Story 6.1

---

#### Story 6.3: Create Smart Collection
**As a** Content Publisher  
**I want to** create a smart collection based on filters  
**So that** documents automatically appear based on criteria

**Acceptance Criteria:**
- [ ] "Create Smart Collection" button
- [ ] Form with name, description
- [ ] Filter builder UI:
  - Add condition (field, operator, value)
  - Multiple conditions with AND/OR
  - Preview matching documents
  - Save filter criteria
- [ ] Shows live document count
- [ ] Collection updates automatically
- [ ] Cannot manually add/remove docs

**Current Status:** ⚠️ Button exists, needs implementation

**Priority:** P2 (Medium)  
**Effort:** 8 points  
**Dependencies:** Story 6.1

---

### Epic 7: Search Configuration (Advanced)
**Value:** Enable admins to configure search behavior

#### Story 7.1: Configure Search Settings
**As a** Knowledge Hub Admin  
**I want to** configure portal search settings  
**So that** users get relevant results

**Acceptance Criteria:**
- [ ] "Search Config" tab
- [ ] Settings sections:
  - Searchable fields (checkboxes)
  - Field weights (sliders)
  - Synonyms list
  - Stop words
  - Result ranking preferences
- [ ] Test search interface
- [ ] Save and apply
- [ ] Reindex required notice

**Priority:** P3 (Low)  
**Effort:** 8 points  
**Dependencies:** None

---

## Implementation Phases

### Phase 1: Core Publishing MVP (Sprint 1-2)
**Goal:** Enable basic upload, queue, and history functionality

**Stories:**
- 1.1: Upload Content Archive
- 1.2: View Active Processing Jobs
- 1.3: View Job Details and Logs
- 2.1: Browse Job History
- 4.1: Browse Published Documents (data integration)

**Deliverables:**
- Working upload interface
- Real-time job queue
- Job history table
- Backend API integration

**Success Metrics:**
- Users can upload and track content
- 90%+ successful uploads
- <5 second queue refresh

---

### Phase 2: Job Management (Sprint 3-4)
**Goal:** Add full job control and troubleshooting capabilities

**Stories:**
- 1.4: Stop Running Job
- 1.5: Mark Stalled Job
- 2.2: Search Job History
- 2.3: Filter Jobs by Date
- 2.4: Retry Failed Job
- 2.5: Download Job Archive
- 2.6: Download Processing Logs

**Deliverables:**
- Complete job lifecycle management
- Advanced search and filtering
- Admin troubleshooting tools

**Success Metrics:**
- <2 minutes to find any past job
- 80% of failures resolved with retry

---

### Phase 3: Source & Document Management (Sprint 5-6)
**Goal:** Enable source configuration and document organization

**Stories:**
- 3.1: View All Sources
- 3.2: View Source Details
- 3.3: Create Custom Source
- 3.4: Edit Source Configuration
- 4.2: Filter Documents (backend)
- 4.3: Search Documents (backend)
- 4.4: Bulk Select and Manage Documents
- 4.5: View Document Metadata Journal
- 4.6: Delete Published Document

**Deliverables:**
- Source management interface
- Document filtering and search
- Metadata viewing
- Bulk operations

**Success Metrics:**
- Admins can create sources in <5 minutes
- Users find documents in <30 seconds

---

### Phase 4: Collections & Organization (Sprint 7)
**Goal:** Add content organization features

**Stories:**
- 6.1: View Collections
- 6.2: Create Manual Collection
- 6.3: Create Smart Collection

**Deliverables:**
- Collections management
- Smart collection builder

**Success Metrics:**
- 50%+ of users create collections
- Average 3-5 collections per user

---

### Phase 5: Advanced Features (Sprint 8-9)
**Goal:** Add metadata configuration and advanced settings

**Stories:**
- 5.1: View Metadata Schema
- 5.2: Create Custom Metadata Field
- 3.5: Delete Unused Source
- 7.1: Configure Search Settings

**Deliverables:**
- Metadata schema management
- Search configuration
- Source cleanup tools

**Success Metrics:**
- Custom metadata used in 30%+ docs
- Search relevance score >80%

---

## Technical Implementation Notes

### API Endpoints Required

**Publishing:**
- `POST /api/admin/content/upload` - Upload archive
- `GET /api/admin/jobs/queue` - Get active jobs
- `GET /api/admin/jobs/{id}` - Get job details
- `POST /api/admin/jobs/{id}/stop` - Stop job
- `POST /api/admin/jobs/{id}/retry` - Retry job
- `POST /api/admin/jobs/{id}/mark-stalled` - Mark stalled
- `GET /api/admin/jobs/{id}/archive` - Download archive
- `GET /api/admin/jobs/{id}/logs` - Download logs

**Job History:**
- `GET /api/admin/jobs/history` - List jobs (paginated, filtered)
- `GET /api/admin/jobs/history/search` - Search jobs

**Sources:**
- `GET /api/admin/sources` - List sources
- `GET /api/admin/sources/{id}` - Get source details
- `POST /api/admin/sources` - Create source
- `PUT /api/admin/sources/{id}` - Update source
- `DELETE /api/admin/sources/{id}` - Delete source

**Documents:**
- `GET /api/admin/documents` - List documents (filtered, searched)
- `GET /api/admin/documents/{id}/metadata` - Get metadata journal
- `DELETE /api/admin/documents/{id}` - Delete document
- `POST /api/admin/documents/bulk` - Bulk operations

**Collections:**
- `GET /api/admin/collections` - List collections
- `POST /api/admin/collections` - Create collection
- `PUT /api/admin/collections/{id}` - Update collection
- `DELETE /api/admin/collections/{id}` - Delete collection

**Metadata:**
- `GET /api/admin/metadata/schema` - Get schema
- `POST /api/admin/metadata/fields` - Create field
- `PUT /api/admin/metadata/fields/{id}` - Update field

### Real-time Updates

**WebSocket Events:**
- `job.progress` - Job progress update
- `job.status_change` - Job status changed
- `job.completed` - Job completed
- `queue.updated` - Queue changed

**Polling Fallback:**
- Poll queue every 5 seconds if WebSocket unavailable
- Exponential backoff on errors

### Data Storage

**Local State (React/Vue):**
- Current view (tab)
- Filters and search terms
- Selected items
- UI state (modals open, etc.)

**Cached Data:**
- Job list (5 second cache)
- Source list (1 minute cache)
- Document list (paginated, 30 second cache)

**Persisted State:**
- User preferences (filters, view mode)
- Recent searches
- Collections

---

## UI/UX Design Requirements

### Component Library

**Core Components:**
1. **Job Card** - Display job status, time, actions
2. **Status Badge** - Color-coded status indicators
3. **Progress Bar** - Upload/processing progress
4. **Log Viewer** - Expandable, syntax-highlighted logs
5. **Filter Sidebar** - Collapsible, multi-select filters
6. **Document Row** - List item with metadata
7. **Source Card** - Source info and stats
8. **Modal** - Confirmation, forms, details
9. **Toast Notification** - Success/error messages
10. **Empty State** - Illustrations for no data

### Design System

**Colors:**
- Status colors (from existing design):
  - Success: `#86efac` (green-300)
  - Warning: `#fde047` (yellow-200)
  - Error: `#fca5a5` (red-300)
  - Info: `#a78bfa` (purple-400)
  - Running: `#60a5fa` (blue-400)
  - Waiting: `#94a3b8` (slate-400)

**Typography:**
- Font: Inter
- Sizes: 11px, 12px, 13px, 14px, 16px, 20px, 24px

**Spacing:**
- Base: 4px grid
- Component padding: 12px, 16px, 20px
- Section gaps: 24px, 32px

### Responsive Behavior

**Desktop (1920px+):**
- 3-column source grid
- Full filter sidebar
- Wide job reports

**Laptop (1366px):**
- 2-column source grid
- Full filter sidebar
- Standard reports

**Tablet (768px):**
- 1-column source grid
- Collapsible filter sidebar
- Condensed reports

**Mobile (<768px):**
- Not supported (show warning)
- Admin functions require desktop

---

## Testing Strategy

### Unit Tests
- API integration functions
- Data transformation utilities
- Filter/search logic
- Date/time formatting

### Integration Tests
- Upload flow end-to-end
- Job status transitions
- Filter combinations
- Bulk operations

### E2E Tests (Critical Paths)
1. Upload content → View in queue → View report
2. Search job history → Retry failed job
3. Create source → Upload with source → Success
4. Filter documents → Bulk select → Add to collection
5. View metadata → Delete document → Confirm

### Performance Tests
- Upload 1.8 GB file (max size)
- View queue with 50+ active jobs
- Search 10,000+ jobs in history
- Filter 100,000+ documents

### Accessibility Tests
- Keyboard navigation
- Screen reader support
- Color contrast (WCAG AA)
- Focus indicators

---

## Success Criteria

### Phase 1 (MVP) Success:
- [ ] 100 successful uploads in first week
- [ ] <5% upload failure rate
- [ ] Users can track jobs without assistance
- [ ] No critical bugs in production

### Phase 2 Success:
- [ ] 90% of failed jobs resolved via retry
- [ ] <1 minute average time to find job in history
- [ ] Admins use download logs for 30%+ failures

### Phase 3 Success:
- [ ] 3+ custom sources created by admins
- [ ] 80% of users use filters regularly
- [ ] Bulk operations reduce management time by 50%

### Phase 4 Success:
- [ ] 60% of users create at least one collection
- [ ] Smart collections reduce manual organization by 70%

### Phase 5 Success:
- [ ] Custom metadata on 40%+ of documents
- [ ] Search relevance score >85%

---

## Risks & Mitigation

### Risk 1: Upload Failures
**Impact:** High  
**Probability:** Medium  
**Mitigation:**
- Robust error handling with clear messages
- Automatic retry for network failures
- Chunked upload for large files
- Pre-upload validation

### Risk 2: Queue Performance
**Impact:** High  
**Probability:** Medium  
**Mitigation:**
- Efficient polling/WebSocket
- Pagination for large queues
- Backend job prioritization
- Database indexes

### Risk 3: Complex Source Configuration
**Impact:** Medium  
**Probability:** High  
**Mitigation:**
- Wizard-based UI
- Validation and preview
- Pre-built templates
- Clear documentation

### Risk 4: User Confusion
**Impact:** Medium  
**Probability:** Medium  
**Mitigation:**
- Onboarding tooltips
- Empty state guidance
- Contextual help
- User testing

---

## Next Steps

1. **Review with stakeholders** - Validate user stories and priorities
2. **Design sprint** - Create high-fidelity mockups for Phase 1
3. **API contracts** - Define and document all API endpoints
4. **Sprint planning** - Break stories into tasks
5. **Development kickoff** - Start Phase 1 implementation

---

## Appendix

### Related Documents
- `CONTENT_HUB_TDD.md` - Technical requirements
- `admin/index.html` - Current dashboard
- `admin/content-hub.html` - Current Content Hub UI

### Change Log
- 2025-01-XX: Initial user story map and implementation plan created

