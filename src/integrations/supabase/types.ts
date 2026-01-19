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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_article_tags: {
        Row: {
          article_slug: string
          created_at: string
          id: string
          tag_id: string
        }
        Insert: {
          article_slug: string
          created_at?: string
          id?: string
          tag_id: string
        }
        Update: {
          article_slug?: string
          created_at?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "article_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      author_follows: {
        Row: {
          author_id: string
          created_at: string | null
          id: string
          last_article_count: number | null
          user_id: string
        }
        Insert: {
          author_id: string
          created_at?: string | null
          id?: string
          last_article_count?: number | null
          user_id: string
        }
        Update: {
          author_id?: string
          created_at?: string | null
          id?: string
          last_article_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      collectible_bills: {
        Row: {
          bill_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          rarity: string
        }
        Insert: {
          bill_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          rarity: string
        }
        Update: {
          bill_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          rarity?: string
        }
        Relationships: []
      }
      companies_metadata: {
        Row: {
          average_rating: number | null
          company_slug: string
          created_at: string | null
          id: string
          rating_count: number | null
          updated_at: string | null
        }
        Insert: {
          average_rating?: number | null
          company_slug: string
          created_at?: string | null
          id?: string
          rating_count?: number | null
          updated_at?: string | null
        }
        Update: {
          average_rating?: number | null
          company_slug?: string
          created_at?: string | null
          id?: string
          rating_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_evaluations: {
        Row: {
          comment: string | null
          company_slug: string
          created_at: string
          id: string
          is_approved: boolean
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          company_slug: string
          created_at?: string
          id?: string
          is_approved?: boolean
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          company_slug?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_collection_items: {
        Row: {
          added_at: string
          collection_id: string
          content_id: string
          content_type: string
          id: string
          notes: string | null
          position: number
          title: string | null
        }
        Insert: {
          added_at?: string
          collection_id: string
          content_id: string
          content_type: string
          id?: string
          notes?: string | null
          position?: number
          title?: string | null
        }
        Update: {
          added_at?: string
          collection_id?: string
          content_id?: string
          content_type?: string
          id?: string
          notes?: string | null
          position?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "content_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      content_collections: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          follower_count: number
          id: string
          is_public: boolean
          item_count: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          follower_count?: number
          id?: string
          is_public?: boolean
          item_count?: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          follower_count?: number
          id?: string
          is_public?: boolean
          item_count?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_relationships: {
        Row: {
          created_at: string
          id: string
          related_id: string
          related_type: string
          relationship_type: string
          relevance_score: number
          source_id: string
          source_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          related_id: string
          related_type: string
          relationship_type?: string
          relevance_score?: number
          source_id: string
          source_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          related_id?: string
          related_type?: string
          relationship_type?: string
          relevance_score?: number
          source_id?: string
          source_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          topic_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          topic_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          topic_count?: number | null
        }
        Relationships: []
      }
      forum_discussions: {
        Row: {
          asset_type: string | null
          author_name: string
          category: string
          content: string
          created_at: string
          id: string
          is_featured: boolean
          is_pinned: boolean
          reply_count: number
          symbol: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string | null
          view_count: number
        }
        Insert: {
          asset_type?: string | null
          author_name?: string
          category?: string
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean
          is_pinned?: boolean
          reply_count?: number
          symbol?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Update: {
          asset_type?: string | null
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean
          is_pinned?: boolean
          reply_count?: number
          symbol?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "forum_discussions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction_type: string
          target_id: string
          target_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction_type: string
          target_id: string
          target_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction_type?: string
          target_id?: string
          target_type?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          author_name: string
          content: string
          created_at: string
          discussion_id: string
          id: string
          is_approved: boolean
          user_id: string | null
        }
        Insert: {
          author_name?: string
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          is_approved?: boolean
          user_id?: string | null
        }
        Update: {
          author_name?: string
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          is_approved?: boolean
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "forum_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          reason: string
          status: string | null
          target_id: string
          target_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason: string
          status?: string | null
          target_id: string
          target_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason?: string
          status?: string | null
          target_id?: string
          target_type?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_topic_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          requester_email: string
          requester_name: string
          reviewed_at: string | null
          status: string
          topic_description: string
          topic_title: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          requester_email: string
          requester_name: string
          reviewed_at?: string | null
          status?: string
          topic_description: string
          topic_title: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          requester_email?: string
          requester_name?: string
          reviewed_at?: string | null
          status?: string
          topic_description?: string
          topic_title?: string
        }
        Relationships: []
      }
      market_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          is_active: boolean | null
          market_type: string
          symbol: string
          target_value: number
          triggered_at: string | null
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          market_type: string
          symbol: string
          target_value: number
          triggered_at?: string | null
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          market_type?: string
          symbol?: string
          target_value?: number
          triggered_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      market_prices: {
        Row: {
          change: number | null
          change_percent: number | null
          created_at: string | null
          high: number | null
          id: string
          low: number | null
          market_type: string
          name: string
          price: number
          source: string | null
          symbol: string
          updated_at: string | null
          volume: string | null
        }
        Insert: {
          change?: number | null
          change_percent?: number | null
          created_at?: string | null
          high?: number | null
          id?: string
          low?: number | null
          market_type: string
          name: string
          price: number
          source?: string | null
          symbol: string
          updated_at?: string | null
          volume?: string | null
        }
        Update: {
          change?: number | null
          change_percent?: number | null
          created_at?: string | null
          high?: number | null
          id?: string
          low?: number | null
          market_type?: string
          name?: string
          price?: number
          source?: string | null
          symbol?: string
          updated_at?: string | null
          volume?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          external_id: string
          fetched_at: string
          id: string
          image_url: string | null
          market: string
          published_at: string
          source_id: string | null
          source_name: string
          title: string
          url: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          external_id: string
          fetched_at?: string
          id?: string
          image_url?: string | null
          market?: string
          published_at: string
          source_id?: string | null
          source_name: string
          title: string
          url?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          external_id?: string
          fetched_at?: string
          id?: string
          image_url?: string | null
          market?: string
          published_at?: string
          source_id?: string | null
          source_name?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      news_fetch_log: {
        Row: {
          id: string
          last_fetched_at: string
          market: string
        }
        Insert: {
          id?: string
          last_fetched_at?: string
          market: string
        }
        Update: {
          id?: string
          last_fetched_at?: string
          market?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          data: Json | null
          id: string
          read: boolean
          title: string
          type: string
          url: string | null
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean
          title: string
          type: string
          url?: string | null
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean
          title?: string
          type?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          joined_at: string | null
          posts_count: number | null
          privacy_level: string
          reputation_score: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          joined_at?: string | null
          posts_count?: number | null
          privacy_level?: string
          reputation_score?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          joined_at?: string | null
          posts_count?: number | null
          privacy_level?: string
          reputation_score?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_collected_bills: {
        Row: {
          bill_id: string
          collected_at: string
          context: Json | null
          id: string
          user_id: string
        }
        Insert: {
          bill_id: string
          collected_at?: string
          context?: Json | null
          id?: string
          user_id: string
        }
        Update: {
          bill_id?: string
          collected_at?: string
          context?: Json | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_legendary_spawns: {
        Row: {
          article_id: string
          article_type: string
          collected_at: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          article_id: string
          article_type: string
          collected_at?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          article_id?: string
          article_type?: string
          collected_at?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          default_markets: string[]
          email_notifications: boolean
          id: string
          language: string
          preferred_topics: string[]
          push_notifications: boolean
          refresh_interval: number
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_markets?: string[]
          email_notifications?: boolean
          id?: string
          language?: string
          preferred_topics?: string[]
          push_notifications?: boolean
          refresh_interval?: number
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_markets?: string[]
          email_notifications?: boolean
          id?: string
          language?: string
          preferred_topics?: string[]
          push_notifications?: boolean
          refresh_interval?: number
          theme?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      watchlist_items: {
        Row: {
          added_at: string | null
          id: string
          market_type: string
          symbol: string
          watchlist_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          market_type: string
          symbol: string
          watchlist_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          market_type?: string
          symbol?: string
          watchlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_items_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_collection_progress: {
        Args: { p_user_id: string }
        Returns: {
          collected_count: number
          has_all_regular: boolean
          total_count: number
        }[]
      }
      grant_achievement_if_not_exists: {
        Args: { p_achievement_id: string; p_user_id: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
