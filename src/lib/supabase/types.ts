export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      guest_sessions: {
        Row: {
          created_at: string;
          id: string;
          last_seen: string;
          wish_count: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          last_seen?: string;
          wish_count?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          last_seen?: string;
          wish_count?: number;
        };
        Relationships: [];
      };
      guest_wishes: {
        Row: {
          created_at: string;
          expires_at: string | null;
          guest_session_id: string;
          id: string;
          payload: Json;
          template_id: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string | null;
          guest_session_id: string;
          id: string;
          payload: Json;
          template_id: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string | null;
          guest_session_id?: string;
          id?: string;
          payload?: Json;
          template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guest_wishes_guest_session_id_fkey";
            columns: ["guest_session_id"];
            isOneToOne: false;
            referencedRelation: "guest_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      invite_guests: {
        Row: {
          contact_number: string | null;
          created_at: string;
          custom_fields: Json;
          display_name: string;
          email: string | null;
          id: string;
          internal_note: string | null;
          personal_note: string | null;
          project_id: string;
        };
        Insert: {
          contact_number?: string | null;
          created_at?: string;
          custom_fields?: Json;
          display_name: string;
          email?: string | null;
          id: string;
          internal_note?: string | null;
          personal_note?: string | null;
          project_id: string;
        };
        Update: {
          contact_number?: string | null;
          created_at?: string;
          custom_fields?: Json;
          display_name?: string;
          email?: string | null;
          id?: string;
          internal_note?: string | null;
          personal_note?: string | null;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invite_guests_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "invite_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      invite_projects: {
        Row: {
          created_at: string;
          guest_field_definitions: Json;
          guest_limit: number | null;
          id: string;
          invite_kind: string;
          payload: Json;
          rsvp_enabled: boolean;
          template_id: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          guest_field_definitions?: Json;
          guest_limit?: number | null;
          id: string;
          invite_kind: string;
          payload?: Json;
          rsvp_enabled?: boolean;
          template_id: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          guest_field_definitions?: Json;
          guest_limit?: number | null;
          id?: string;
          invite_kind?: string;
          payload?: Json;
          rsvp_enabled?: boolean;
          template_id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      invite_rsvps: {
        Row: {
          guest_id: string;
          id: string;
          project_id: string;
          responded_at: string;
          response: string;
        };
        Insert: {
          guest_id: string;
          id: string;
          project_id: string;
          responded_at?: string;
          response: string;
        };
        Update: {
          guest_id?: string;
          id?: string;
          project_id?: string;
          responded_at?: string;
          response?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invite_rsvps_guest_id_fkey";
            columns: ["guest_id"];
            isOneToOne: false;
            referencedRelation: "invite_guests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invite_rsvps_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "invite_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      wishes: {
        Row: {
          created_at: string;
          expires_at: string | null;
          id: string;
          payload: Json;
          template_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string | null;
          id: string;
          payload: Json;
          template_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          payload?: Json;
          template_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
