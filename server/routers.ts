import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Programs procedures
  programs: router({
    list: publicProcedure.query(async () => {
      return db.getAllPrograms();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getProgramById(input.id);
      }),

    getBySeason: publicProcedure
      .input(z.object({ season: z.string() }))
      .query(async ({ input }) => {
        return db.getProgramsBySeason(input.season);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string(),
        ageMin: z.number(),
        ageMax: z.number(),
        skillLevel: z.enum(["beginner", "intermediate", "advanced", "elite"]),
        season: z.enum(["fall", "winter", "spring", "summer"]),
        sessionsPerWeek: z.number().default(1),
        sessionsTotal: z.number().default(12),
        dayOfWeek: z.string(),
        timeStart: z.string(),
        timeEnd: z.string(),
        location: z.string(),
        maxParticipants: z.number().default(30),
        price: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error("Unauthorized");
        }
        return db.createRegistration(input);
      }),
  }),

  // Registrations procedures
  registrations: router({
    create: publicProcedure
      .input(z.object({
        programId: z.number(),
        parentName: z.string(),
        parentEmail: z.string().email(),
        parentPhone: z.string(),
        childName: z.string(),
        childAge: z.number(),
        childGender: z.enum(["male", "female", "other"]).optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactPhone: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const registration = await db.createRegistration({
          ...input,
          status: "pending",
          paymentStatus: "unpaid",
        });

        // Get program details for notification
        const program = await db.getProgramById(input.programId);
        
        // Send notification to admin
        try {
          await notifyOwner({
            title: "New Program Registration",
            content: `New registration from ${input.parentName} for ${program?.name || 'a program'}. Child: ${input.childName} (Age: ${input.childAge})`,
          });
        } catch (error) {
          console.error("Failed to send notification:", error);
        }

        return registration;
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error("Unauthorized");
      }
      return db.getAllRegistrations();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getRegistrationById(input.id);
      }),

    getByProgram: publicProcedure
      .input(z.object({ programId: z.number() }))
      .query(async ({ input }) => {
        return db.getRegistrationsByProgram(input.programId);
      }),
  }),

  // Gallery procedures
  gallery: router({
    list: publicProcedure.query(async () => {
      return db.getAllGalleryItems();
    }),

    featured: publicProcedure
      .input(z.object({ limit: z.number().default(6) }))
      .query(async ({ input }) => {
        return db.getFeaturedGalleryItems(input.limit);
      }),

    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return db.getGalleryByCategory(input.category);
      }),
  }),

  // Testimonials procedures
  testimonials: router({
    featured: publicProcedure
      .input(z.object({ limit: z.number().default(3) }))
      .query(async ({ input }) => {
        return db.getFeaturedTestimonials(input.limit);
      }),

    list: publicProcedure.query(async () => {
      return db.getAllApprovedTestimonials();
    }),
  }),

  // Contact procedures
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string(),
        message: z.string(),
        inquiryType: z.enum(["general", "sponsorship", "volunteer", "partnership", "other"]),
      }))
      .mutation(async ({ input }) => {
        const submission = await db.createContactSubmission({
          ...input,
          status: "new",
        });

        // Send notification to admin
        try {
          await notifyOwner({
            title: `New Contact Inquiry: ${input.inquiryType}`,
            content: `From: ${input.name} (${input.email})\n\nSubject: ${input.subject}\n\nMessage: ${input.message}`,
          });
        } catch (error) {
          console.error("Failed to send notification:", error);
        }

        return submission;
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error("Unauthorized");
      }
      return db.getAllContactSubmissions();
    }),
  }),
});

export type AppRouter = typeof appRouter;
