import React from "react";
import Image from "next/image";
import type { CallToActionBlock as CTABlockProps } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  const title = (richText as any)?.root?.children?.[0]?.children?.[0]?.text as string | undefined;
  const body = (richText as any)?.root?.children?.[1]?.children?.[0]?.text as string | undefined;
  const imageUrl = (richText as any)?.root?.children?.[2]?.value?.cloudinary?.secure_url as string | undefined;

  return (
    <div className="rounded-xl border border-border bg-green-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">

        {/* Image panel */}
        {/* Image panel */}
        {imageUrl && (
          <div className="relative w-full md:w-64 lg:w-80 shrink-0 self-stretch">
            <Image
              src={imageUrl}
              alt={title || "Support our children's home"}
              fill
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Text + links */}
        <div className="flex flex-col justify-center gap-6 p-8 lg:p-12 flex-1">
          <div>
            {title && (
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                {title}
              </h2>
            )}
            {body && (
              <p className="mt-3 text-base text-foreground leading-relaxed max-w-lg">
                {body}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold text-sm rounded-sm hover:bg-primary-hover transition-colors"
            >
              <Heart className="h-4 w-4 fill-current" /> Donate now
            </Link>
            <Link
              href="/accountability"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm rounded-sm hover:bg-primary-light transition-colors"
            >
              See where it goes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};