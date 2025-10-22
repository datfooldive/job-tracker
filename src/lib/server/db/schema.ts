import { relations } from 'drizzle-orm';
import {
	mysqlTable,
	varchar,
	text,
	timestamp,
	boolean,
	int,
	primaryKey
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: text('name').notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 36 }).primaryKey(),
	expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
	token: varchar('token', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { fsp: 3 })
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: varchar('user_id', { length: 36 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const account = mysqlTable('account', {
	id: varchar('id', { length: 36 }).primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: varchar('user_id', { length: 36 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at', { fsp: 3 }),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { fsp: 3 }),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { fsp: 3 })
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const verification = mysqlTable('verification', {
	id: varchar('id', { length: 36 }).primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
	createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const status = mysqlTable('status', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull().unique()
});

export type Status = typeof status.$inferSelect;

export const tag = mysqlTable('tag', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull().unique()
});

export const application = mysqlTable('application', {
	id: int('id').primaryKey().autoincrement(),
	title: varchar('title', { length: 255 }).notNull(),
	company: varchar('company', { length: 255 }).notNull(),
	url: text('url'),
	statusId: int('status_id')
		.notNull()
		.references(() => status.id),
	appliedAt: timestamp('applied_at'),
	source: varchar('source', { length: 255 }),
	location: varchar('location', { length: 255 }),
	salary: varchar('salary', { length: 255 }),
	description: text('description'),
	notes: text('notes'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});

export const applicationtag = mysqlTable(
	'application_tag',
	{
		applicationId: int('application_id')
			.notNull()
			.references(() => application.id, { onDelete: 'cascade' }),
		tagId: int('tag_id')
			.notNull()
			.references(() => tag.id, { onDelete: 'cascade' })
	},
	(t) => [primaryKey({ columns: [t.applicationId, t.tagId] })]
);

export const statusRelations = relations(status, ({ many }) => ({
	applications: many(application)
}));

export const applicationRelations = relations(application, ({ one, many }) => ({
	status: one(status, {
		fields: [application.statusId],
		references: [status.id]
	}),
	applicationTags: many(applicationtag)
}));

export const tagRelations = relations(tag, ({ many }) => ({
	applicationTags: many(applicationtag)
}));

export const applicationTagRelations = relations(applicationtag, ({ one }) => ({
	application: one(application, {
		fields: [applicationtag.applicationId],
		references: [application.id]
	}),
	tag: one(tag, {
		fields: [applicationtag.tagId],
		references: [tag.id]
	})
}));
