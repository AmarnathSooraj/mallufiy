"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function signup(formData) {
  const supabase = await createClient()

  const email = formData.get("email")
  const password = formData.get("password")

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signupError) {
    console.error("Signup error:", signupError)
    redirect("/error")
  }

  const user = signupData?.user

  if (user) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        created_at: new Date(),
      },
    ])

    if (insertError) {
      console.error("Insert error:", insertError)
    } else {
      console.log("✅ User inserted into users table:", user.id)
    }
  } else {
    console.error("No user returned from signupData:", signupData)
  }

  // ✅ redirect to catalog after signup
  revalidatePath("/", "layout")
  redirect("/catalog")
}

export async function login(formData) {
  const supabase = await createClient()

  const email = formData.get("email")
  const password = formData.get("password")

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    console.error("Login error:", loginError)
    redirect("/error")
  }

  // ✅ send logged-in users to catalog too
  revalidatePath("/", "layout")
  redirect("/catalog")
}
