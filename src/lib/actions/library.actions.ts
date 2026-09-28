"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const createLibrary = async (formData: CreateLibrary) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("libraries")
    .insert({ ...formData, author })
    .select();
  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllLibraries = async ({
  limit = 12,
  page = 1,
  subject,
  topic,
}: GetAllLibrary) => {
  const supabase = createSupabaseClient();
   const { userId } = await auth();

  let query = supabase.from("libraries").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: libraries, error } = await query;

  if (error) throw new Error(error?.message || "Failed to fetch libraries");

//Bookmark and history related actions

const librariesIds  =  libraries.map(({ id }) => id);


const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", userId)
    .in("library_id", librariesIds);

    const  marks = new Set(bookmarks?.map(({ library_id }) => library_id));

libraries.forEach((library) =>{
library.bookmarked = marks.has(library.id);
})
    
  return libraries;
};


//get History and progress related to a library


export const getLibrary = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("libraries")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addActiveHistory = async (libraryId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("sessions_history")
    .insert({ library_id: libraryId, user_id: userId });
  if (error) throw new Error(error.message);
  return data;
};

export const getActiveHistory = async (limit = 10) => {
  const supabase = createSupabaseClient();


  const { data, error } = await supabase
    .from("sessions_history")
    .select(`libraries:library_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
   const uniqueLibraries = Array.from(
    new Map(
      //ts-ignore
      data.map(({ libraries }) => [libraries.id, libraries])
    ).values()
  );

  return uniqueLibraries;
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("sessions_history")
    .select(`libraries: library_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data.map(({ libraries }) => libraries);
};

//User progress
export const getUserProgress = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("libraries")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);
  return data;
};



// Subscriptions and limits
export const newLibraryPermission = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();
  let limit = 0;
  if (has({ plan: "pro" })) {
    return true;
  }else if(has({feature: "3_active_liabraries"})){ {
     limit = 3;
  }
  }else if(has({feature: "15_active_laibraries"})){ {
     limit = 15;
  }
}

  const { data, error } = await supabase
    .from("libraries")
  .select('id', { count: 'exact' })
  .eq("author", userId);

if (error) throw new Error(error.message);

const activeLibrariesCount = data?.length 

if(activeLibrariesCount >= limit){
  return false;
}else{
  return true;
}
}

//bookmarks

export const createBookmark = async (libraryId: string, path: string) =>{
  console.log("libraryId:", libraryId); 
const {userId} = await auth();
 const supabase = createSupabaseClient();
 if (!userId) return;
 const {data , error } = await supabase
 .from("bookmarks")
 .insert({'library_id': libraryId, 'user_id': userId});

if (error) {
throw new Error(error.message);
} 
revalidatePath(path);
  return data;
}
export const removeBookmark = async (libraryId: string, path: string) =>{
const {userId} = await auth();
 const supabase = createSupabaseClient();
 if (!userId) return;
 const {data , error } = await supabase
 .from("bookmarks")
 .delete()
  .eq("library_id", libraryId)
  .eq("user_id", userId);

if (error) {
throw new Error(error.message);
} 
revalidatePath(path);
  return data;
}


//same as get getUserSessions but for bookmarks

export const getBookmarkLibraries = async (userId: string) => {
 const supabase = createSupabaseClient();
 const {data , error } = await supabase
 .from("bookmarks")
 .select(`libraries: library_id (*)`)// Notice the (*) to get all the companion data
.eq("user_id", userId);
if (error) {
throw new Error(error.message);
} 

  return data.map(({ libraries }) => libraries);
};  