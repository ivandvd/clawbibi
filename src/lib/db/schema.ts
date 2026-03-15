import { pgTable, text, uuid, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // references auth.users.id
  email: text("email").unique().notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  locale: text("locale").default("ar"),
  timezone: text("timezone").default("Asia/Dubai"),
  country: text("country").default("AE"),
  plan: text("plan").default("none"), // none | byok | managed | enterprise
  role: text("role").default("user"), // user | admin
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  planExpiresAt: timestamp("plan_expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const agents = pgTable("agents", {
  id: text("id").primaryKey(), // nanoid
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  status: text("status").default("creating"), // creating | provisioning | running | stopping | stopped | error
  subdomain: text("subdomain").unique(),
  ip: text("ip"),
  provider: text("provider").default("hetzner"),
  serverId: text("server_id"),
  model: text("model").default("claude-4.5"),
  contextSize: integer("context_size").default(128000),
  maxTokens: integer("max_tokens").default(4096),
  storageMb: integer("storage_mb").default(0),
  uptimeMins: integer("uptime_mins").default(0),
  apiKeys: jsonb("api_keys"),       // { anthropic?, openai?, google? }
  soulMd: text("soul_md"),          // agent personality / system prompt
  skills: jsonb("skills"),          // { builtin: { "web-search": true }, custom: [] }
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const agentChannels = pgTable("agent_channels", {
  id: text("id").primaryKey(), // nanoid
  agentId: text("agent_id")
    .references(() => agents.id, { onDelete: "cascade" })
    .notNull(),
  platform: text("platform").notNull(), // telegram | discord | slack | whatsapp | signal
  status: text("status").default("pending"), // pending | connected | disconnected
  config: jsonb("config"),
  connectedAt: timestamp("connected_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const agentSkills = pgTable("agent_skills", {
  id: text("id").primaryKey(), // nanoid
  agentId: text("agent_id")
    .references(() => agents.id, { onDelete: "cascade" })
    .notNull(),
  skillId: text("skill_id").notNull(),
  name: text("name").notNull(),
  config: jsonb("config"),
  installedAt: timestamp("installed_at", { withTimezone: true }).defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(), // nanoid
  agentId: text("agent_id")
    .references(() => agents.id, { onDelete: "cascade" })
    .notNull(),
  sessionNum: integer("session_num").notNull(),
  tokensUsed: integer("tokens_used").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
