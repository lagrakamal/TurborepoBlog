import React from "react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { getSession } from "@/shared/lib/session";

export const Hero = async () => {
  const session = await getSession();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-500 via-blue-500 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/30">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Discover amazing content
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="animate-pulse bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
              CoSMoS-BloG
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            A community-driven platform where knowledge meets creativity.
            Explore insights, share stories, and grow together.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center items-center">
            {session?.user ? (
              <Link href="/user/posts">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm bg-transparent"
                >
                  My Posts
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signup">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm bg-transparent"
                >
                  Join Community
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 blur-lg"></div>
    </section>
  );
};
