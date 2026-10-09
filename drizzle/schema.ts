import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Soccer programs offered by SEYO Academy
 */
export const programs = mysqlTable("programs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  ageMin: int("ageMin").notNull(),
  ageMax: int("ageMax").notNull(),
  skillLevel: mysqlEnum("skillLevel", ["beginner", "intermediate", "advanced", "elite"]).notNull(),
  season: mysqlEnum("season", ["fall", "winter", "spring", "summer"]).notNull(),
  sessionsPerWeek: int("sessionsPerWeek").notNull().default(1),
  sessionsTotal: int("sessionsTotal").notNull().default(12),
  dayOfWeek: varchar("dayOfWeek", { length: 20 }).notNull(), // e.g., "Monday"
  timeStart: varchar("timeStart", { length: 10 }).notNull(), // e.g., "18:00"
  timeEnd: varchar("timeEnd", { length: 10 }).notNull(), // e.g., "20:00"
  location: varchar("location", { length: 255 }).notNull(),
  maxParticipants: int("maxParticipants").notNull().default(30),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Program = typeof programs.$inferSelect;
export type InsertProgram = typeof programs.$inferInsert;

/**
 * Program registrations from parents/guardians
 */
export const registrations = mysqlTable("registrations", {
  id: int("id").autoincrement().primaryKey(),
  programId: int("programId").notNull(),
  parentName: varchar("parentName", { length: 255 }).notNull(),
  parentEmail: varchar("parentEmail", { length: 320 }).notNull(),
  parentPhone: varchar("parentPhone", { length: 20 }).notNull(),
  childName: varchar("childName", { length: 255 }).notNull(),
  childAge: int("childAge").notNull(),
  childGender: mysqlEnum("childGender", ["male", "female", "other"]),
  emergencyContactName: varchar("emergencyContactName", { length: 255 }),
  emergencyContactPhone: varchar("emergencyContactPhone", { length: 20 }),
  notes: text("notes"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).notNull().default("pending"),
  paymentStatus: mysqlEnum("paymentStatus", ["unpaid", "paid", "refunded"]).notNull().default("unpaid"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = typeof registrations.$inferInsert;

/**
 * Gallery items (photos and videos from training, matches, events)
 */
export const galleryItems = mysqlTable("galleryItems", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 1024 }).notNull(),
  videoUrl: varchar("videoUrl", { length: 1024 }),
  category: mysqlEnum("category", ["training", "match", "event", "team", "coaching"]).notNull(),
  featured: boolean("featured").notNull().default(false),
  displayOrder: int("displayOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

/**
 * Testimonials from parents, players, and community members
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  authorName: varchar("authorName", { length: 255 }).notNull(),
  authorRole: varchar("authorRole", { length: 100 }).notNull(), // e.g., "Parent", "Player", "Coach"
  content: text("content").notNull(),
  rating: int("rating"), // 1-5 stars
  imageUrl: varchar("imageUrl", { length: 1024 }),
  featured: boolean("featured").notNull().default(false),
  displayOrder: int("displayOrder").notNull().default(0),
  isApproved: boolean("isApproved").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Contact form submissions
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  inquiryType: mysqlEnum("inquiryType", ["general", "sponsorship", "volunteer", "partnership", "other"]).notNull(),
  status: mysqlEnum("status", ["new", "read", "responded"]).notNull().default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
