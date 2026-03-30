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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { adminCreateSchema } from '@/zod/admin.schemas'
import { createAdmin } from '@/services/admin.services'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
// TanStack Query Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

type FormValues = z.infer<typeof adminCreateSchema>

export function AdminCreateForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(adminCreateSchema),
    defaultValues: {
      password: '',
      admin: {
        name: '',
        email: '',
        role: 'ADMIN' as const,
        contactNumber: '',
      },
    },
  })

  // TanStack Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: createAdmin,
    onSuccess: (response: any) => {
      // আপনার এপিআই রেসপন্স স্ট্রাকচার অনুযায়ী চেক
      if (response?.success || response?.id) {
        toast.success('Admin created successfully')
        
        // অ্যাডমিন লিস্টের ক্যাশ রিফ্রেশ করা
        queryClient.invalidateQueries({ queryKey: ['admins'] })
        
        router.push('/admin/dashboard/admin-list')
        router.refresh()
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create admin'
      setServerError(errorMessage)
      
      // ইমেইল অলরেডি থাকলে ফিল্ডে এরর দেখানো
      if (errorMessage.toLowerCase().includes('email')) {
        form.setError('admin.email', {
          type: 'manual',
          message: 'This email is already in use.'
        })
      }
      
      toast.error(errorMessage)
    }
  })

  const onSubmit = (values: FormValues) => {
    setServerError(null)
    mutate(values)
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Create New Admin</CardTitle>
          <CardDescription>Add a new admin user to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* সার্ভার এরর মেসেজ ডিসপ্লে (ঐচ্ছিক কিন্তু ভালো প্র্যাকটিস) */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              <p className="font-semibold">Error: {serverError}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="admin.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="admin.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="admin.role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem key="ADMIN" value="ADMIN">Admin</SelectItem>
                        <SelectItem key="SUPER_ADMIN" value="SUPER_ADMIN">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormDescription>Password for the new admin account.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="admin.contactNumber"
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
              
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                {/* isPending ব্যবহার করে লোডিং হ্যান্ডেল করা হয়েছে */}
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Creating...' : 'Create Admin'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}