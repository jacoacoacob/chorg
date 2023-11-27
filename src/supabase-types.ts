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
      chore: {
        Row: {
          created_at: string
          display_name: string
          id: string
          owner: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          owner?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_chart: {
        Row: {
          chore_set: string | null
          created_at: string
          end: string | null
          group: string | null
          id: string
          owner: string | null
          start: string | null
        }
        Insert: {
          chore_set?: string | null
          created_at?: string
          end?: string | null
          group?: string | null
          id?: string
          owner?: string | null
          start?: string | null
        }
        Update: {
          chore_set?: string | null
          created_at?: string
          end?: string | null
          group?: string | null
          id?: string
          owner?: string | null
          start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_chart_chore_set_fkey"
            columns: ["chore_set"]
            referencedRelation: "chore_set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_chart_group_fkey"
            columns: ["group"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_chart_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_chart_completion: {
        Row: {
          chore_chart: string | null
          chore_task: string | null
          created_at: string
          id: string
          owner: string | null
        }
        Insert: {
          chore_chart?: string | null
          chore_task?: string | null
          created_at?: string
          id?: string
          owner?: string | null
        }
        Update: {
          chore_chart?: string | null
          chore_task?: string | null
          created_at?: string
          id?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_chart_completion_chore_chart_fkey"
            columns: ["chore_chart"]
            referencedRelation: "chore_chart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_chart_completion_chore_task_fkey"
            columns: ["chore_task"]
            referencedRelation: "chore_task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_chart_completion_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_chore_task: {
        Row: {
          chore_id: string | null
          chore_task_id: string | null
          created_at: string
          id: string
        }
        Insert: {
          chore_id?: string | null
          chore_task_id?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          chore_id?: string | null
          chore_task_id?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chore_chore_task_chore_id_fkey"
            columns: ["chore_id"]
            referencedRelation: "chore"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_chore_task_chore_task_id_fkey"
            columns: ["chore_task_id"]
            referencedRelation: "chore_task"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_set: {
        Row: {
          created_at: string
          display_name: string
          id: string
          owner: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          owner?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_set_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_set_chore: {
        Row: {
          chore_id: string | null
          chore_set_id: string | null
          created_at: string
          id: string | null
        }
        Insert: {
          chore_id?: string | null
          chore_set_id?: string | null
          created_at?: string
          id?: string | null
        }
        Update: {
          chore_id?: string | null
          chore_set_id?: string | null
          created_at?: string
          id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_set_chore_chore_id_fkey"
            columns: ["chore_id"]
            referencedRelation: "chore"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chore_set_chore_chore_set_id_fkey"
            columns: ["chore_set_id"]
            referencedRelation: "chore_set"
            referencedColumns: ["id"]
          }
        ]
      }
      chore_task: {
        Row: {
          created_at: string
          description: string | null
          id: string
          owner: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          owner?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chore_task_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          owner: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          owner?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_chore_set: {
        Row: {
          chore_id: string | null
          created_at: string
          group_id: string | null
          id: string
        }
        Insert: {
          chore_id?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
        }
        Update: {
          chore_id?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_chore_set_chore_id_fkey"
            columns: ["chore_id"]
            referencedRelation: "chore"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_chore_set_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
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

