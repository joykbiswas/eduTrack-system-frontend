import { z } from 'zod';

export const adminCreateSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  admin: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    role: z.enum(['ADMIN', 'SUPER_ADMIN']),
    contactNumber: z.string().optional(),
    profilePhoto: z.union([z.string().url({message: 'Invalid URL'}), z.literal('')]).optional(),
  }),
});

export const adminUpdateSchema = adminCreateSchema.partial().omit({ password: true });

export const teacherCreateSchema = z.object({
  password: z.string()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password is too long'),
  teacher: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    registrationNumber: z.string()
      .min(1, 'Registration number is required')
      .regex(/^[A-Za-z0-9-]+$/, 'Registration number can only contain letters, numbers, and hyphens'),
    experience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience seems too high'),
    gender: z.enum(['MALE', 'FEMALE']),
    qualification: z.string().min(1, 'Qualification is required'),
    currentWorkingPlace: z.string().min(1, 'Current workplace is required'),
    designation: z.string().min(1, 'Designation is required'),
    subject: z.string().min(1, 'Subject is required'),
  }),
})

export const teacherUpdateSchema = teacherCreateSchema.partial().omit({ password: true });

export const studentCreateSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  student: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    profilePhoto: z.union([z.string().url({message: 'Invalid URL'}), z.literal('')]).optional(),
  }),
});

export const studentUpdateSchema = studentCreateSchema.partial().omit({ password: true });

export const organizationCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  logo: z.union([z.string().url({message: 'Invalid URL'}), z.literal('')]).optional(),
});

export const organizationUpdateSchema = organizationCreateSchema.partial();

export const classCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  classNumber: z.number().min(1),
  sectionCode: z.string().min(1, 'Section code required'),
  academicYear: z.string().min(4, 'Academic year e.g. 2024-2025'),
  organizationId: z.string().uuid('Valid organization ID required'),
  teacherId: z.string().uuid('Valid teacher ID required'),
});

export const classUpdateSchema = classCreateSchema.partial();

