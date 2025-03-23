
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, MinusCircle, PlusCircle, Receipt, Check } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TransactionCategory } from "@/components/ui/transaction-item";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  amount: z.string().min(1, "Amount is required"),
  type: z.enum(["expense", "income"]),
  category: z.string().min(1, "Category is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const categoryOptions: { value: TransactionCategory; label: string }[] = [
  { value: "food", label: "Food & Drinks" },
  { value: "shopping", label: "Shopping" },
  { value: "transport", label: "Transportation" },
  { value: "housing", label: "Housing" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date(),
      note: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Here you would normally save the transaction to your database
    console.log("Transaction values:", values);
    
    // Show success toast
    toast.success(`${values.type === "expense" ? "Expense" : "Income"} added`, {
      description: `$${values.amount} for ${values.title}`,
    });
    
    // Navigate back to transactions page
    navigate("/transactions");
  };

  return (
    <div className="page-container">
      <Header
        title={`Add ${transactionType === "expense" ? "Expense" : "Income"}`}
        showBackButton={true}
        showNotifications={false}
      />
      
      <div className="mt-6 animate-slide-up">
        <Card>
          <CardContent className="pt-6">
            {/* Transaction type toggle */}
            <div className="flex w-full gap-4 mb-6">
              <Button
                onClick={() => {
                  setTransactionType("expense");
                  form.setValue("type", "expense");
                }}
                className={cn(
                  "flex-1 gap-2",
                  transactionType === "expense"
                    ? "bg-danger"
                    : "bg-muted text-muted-foreground"
                )}
                type="button"
              >
                <MinusCircle size={16} />
                Expense
              </Button>
              <Button
                onClick={() => {
                  setTransactionType("income");
                  form.setValue("type", "income");
                }}
                className={cn(
                  "flex-1 gap-2",
                  transactionType === "income"
                    ? "bg-secondary"
                    : "bg-muted text-muted-foreground"
                )}
                type="button"
              >
                <PlusCircle size={16} />
                Income
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {/* Amount field */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Title field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Grocery shopping"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category field */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Note field */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional details..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Hidden type field to store the transaction type */}
                <input
                  type="hidden"
                  {...form.register("type")}
                  value={transactionType}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  className={cn(
                    "w-full mt-6",
                    transactionType === "expense" ? "bg-danger" : "bg-secondary"
                  )}
                >
                  <Check className="mr-2" size={16} />
                  Save {transactionType === "expense" ? "Expense" : "Income"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTransaction;
