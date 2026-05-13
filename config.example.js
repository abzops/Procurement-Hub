window.SNS_CONFIG = {
  useSupabase: false,
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLISHABLE_OR_ANON_KEY"
,
  useQueueProcessor: false,
  queueTable: "incoming_po_queue",
  queuePayloadColumn: "raw_payload",
  queueStatusColumn: "status",
  queueErrorColumn: "error_message",
  queueProcessedAtColumn: "processed_at",
  queuePoNumberColumn: "po_number",
  queueSourceColumn: "source",
  queueBatchSize: 20,

  // Follow-up mail defaults
  followupMailFrom: "sourcing@stacknstock.in",

  // Paste Zoho Flow Webhook trigger URL here to send queued follow-up mails instantly.
  // Keep disabled until the Zoho Flow webhook is created/tested.
  followupMailWebhookEnabled: false,
  followupMailWebhookUrl: "",
  followupMailWebhookMode: "json"
};
