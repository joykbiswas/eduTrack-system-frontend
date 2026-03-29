// 'use client'

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
import { adminUpdateSchema } from '@/zod/admin.schemas'
import { getAdminById, updateAdmin } from '@/services/admin.services'
import { toast } from 'sonner'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

type FormValues = z.infer<typeof adminUpdateSchema>

export function AdminEditForm() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  console.log('AdminEditForm rendered with ID:', id);

  const form = useForm<FormValues>({
    resolver: zodResolver(adminUpdateSchema),
    defaultValues: {
      admin: {
        name: '',
        email: '',
        role: 'ADMIN' as const,
        contactNumber: '',
        profilePhoto: '',
      },
    },
  })

  // Watch form changes
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log('Form field changed:', name, 'New value:', value);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const fetchAdmin = async () => {
    try {
      console.log('=== FETCHING ADMIN DATA ===');
      console.log('Fetching admin with ID:', id);
      
      const admin = await getAdminById(id);
      console.log('Raw response from getAdminById:', admin);
      console.log('Admin data received:', admin.data);
      console.log('Full admin object:', JSON.stringify(admin, null, 2));
      
      const formData = {
        admin: admin.data,
      };
      console.log('Resetting form with data:', formData);
      
      form.reset(formData);
      console.log('Form reset completed');
      console.log('Current form values after reset:', form.getValues());
      console.log('=== FETCHING ADMIN DATA COMPLETED ===');
    } catch (error) {
      console.error('=== FETCHING ADMIN DATA FAILED ===');
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    }
  };

  useEffect(() => {
    if (id) {
      fetchAdmin()
    }
  }, [id])

  const onSubmit = async (values: FormValues) => {
    try {
      console.log('=== FORM SUBMISSION STARTED ===');
      console.log('Form values before update:', JSON.stringify(values, null, 2));
      console.log('Form values structure:', values);
      console.log('Admin data to update:', values.admin);
      console.log('Admin ID:', id);
      
      console.log('Calling updateAdmin with ID:', id);
      await updateAdmin(id, values);
      
      console.log('Admin updated successfully');
      toast.success('Admin updated successfully');
      
      console.log('Refreshing router...');
      router.refresh();
      
      console.log('Navigating to admin list...');
      router.push('/admin/dashboard/admin-list');
      
      console.log('=== FORM SUBMISSION COMPLETED ===');
    } catch (error) {
      console.error('=== FORM SUBMISSION FAILED ===');
      console.error('Error during update:', error);
      toast.error('Failed to update admin');
    }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit Admin</CardTitle>
          <CardDescription>Update admin user information.</CardDescription>
        </CardHeader>
        <CardContent>
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
              <FormField
                control={form.control}
                name="admin.profilePhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/photo.jpg" {...field} />
                    </FormControl>
                    <FormDescription>Optional profile photo URL.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Updating...' : 'Update Admin'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}