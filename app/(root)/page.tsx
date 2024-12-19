'use client'
import React, { useEffect } from "react";

export default function page() {
  useEffect(() =>{
    const s =async () =>{
      await fetch("http://localhost:4000/auth/login", {
        credentials:"include",
        body: JSON.stringify({
          "email": "acristyano22@gmail.com",
          "password": "12345678",
        }),
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    s()
  })
  return (
    <main className="w-full">
      <div>Hello world</div>
    </main>
  );
}
