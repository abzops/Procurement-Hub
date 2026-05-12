window.SNS_CONFIG = {
  useSupabase: true,
  supabaseUrl: "https://fvdzflaodzsdvpkizwtg.supabase.co",
  supabaseAnonKey: "sb_publishable_FcFHsuEwduhV-23XmiiikQ_x8me8GU_",
  useQueueProcessor: true,
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

  // Zoho Flow webhook trigger for vendor follow-up mails.
  // Keep disabled until the webhook is created/tested in Zoho Flow.
  followupMailWebhookEnabled: false,
  followupMailWebhookUrl: "",
  followupMailWebhookMode: "json",
};
