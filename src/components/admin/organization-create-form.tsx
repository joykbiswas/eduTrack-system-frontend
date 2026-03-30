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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createOrganizationSchema } from '@/zod/organization.schema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { useState } from 'react'
import { createOrganization } from '@/services/admin.services'

type FormValues = z.infer<typeof createOrganizationSchema>

export function OrganizationCreateForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      description: "",
        // parentId: "",
    },
  } as const)

  const onSubmit = async (values: FormValues) => {
    console.log("---- Submitting organization form with values:", values)
    setServerError(null)

    try {
      const payload = {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        
      }

      const response = await createOrganization(payload)
      console.log("===== Organization created successfully ==== . API response:", response)

      if (response?.success === true) {
        toast.success(response.message || 'Organization created successfully')
        
        // Reset form and redirect (following your teacher pattern)
        form.reset()
        router.push('/admin/dashboard/organization-list')           // Change this to your desired list page
        // router.refresh()
      } else {
        throw new Error(response?.message || 'Failed to create organization')
      }
    } catch (error: any) {
      console.error("Error in onSubmit:", error)

      const errorMessage = 
        error?.response?.data?.message || 
        error?.message || 
        'Failed to create organization'

      setServerError(errorMessage)

      // Show toast
      toast.error(errorMessage)

      // Optional: Set field-specific errors if needed
      if (errorMessage.toLowerCase().includes('name')) {
        form.setError('name', {
          type: 'manual',
          message: 'Please check the organization name'
        })
      }
    }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Organization</CardTitle>
          <CardDescription>
            Add a new organization to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Server Error Display */}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ABCDE Academy" 
                        {...field} 
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Leading educational institution..." 
                        className="min-h-[120px]"
                        {...field}
                        value={field.value ?? ''}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Brief description of the organization (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting 
                    ? 'Creating Organization...' 
                    : 'Create Organization'
                  }
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}