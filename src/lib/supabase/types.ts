// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          active_tenant_id: string | null
          created_at: string
          email: string | null
          id: string
          is_super_admin: boolean | null
          name: string | null
        }
        Insert: {
          active_tenant_id?: string | null
          created_at?: string
          email?: string | null
          id: string
          is_super_admin?: boolean | null
          name?: string | null
        }
        Update: {
          active_tenant_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_super_admin?: boolean | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_active_tenant_id_fkey"
            columns: ["active_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_users: {
        Row: {
          created_at: string
          role: string | null
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: string | null
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: string | null
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          access_profile: string | null
          areas: string[] | null
          created_at: string
          id: string
          iso_profile_data: Json | null
          name: string
          nature: string
          public_relationship: boolean | null
        }
        Insert: {
          access_profile?: string | null
          areas?: string[] | null
          created_at?: string
          id?: string
          iso_profile_data?: Json | null
          name: string
          nature: string
          public_relationship?: boolean | null
        }
        Update: {
          access_profile?: string | null
          areas?: string[] | null
          created_at?: string
          id?: string
          iso_profile_data?: Json | null
          name?: string
          nature?: string
          public_relationship?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_super_admin: { Args: never; Returns: boolean }
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


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: profiles
//   id: uuid (not null)
//   email: text (nullable)
//   name: text (nullable)
//   is_super_admin: boolean (nullable, default: false)
//   active_tenant_id: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: tenant_users
//   tenant_id: uuid (not null)
//   user_id: uuid (not null)
//   role: text (nullable, default: 'user'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: tenants
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   nature: text (not null)
//   public_relationship: boolean (nullable, default: false)
//   areas: _text (nullable, default: '{}'::text[])
//   access_profile: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   iso_profile_data: jsonb (nullable, default: '{}'::jsonb)

// --- CONSTRAINTS ---
// Table: profiles
//   FOREIGN KEY profiles_active_tenant_id_fkey: FOREIGN KEY (active_tenant_id) REFERENCES tenants(id)
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: tenant_users
//   PRIMARY KEY tenant_users_pkey: PRIMARY KEY (tenant_id, user_id)
//   FOREIGN KEY tenant_users_tenant_id_fkey: FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
//   FOREIGN KEY tenant_users_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: tenants
//   PRIMARY KEY tenants_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: profiles
//   Policy "user_read_own_profile" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "user_update_own_profile" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (id = auth.uid())
//     WITH CHECK: (id = auth.uid())
// Table: tenant_users
//   Policy "super_admin_tenant_users" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_super_admin()
//   Policy "user_read_own_tenant_users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: tenants
//   Policy "super_admin_all_tenants" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_super_admin()
//     WITH CHECK: is_super_admin()
//   Policy "user_own_tenant" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM tenant_users   WHERE ((tenant_users.user_id = auth.uid()) AND (tenant_users.tenant_id = tenants.id))))

// --- DATABASE FUNCTIONS ---
// FUNCTION is_super_admin()
//   CREATE OR REPLACE FUNCTION public.is_super_admin()
//    RETURNS boolean
//    LANGUAGE sql
//    SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     SELECT COALESCE(
//       (SELECT is_super_admin FROM public.profiles WHERE id = auth.uid() LIMIT 1),
//       false
//     );
//   $function$
//   
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//   

