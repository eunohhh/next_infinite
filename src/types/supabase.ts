export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          contents: string | null
          created_at: string
          id: string
          image: string | null
          nick_name: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          contents?: string | null
          created_at?: string
          id?: string
          image?: string | null
          nick_name?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          contents?: string | null
          created_at?: string
          id?: string
          image?: string | null
          nick_name?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      Contracts: {
        Row: {
          created_at: string
          created_by: string | null
          gather_name: string | null
          id: string
          place_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          gather_name?: string | null
          id?: string
          place_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          gather_name?: string | null
          id?: string
          place_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Contracts_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "Places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Contracts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          content: string | null
          createdAt: string
          id: string
          imageUrl: string | null
          sellerId: string
        }
        Insert: {
          content?: string | null
          createdAt?: string
          id?: string
          imageUrl?: string | null
          sellerId?: string
        }
        Update: {
          content?: string | null
          createdAt?: string
          id?: string
          imageUrl?: string | null
          sellerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_sellerId_fkey1"
            columns: ["sellerId"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          blog_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          blog_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          blog_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blog_likes"
            referencedColumns: ["blog_id"]
          },
          {
            foreignKeyName: "likes_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Places: {
        Row: {
          created_at: string
          created_by: string | null
          deadline: string | null
          gather_name: string | null
          id: string
          lat: number | null
          long: number | null
          region: string | null
          sports_name: string | null
          texts: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          gather_name?: string | null
          id?: string
          lat?: number | null
          long?: number | null
          region?: string | null
          sports_name?: string | null
          texts?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          gather_name?: string | null
          id?: string
          lat?: number | null
          long?: number | null
          region?: string | null
          sports_name?: string | null
          texts?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Places_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      realtimeone: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          title?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "realtimeone_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      userinfo: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          profile_image: string | null
          total_applicant: number | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          profile_image?: string | null
          total_applicant?: number | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          profile_image?: string | null
          total_applicant?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userinfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      blog_likes: {
        Row: {
          blog_id: string | null
          contents: string | null
          like_count: number | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
