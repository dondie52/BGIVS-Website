export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "editor";
export type ContentStatus = "draft" | "published" | "archived";
export type EnquiryStatus =
  | "new"
  | "in_progress"
  | "responded"
  | "closed"
  | "spam";
export type NotificationStatus = "pending" | "sent" | "failed";
export type PublicationType =
  | "book"
  | "research_report"
  | "policy_paper"
  | "article"
  | "institutional_guide"
  | "training_material";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: UserRole;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: UserRole;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: UserRole;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          id: string;
          full_name: string;
          position_role: string | null;
          organization: string | null;
          organization_category: string | null;
          email: string;
          phone: string | null;
          country: string | null;
          programme_or_service: string | null;
          message: string;
          consent: boolean;
          status: EnquiryStatus;
          assigned_to: string | null;
          source_page: string | null;
          referrer: string | null;
          notification_status: NotificationStatus;
          notification_error: string | null;
          submitted_at: string;
          updated_at: string;
          last_contacted_at: string | null;
          metadata: Json;
        };
        Insert: {
          id?: string;
          full_name: string;
          position_role?: string | null;
          organization?: string | null;
          organization_category?: string | null;
          email: string;
          phone?: string | null;
          country?: string | null;
          programme_or_service?: string | null;
          message: string;
          consent: boolean;
          status?: EnquiryStatus;
          assigned_to?: string | null;
          source_page?: string | null;
          referrer?: string | null;
          notification_status?: NotificationStatus;
          notification_error?: string | null;
          submitted_at?: string;
          updated_at?: string;
          last_contacted_at?: string | null;
          metadata?: Json;
        };
        Update: {
          id?: string;
          full_name?: string;
          position_role?: string | null;
          organization?: string | null;
          organization_category?: string | null;
          email?: string;
          phone?: string | null;
          country?: string | null;
          programme_or_service?: string | null;
          message?: string;
          consent?: boolean;
          status?: EnquiryStatus;
          assigned_to?: string | null;
          source_page?: string | null;
          referrer?: string | null;
          notification_status?: NotificationStatus;
          notification_error?: string | null;
          submitted_at?: string;
          updated_at?: string;
          last_contacted_at?: string | null;
          metadata?: Json;
        };
        Relationships: [];
      };
      enquiry_notes: {
        Row: {
          id: string;
          enquiry_id: string;
          author_id: string;
          note: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enquiry_id: string;
          author_id: string;
          note: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          enquiry_id?: string;
          author_id?: string;
          note?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      publications: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          author: string | null;
          publisher: string | null;
          description: string | null;
          publication_type: PublicationType;
          cover_path: string | null;
          document_path: string | null;
          topics: string[];
          status: ContentStatus;
          featured: boolean;
          sort_order: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          author?: string | null;
          publisher?: string | null;
          description?: string | null;
          publication_type?: PublicationType;
          cover_path?: string | null;
          document_path?: string | null;
          topics?: string[];
          status?: ContentStatus;
          featured?: boolean;
          sort_order?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          author?: string | null;
          publisher?: string | null;
          description?: string | null;
          publication_type?: PublicationType;
          cover_path?: string | null;
          document_path?: string | null;
          topics?: string[];
          status?: ContentStatus;
          featured?: boolean;
          sort_order?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      book_requests: {
        Row: {
          id: string;
          publication_id: string;
          full_name: string;
          organization: string | null;
          email: string;
          phone: string | null;
          country: string | null;
          quantity: number;
          message: string | null;
          consent: boolean;
          status: EnquiryStatus;
          notification_status: NotificationStatus;
          notification_error: string | null;
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          publication_id: string;
          full_name: string;
          organization?: string | null;
          email: string;
          phone?: string | null;
          country?: string | null;
          quantity?: number;
          message?: string | null;
          consent: boolean;
          status?: EnquiryStatus;
          notification_status?: NotificationStatus;
          notification_error?: string | null;
          submitted_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          publication_id?: string;
          full_name?: string;
          organization?: string | null;
          email?: string;
          phone?: string | null;
          country?: string | null;
          quantity?: number;
          message?: string | null;
          consent?: boolean;
          status?: EnquiryStatus;
          notification_status?: NotificationStatus;
          notification_error?: string | null;
          submitted_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      programmes: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string | null;
          full_description: string | null;
          challenges: string[];
          activities: string[];
          beneficiaries: string[];
          outcomes: string[];
          icon: string | null;
          status: ContentStatus;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description?: string | null;
          full_description?: string | null;
          challenges?: string[];
          activities?: string[];
          beneficiaries?: string[];
          outcomes?: string[];
          icon?: string | null;
          status?: ContentStatus;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string | null;
          full_description?: string | null;
          challenges?: string[];
          activities?: string[];
          beneficiaries?: string[];
          outcomes?: string[];
          icon?: string | null;
          status?: ContentStatus;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string | null;
          full_description: string | null;
          intended_for: string[];
          areas_covered: string[];
          expected_value: string[];
          icon: string | null;
          status: ContentStatus;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description?: string | null;
          full_description?: string | null;
          intended_for?: string[];
          areas_covered?: string[];
          expected_value?: string[];
          icon?: string | null;
          status?: ContentStatus;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string | null;
          full_description?: string | null;
          intended_for?: string[];
          areas_covered?: string[];
          expected_value?: string[];
          icon?: string | null;
          status?: ContentStatus;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          value: Json | null;
          description: string | null;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: Json | null;
          description?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json | null;
          description?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          old_values: Json | null;
          new_values: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
      rate_limit_events: {
        Row: {
          id: string;
          bucket_hash: string;
          endpoint: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          bucket_hash: string;
          endpoint: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          bucket_hash?: string;
          endpoint?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      has_role: {
        Args: { required_roles: UserRole[] };
        Returns: boolean;
      };
      check_rate_limit: {
        Args: {
          p_bucket_hash: string;
          p_endpoint: string;
          p_max_requests: number;
          p_window_seconds: number;
        };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: UserRole;
      content_status: ContentStatus;
      enquiry_status: EnquiryStatus;
      notification_status: NotificationStatus;
      publication_type: PublicationType;
    };
    CompositeTypes: Record<string, never>;
  };
};
