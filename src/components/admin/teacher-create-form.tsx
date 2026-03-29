/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { teacherCreateSchema } from '@/zod/admin.schemas'
import { createTeacher } from '@/services/admin.services'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { useState } from 'react'

type FormValues = z.infer<typeof teacherCreateSchema>

export function TeacherCreateForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(teacherCreateSchema),
    defaultValues: {
      password: '',
      teacher: {
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        registrationNumber: '',
        experience: 0,
        gender: 'MALE',
        qualification: '',
        currentWorkingPlace: '',
        designation: '',
        subject: '',
      },
    },
  })

  const onSubmit = async (values: FormValues) => {
    console.log("Submitting teacher form with values:", values);
    setServerError(null); // Clear previous server errors
    
    try {
      const response = await createTeacher(values);
      console.log("Teacher created successfully. API response:", response);
      
      if(!response || response.success !== true) {
        throw new Error(response?.message || 'Failed to create teacher');
      }
      if (response.success === true) {
      toast.success(response.message || 'Teacher created successfully');
      router.push('/admin/dashboard/teacher-list');
      // Use window.location for guaranteed redirect
      // window.location.href = '/admin/dashboard/teacher-list';
    } else {
      throw new Error(response.message || 'Failed to create teacher');
    }
      router.refresh();
    } catch (error: any) {
      console.error("Error in onSubmit:", error);
      
      // Extract error message
      const errorMessage = error.message || 'Failed to create teacher';
      
      // Set server error for display
      setServerError(errorMessage);
      
      // Show specific error messages based on content
      if (errorMessage.includes('registrationNumber') || errorMessage.includes('already exists')) {
        toast.error('Registration number already exists. Please use a unique registration number.');
        // Set field-specific error
        form.setError('teacher.registrationNumber', {
          type: 'manual',
          message: 'This registration number is already taken. Please use a different one.'
        });
      } 
      else if (errorMessage.includes('Password') || errorMessage.includes('password')) {
        toast.error('Password is too short. Please use at least 8 characters.');
        // Set field-specific error
        form.setError('password', {
          type: 'manual',
          message: 'Password must be at least 8 characters long'
        });
      }
      else if (errorMessage.includes('email')) {
        toast.error('Email already exists. Please use a different email address.');
        form.setError('teacher.email', {
          type: 'manual',
          message: 'This email is already registered. Please use a different one.'
        });
      }
      else {
        toast.error(errorMessage);
      }
    }
  };
  
  return (
    <div className="container mx-auto max-w-2xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Create New Teacher</CardTitle>
          <CardDescription>Add a new teacher to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Display server error message */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              <p className="font-semibold">Error:</p>
              <p>{serverError}</p>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="teacher.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="teacher@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="TCH-001" {...field} />
                    </FormControl>
                    <FormDescription>Must be unique. This number will be used to identify the teacher.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (years)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="5"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification *</FormLabel>
                    <FormControl>
                      <Input placeholder="MSc Mathematics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.currentWorkingPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Workplace *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka College" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation *</FormLabel>
                    <FormControl>
                      <Input placeholder="Assistant Professor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacher.subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    <FormControl>
                      <Input placeholder="Mathematics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password (min. 8 characters)" {...field} />
                    </FormControl>
                    <FormDescription>Password must be at least 8 characters long.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Creating...' : 'Create Teacher'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}