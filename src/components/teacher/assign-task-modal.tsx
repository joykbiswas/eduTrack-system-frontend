/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/button"; // আপনার পাথ অনুযায়ী ইমপোর্ট করুন
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { assignTaskAction } from "@/app/(dashboardLayout)/teacher/dashboard/student-list/_actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import { assignTaskAction } from "./_actions";

export function AssignTaskModal({ student, cards }: { student: any; cards: any[] }) {
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: assignTaskAction,
    onSuccess: () => {
      toast.success("Task assigned successfully!");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleAssign = () => {
    if (!selectedCardId) return toast.error("Please select a card");
    mutate({ cardId: selectedCardId, studentId: student.id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <ClipboardList className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Task to Student</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Student Name</p>
              <p className="text-sm font-bold">{student.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{student.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Story Card</label>
            <Select onValueChange={setSelectedCardId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a card..." />
              </SelectTrigger>
              <SelectContent>
                {cards?.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleAssign} 
            disabled={isPending || !selectedCardId}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}