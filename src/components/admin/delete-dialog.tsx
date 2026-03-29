'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { X } from 'lucide-react'

interface DeleteDialogProps {
  id: string
  name: string
  onDelete: () => void
  deleteFn: (id: string) => Promise<void>
}

export function DeleteDialog({
  id,
  name,
  onDelete,
  deleteFn
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteFn(id)
      toast.success(`${name} deleted successfully`)
      onDelete()
    } catch (error) {
      toast.error('Failed to delete')
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button 
        variant="destructive" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Delete</span>
        <X className="h-4 w-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {name}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete {name} and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
