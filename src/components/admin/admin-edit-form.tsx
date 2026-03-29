/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
        role: 'ADMIN' as const,
        contactNumber: '',
      },
    },
  })

  const fetchAdmin = async () => {
  try {
    
    const response = await getAdminById(id);
    console.log('Raw response from getAdminById:', response);
    
    // Extract the actual admin data from the nested structure
    const adminData = response.data?.data || response.data;
    
    const formData = {
      admin: adminData,  // Now this contains the actual admin fields
    };
    console.log('Resetting form with data:', formData);
    
    form.reset(formData);
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
    
    // Extract just the admin object without the wrapper
    const payload = values.admin;
    if (!payload) {
      throw new Error('No admin data to update');
    }
    
    console.log('Sending payload:', payload);
    
    const response = await updateAdmin(id, payload) as any;
    console.log('API Response:', response);
    
    // Check if response has an id (meaning it's the updated admin object)
    if (response && response.id) {
      toast.success('Admin updated successfully');
      
      // Navigate back to admin list
      router.push('/admin/dashboard/admin-list');
    } else {
      throw new Error('Update failed - no admin data returned');
    }
  } catch (error) {
    console.error('Update error:', error);
    toast.error('Failed to update admin');
  }
};

  return (
    <div className="container mx-auto max-w-2xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-2">
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
                      <Input placeholder="+88 (555) 000-0000" {...field} />
                    </FormControl>
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