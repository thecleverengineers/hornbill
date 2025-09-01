
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Upload, Music, Users, Phone, Mail, MapPin, Link, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const auditionSchema = z.object({
  bandName: z.string().min(1, 'Band name is required').max(100, 'Band name must be under 100 characters'),
  genre: z.string().min(1, 'Please select a genre'),
  bandMembers: z.string().min(10, 'Please provide band members and instruments (minimum 10 characters)').max(500, 'Maximum 500 characters'),
  bandBio: z.string().min(50, 'Bio must be at least 50 characters').max(2000, 'Bio must be under 2000 characters'),
  contactPerson: z.string().min(1, 'Contact person name is required'),
  contactEmail: z.string().email('Please enter a valid email address'),
  contactPhone: z.string().min(10, 'Please enter a valid phone number'),
  cityState: z.string().min(1, 'City & State is required'),
  socialLinks: z.string().optional(),
  auditionVideoUrl: z.string().url('Please enter a valid YouTube or Vimeo URL'),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
});

type AuditionFormData = z.infer<typeof auditionSchema>;

const genres = [
  'Rock', 'Pop', 'Hip Hop', 'Electronic/EDM', 'Folk', 'Traditional Naga', 'Fusion', 'Jazz', 'Blues', 'Country', 'Metal', 'Indie', 'Alternative', 'World Music'
];

