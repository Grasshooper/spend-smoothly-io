
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-native-international-phone-number";
import { useToast } from "@/components/ui/use-toast";
import { X, Check, Phone, Mail, User } from "lucide-react";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This would typically come from your user context or API
const defaultValues: Partial<ProfileFormValues> = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  phoneNumber: "",
};

export function EditProfileForm() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
    console.log(data);
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={20} className="text-primary" />
          {isEditing ? "Edit Profile" : "Profile Information"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your first name" 
                        {...field} 
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your last name" 
                        {...field} 
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      {...field} 
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="rounded-md border border-input">
                      <PhoneInput
                        defaultCountry="US"
                        value={field.value}
                        onChangePhoneNumber={(phoneNumber) => field.onChange(phoneNumber)}
                        disabled={!isEditing}
                        containerClassName="p-0 rounded-md"
                        inputClassName="bg-transparent border-none focus:outline-none w-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isEditing && (
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                  className="gap-1"
                >
                  <X size={18} />
                  Cancel
                </Button>
                <Button type="submit" className="gap-1">
                  <Check size={18} />
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      {!isEditing && (
        <CardFooter>
          <Button 
            onClick={() => setIsEditing(true)} 
            className="w-full"
          >
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
