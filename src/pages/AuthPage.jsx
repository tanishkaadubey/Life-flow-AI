import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AuthPage = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://life-flow-ai-one.vercel.app",
      },
    });

    if (error) {

      setMessage(error.message);

    } else {

      setMessage("Magic link sent! Check your email.");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          LifeFlow AI
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-cyan-500 text-white font-bold"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {message && (
          <p className="text-sm text-center text-slate-300 mt-4">
            {message}
          </p>
        )}

      </form>

    </div>
  );
};

export default AuthPage;