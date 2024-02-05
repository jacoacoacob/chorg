export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chart: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
          owned_by: string | null
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
          owned_by?: string | null
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
          owned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chart_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chart_owned_by_fkey"
            columns: ["owned_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chart_chore_set: {
        Row: {
          chart_id: string
          chore_set_id: string
          created_at: string
        }
        Insert: {
          chart_id: string
          chore_set_id: string
          created_at?: string
        }
        Update: {
          chart_id?: string
          chore_set_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chart_chore_set_chart_id_fkey"
            columns: ["chart_id"]
            referencedRelation: "chart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chart_chore_set_chore_set_id_fkey"
            columns: ["chore_set_id"]
            referencedRelation: "chore_set"
            referencedColumns: ["id"]
          }
        ]
      }
      chart_completion: {
        Row: {
          chart_id: string | null
          chore_id: string | null
          created_at: string
          id: string
          owned_by: string | null
        }
        Insert: {
          chart_id?: string | null
          chore_id?: string | null
          created_at?: string
          id?: string
          owned_by?: string | null
        }
        Update: {
          chart_id?: string | null
          chore_id?: string | null
          created_at?: string
          id?: string
          owned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chart_completion_chart_id_fkey"
            columns: ["chart_id"]
            referencedRelation: "chart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chart_completion_chore_id_fkey"
            columns: ["chore_id"]
            referencedRelation: "chore"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chart_completion_owned_by_fkey"
            columns: ["owned_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chore: {
        Row: {
          chore_set_id: string
          created_at: string
          description: string | null
          id: string
          owned_by: string | null
          title: string
        }
        Insert: {
          chore_set_id: string
          created_at?: string
          description?: string | null
          id?: string
          owned_by?: string | null
          title: string
        }
        Update: {
          chore_set_id?: string
          created_at?: string
          description?: string | null
          id?: string
          owned_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chore_chore_set_id_fkey"
            columns: ["chore_set_id"]
            referencedRelation: "chore_set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_owned_by_fkey"
            columns: ["owned_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_set: {
        Row: {
          created_at: string
          display_name: string
          group_id: string
          id: string
          owned_by: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          group_id: string
          id?: string
          owned_by?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          group_id?: string
          id?: string
          owned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_set_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_set_owned_by_fkey"
            columns: ["owned_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group: {
        Row: {
          created_at: string
          display_name: string
          id: string
          owned_by: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          owned_by?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          owned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_owned_by_fkey"
            columns: ["owned_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_member: {
        Row: {
          created_at: string
          group_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_member_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_member_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profile: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_group_member: {
        Args: {
          _user_id: string
          _group_id: string
        }
        Returns: boolean
      }
      is_group_owner: {
        Args: {
          _user_id: string
          _group_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

