# PO Number Availability System Workflow

## Overview
The PO Number Availability system manages the allocation and reuse of Purchase Order (PO) numbers in the procurement application. It ensures that PO numbers are properly tracked, prevents duplicates, handles reuse of cancelled POs, and automatically cleans up stale reservations.

## Core Components

### Database Tables
1. **po_master** - Master list of all POs with status
   - po_number (primary key)
   - status (Available, Reserved, Submitted, Cancelled, Unused)
   - type (Marketplace, Vendor)
   - is_reusable (boolean)
   - token_number
   - timestamps

2. **po_token_log** - Log of PO token usage
   - token_number (primary key)
   - po_number
   - taken_by
   - type
   - timestamp
   - status (Active, Submitted, Cancelled, Unused)
   - notes, source, cancellation details

3. **reusable_queue** - Queue of cancelled POs that can be reused
   - po_number (primary key)
   - cancelled_by
   - type
   - cancellation_reason
   - cancelled_date
   - status (Available, Reserved, Used)
   - token_number

4. **active_reservations** - Currently reserved POs with expiration times
   - po_number (primary key)
   - token_number (unique)
   - reserved_by
   - reserved_at
   - expiry_time
   - source
   - type

## Key Functions

### Getting Current Available PO (`getCurrentAvailablePO`)
1. Releases any expired reservations (autoReleaseExpiredPOReservations)
2. Checks for oldest available reusable PO from reusable_queue
3. If none available, generates next sequence PO using getNextSequencePO()
4. Returns object with currentPo, nextPo, and type (Reusable or New Sequence)

### Reserving a PO (User clicks "Take")
1. Creates reservation in active_reservations with 10-minute timeout
2. Updates po_master status to 'Reserved'
3. Sets reserved_by and reserved_at timestamps
4. Starts auto-release timer if not already running
5. Adds entry to po_token_log with status "Active"

### Submitting a PO
1. Validates reservation exists and hasn't expired
2. Moves PO from active_reservations to po_token_log as 'Active'
3. Updates po_master status to 'Submitted'
4. Clears reservation from active_reservations
5. Optionally logs cancellation reason if provided

### Cancelling a PO
1. If in active_reservations: moves to reusable_queue as 'Available'
2. If in po_token_log: updates status to 'Cancelled' or 'Unused'
3. Updates po_master status accordingly
4. Logs cancellation details

### Auto-Release Timer
- Runs every minute via startPoAvailabilityAutoReleaseTimer()
- Checks active_reservations for expired entries
- Expired reservations move to reusable_queue as 'Available'
- Updates related tables and triggers UI refresh

## Database Reset Procedure

To reset the PO availability system and make a specific PO number (e.g., PO-00042) the current available PO:

### Option 1: Full Reset (Clean Slate)
```sql
-- Clear all PO-related tables
TRUNCATE TABLE public.po_master RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.po_token_log RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.reusable_queue RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.active_reservations RESTART IDENTITY CASCADE;

-- Make PO-00042 available in the reusable queue
INSERT INTO public.reusable_queue (po_number, status, type, cancelled_date)
VALUES ('PO-00042', 'Available', 'Marketplace', NOW());
```

### Option 2: Clear Logs Only
```sql
-- Clear transaction logs
TRUNCATE TABLE public.po_token_log RESTART IDENTITY CASCADE;

-- Clear active reservations (free held POs)
TRUNCATE TABLE public.active_reservations RESTART IDENTITY CASCADE;

-- Clear reusable queue (start fresh)
TRUNCATE TABLE public.reusable_queue RESTART IDENTITY CASCADE;

-- Optional: Clear PO master (loses history)
-- TRUNCATE TABLE public.po_master RESTART IDENTITY CASCADE;

-- Make PO-00042 available
INSERT INTO public.reusable_queue (po_number, status, type, cancelled_date)
VALUES ('PO-00042', 'Available', 'Marketplace', NOW());
```

## Security & Access
- Row Level Security (RLS) enabled on all tables
- Public policies allow anon/authenticated users full CRUD access
- Constraints validate status and type values
- Indexes optimize query performance

## Data Flow Summary
1. User opens app → loadRemoteStateFromSupabase() loads current state
2. getCurrentAvailablePO() determines what PO to display
3. User reserves PO → creates active_reservations entry
4. User either submits or cancels PO within 10 minutes
5. On submit: PO goes to po_token_log as Active
6. On cancel: PO goes to reusable_queue as Available
7. Expired reservations auto-released to reusable_queue
8. Changes synced to Supabase continuously

## Important Notes
- The system decouples PO number reservation from actual PO creation
- Reservation locks prevent hoarding with automatic 10-minute timeout
- Two sources of available POs: reusable queue and generated sequence numbers
- Immediate UI updates reflect reservation state changes