export default function Auditions() {
  const [bandPhotoFile, setBandPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AuditionFormData>({
    resolver: zodResolver(auditionSchema),
    defaultValues: {
      bandName: '',
      genre: '',
      bandMembers: '',
      bandBio: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      cityState: '',
      socialLinks: '',
      auditionVideoUrl: '',
      termsAccepted: false,
    },
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be under 5MB",
          variant: "destructive",
        });
        return;
      }
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG or PNG file",
          variant: "destructive",
        });
        return;
      }
      setBandPhotoFile(file);
    }
  };

  const onSubmit = async (data: AuditionFormData) => {
    if (!bandPhotoFile) {
      toast({
        title: "Missing Photo",
        description: "Please upload a band photo",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload photo to Supabase Storage
      const fileExt = bandPhotoFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('band-photos')
        .upload(fileName, bandPhotoFile);

      if (uploadError) {
        throw new Error(`Failed to upload photo: ${uploadError.message}`);
      }

      // Get public URL for the uploaded photo
      const { data: { publicUrl } } = supabase.storage
        .from('band-photos')
        .getPublicUrl(fileName);

      // Parse social links into separate fields
      const socialLinksArray = data.socialLinks?.split('\n').filter(link => link.trim()) || [];
      const instagramUrl = socialLinksArray.find(link => link.includes('instagram.com')) || null;
      const facebookUrl = socialLinksArray.find(link => link.includes('facebook.com')) || null;
      const youtubeUrl = socialLinksArray.find(link => link.includes('youtube.com') && !link.includes('watch')) || null;

      // Insert registration data into database
      const { error: insertError } = await supabase
        .from('band_registrations')
        .insert({
          band_name: data.bandName,
          genre: data.genre,
          members_count: data.bandMembers.split(',').length,
          bio: data.bandBio,
          contact_name: data.contactPerson,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone,
          instagram_url: instagramUrl,
          facebook_url: facebookUrl,
          youtube_url: youtubeUrl,
          video_url: data.auditionVideoUrl,
          band_photo_url: publicUrl,
          terms_accepted: data.termsAccepted,
        });

      if (insertError) {
        throw new Error(`Failed to submit registration: ${insertError.message}`);
      }

      // Show success message
      toast({
        title: "🎉 Success!",
        description: "Your audition has been submitted successfully! You'll hear from us soon. Rock on!",
      });
      
      // Reset form
      form.reset();
      setBandPhotoFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bandBioLength = form.watch('bandBio')?.length || 0;
  const bandMembersLength = form.watch('bandMembers')?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 festival-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Music className="h-12 w-12 text-primary mr-4" />
            <Calendar className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-righteous festival-title mb-4">
            Pre-Ticket to Hornbill
          </h1>
          <h2 className="text-2xl md:text-3xl text-secondary mb-6">Band Auditions</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Submit your band's audition for a chance to perform at the prestigious Hornbill Music Festival. 
            Showcase your talent to industry professionals and music lovers from around the world.
          </p>
          
          {/* Deadline Notice */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-400 font-bold">DEADLINE ALERT</span>
            </div>
            <p className="text-white">
              Auditions window closes on <span className="font-bold text-accent">September 1st, 2025 (IST)</span>
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Make sure to submit all required materials before the deadline.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="festival-card">
            <CardHeader>
              <CardTitle className="text-2xl font-righteous text-primary flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Band Registration Form
              </CardTitle>
              <CardDescription className="text-lg">
                Please fill out all required fields carefully. Make sure all information is accurate as this will be used for evaluation and communication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Band Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-righteous text-secondary border-b border-secondary/20 pb-2">
                      Band Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="bandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Band name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Trance Effect" 
                              className="bg-input border-border" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="genre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Primary genre *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-input border-border">
                                <SelectValue placeholder="Select a genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              {genres.map((genre) => (
                                <SelectItem key={genre} value={genre}>
                                  {genre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bandMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Band members & instruments *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Imna — Vocal, Kevi — Guitar, Neito — Bass, Meren — Drums"
                              className="bg-input border-border min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            {bandMembersLength}/500 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bandBio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Short band bio *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your band's story, musical style, achievements, and what makes you unique... (50-2000 characters)"
                              className="bg-input border-border min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            {bandBioLength}/2000 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-righteous text-secondary border-b border-secondary/20 pb-2">
                      Contact Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Contact person *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Full name" 
                              className="bg-input border-border" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            Contact email *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="name@example.com" 
                              className="bg-input border-border" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact phone (WhatsApp preferred) *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 9XXXXXXXXX" 
                              className="bg-input border-border" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cityState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            City & State *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Kohima, Nagaland" 
                              className="bg-input border-border" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialLinks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white flex items-center">
                            <Link className="h-4 w-4 mr-1" />
                            Social links (optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste links (Instagram/YouTube/Facebook)"
                              className="bg-input border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Media Submission Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-righteous text-secondary border-b border-secondary/20 pb-2">
                      Media Submission
                    </h3>
                    
                    <div>
                      <label className="text-white font-medium flex items-center mb-2">
                        <Upload className="h-4 w-4 mr-1" />
                        Band photo *
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-input/50">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="band-photo"
                        />
                        <label 
                          htmlFor="band-photo" 
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-white mb-1">
                            {bandPhotoFile ? bandPhotoFile.name : 'Click to upload band photo'}
                          </span>
                          <span className="text-gray-400 text-sm">
                            JPG/PNG, max 5MB, min 1200×800px
                          </span>
                        </label>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="auditionVideoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Audition video link (YouTube/Vimeo) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Paste full URL" 
                              className="bg-input border-border" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Share a performance video that best represents your band's talent and style.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white text-sm">
                            I confirm I have the rights to submit this material and agree to the Terms & Privacy. 
                            By submitting, I grant TaFMA/Hornbill Music Festival permission to review materials 
                            for audition purposes while retaining all rights to the content.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full btn-festival text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Audition...' : 'Submit Audition'}
                  </Button>
                </form>
              </Form>

              {/* Privacy & Terms Footer */}
              <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Privacy & Terms:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  By submitting, you grant TaFMA/Hornbill Music Festival permission to review your materials for audition purposes. 
                  You retain all rights to your content. Personal data will be used only for selection/communication and not shared 
                  outside the organizing team. For queries, contact{' '}
                  <a href="mailto:auditions@hornbillmusicfestival.com" className="text-primary hover:underline">
                    auditions@hornbillmusicfestival.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
