import { User } from "@/types";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import MY_TOKEN_KEY from "./get-cookie-name";

// UserResponse = type User & { token: string };
type UserResponse = User & { token: string };

export const isAuthenticated = async (): Promise<
  UserResponse | NextResponse<unknown> | undefined
> => {
  // En mode local, retourner un utilisateur fictif qui correspond au type User
  if (process.env.LOCAL_MODE === "true") {
    return {
      id: "local-user",
      name: "local",
      fullname: "Local User",
      avatarUrl: "", // Doit être une chaîne de caractères
      isPro: false,
      isLocalUse: true,
      token: "local-token",
    };
  }

  const authHeaders = await headers();
  const cookieStore = await cookies();
  const token = cookieStore.get(MY_TOKEN_KEY())?.value
    ? `Bearer ${cookieStore.get(MY_TOKEN_KEY())?.value}`
    : authHeaders.get("Authorization");

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        message: "Wrong castle fam :(",
      },
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const hfUser = await fetch("https://huggingface.co/api/whoami-v2", {
    headers: {
      Authorization: token,
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch(() => {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid token",
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

  if (!hfUser || !hfUser.id) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Mapper la réponse de Hugging Face à notre type User
  const user: User = {
    id: hfUser.id,
    name: hfUser.name,
    fullname: hfUser.fullname,
    avatarUrl: hfUser.avatarUrl || "",
    isPro: hfUser.isPro,
  };

  return {
    ...user,
    token: token.replace("Bearer ", ""),
  };
};
