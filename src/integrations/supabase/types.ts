export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          created_by: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      band_registrations: {
        Row: {
          band_name: string
          band_photo_url: string | null
          bio: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          facebook_url: string | null
          genre: string
          id: string
          instagram_url: string | null
          members_count: number
          status: string
          terms_accepted: boolean
          updated_at: string
          video_url: string
          youtube_url: string | null
        }
        Insert: {
          band_name: string
          band_photo_url?: string | null
          bio: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          facebook_url?: string | null
          genre: string
          id?: string
          instagram_url?: string | null
          members_count: number
          status?: string
          terms_accepted?: boolean
          updated_at?: string
          video_url: string
          youtube_url?: string | null
        }
        Update: {
          band_name?: string
          band_photo_url?: string | null
          bio?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          facebook_url?: string | null
          genre?: string
          id?: string
          instagram_url?: string | null
          members_count?: number
          status?: string
          terms_accepted?: boolean
          updated_at?: string
          video_url?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      global_seo_settings: {
        Row: {
          created_at: string
          default_keywords: string | null
          default_meta_description: string | null
          default_og_image: string | null
          facebook_app_id: string | null
          facebook_pixel_id: string | null
          google_analytics_id: string | null
          google_tag_manager_id: string | null
          id: string
          robots_txt: string | null
          site_name: string | null
          site_tagline: string | null
          twitter_handle: string | null
          updated_at: string
          verification_bing: string | null
          verification_google: string | null
        }
        Insert: {
          created_at?: string
          default_keywords?: string | null
          default_meta_description?: string | null
          default_og_image?: string | null
          facebook_app_id?: string | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          id?: string
          robots_txt?: string | null
          site_name?: string | null
          site_tagline?: string | null
          twitter_handle?: string | null
          updated_at?: string
          verification_bing?: string | null
          verification_google?: string | null
        }
        Update: {
          created_at?: string
          default_keywords?: string | null
          default_meta_description?: string | null
          default_og_image?: string | null
          facebook_app_id?: string | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          id?: string
          robots_txt?: string | null
          site_name?: string | null
          site_tagline?: string | null
          twitter_handle?: string | null
          updated_at?: string
          verification_bing?: string | null
          verification_google?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          canonical_url: string | null
          created_at: string
          custom_meta: Json | null
          id: string
          keywords: string | null
          meta_description: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_name: string
          page_route: string
          robots: string | null
          structured_data: Json | null
          title: string | null
          twitter_card: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          custom_meta?: Json | null
          id?: string
          keywords?: string | null
          meta_description?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_name: string
          page_route: string
          robots?: string | null
          structured_data?: Json | null
          title?: string | null
          twitter_card?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          custom_meta?: Json | null
          id?: string
          keywords?: string | null
          meta_description?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_name?: string
          page_route?: string
          robots?: string | null
          structured_data?: Json | null
          title?: string | null
          twitter_card?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      visibility_settings: {
        Row: {
          component_id: string
          component_name: string
          component_type: string
          created_at: string
          id: string
          is_visible: boolean
          page: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          component_id: string
          component_name: string
          component_type: string
          created_at?: string
          id?: string
          is_visible?: boolean
          page: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          component_id?: string
          component_name?: string
          component_type?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          page?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      set_superadmin_role: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
