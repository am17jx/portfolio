import { Clock, ArrowUpRight } from 'lucide-react'
import { blogPosts } from '@/lib/data'

export function Blog() {
  return (
    <section id="blog" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Writing
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-12">
          Notes &amp; Articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.url}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full bg-bg-secondary border border-border-subtle rounded-xl p-6 hover:border-terminal-green/40 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan"
              >
                <span className="inline-block px-2 py-0.5 bg-terminal-green/10 text-terminal-green text-xs font-mono rounded mb-4 self-start">
                  {post.category}
                </span>
                <h3 className="font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-terminal-green transition-colors leading-snug">
                  {post.title}
                  <ArrowUpRight
                    size={14}
                    className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3 flex-1 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
