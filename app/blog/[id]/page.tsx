"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, ArrowLeft, Heart, Share2, BookOpen, MessageCircle } from "lucide-react"

// Sample blog data (in a real app, this would come from an API)
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React 19: New Features and Improvements",
    excerpt:
      "Explore the latest features in React 19 including automatic batching, concurrent features, and improved server-side rendering capabilities.",
    content: `
# Getting Started with React 19: New Features and Improvements

React 19 represents a significant milestone in the evolution of React, bringing numerous improvements and new features that enhance developer experience and application performance. In this comprehensive guide, we'll explore the most important updates and how they can benefit your projects.

## Automatic Batching

One of the most significant improvements in React 19 is automatic batching. Previously, React only batched updates inside event handlers, but now it batches all updates automatically, including those in promises, timeouts, and native event handlers.

\`\`\`javascript
// Before React 19
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React would render twice
}, 1000);

// React 19
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only render once
}, 1000);
\`\`\`

## Concurrent Features

React 19 introduces several concurrent features that improve user experience:

### Suspense Improvements
- Better error boundaries
- Improved loading states
- More predictable behavior

### Transition API
The new transition API allows you to mark updates as non-urgent:

\`\`\`javascript
import { startTransition } from 'react';

function handleClick() {
  startTransition(() => {
    setTab('posts');
  });
}
\`\`\`

## Server-Side Rendering Enhancements

React 19 brings significant improvements to SSR:

1. **Streaming SSR**: Better support for streaming HTML
2. **Selective Hydration**: Hydrate components as they become visible
3. **Improved Performance**: Faster initial page loads

## New Hooks

### useId
Generate unique IDs for accessibility:

\`\`\`javascript
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <input id={id + '-firstName'} type="text" />
    </div>
  );
}
\`\`\`

### useDeferredValue
Defer non-urgent updates:

\`\`\`javascript
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => 
    searchResults(deferredQuery), [deferredQuery]
  );
  return <div>{results}</div>;
}
\`\`\`

## Migration Guide

Upgrading to React 19 is straightforward for most applications:

1. Update your package.json
2. Run your test suite
3. Check for deprecated features
4. Update any third-party libraries

## Conclusion

React 19 brings exciting improvements that make React applications faster, more reliable, and easier to develop. The automatic batching, concurrent features, and SSR improvements provide significant benefits with minimal code changes required.

Start experimenting with these features in your next project and experience the improved developer experience firsthand!
    `,
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "JavaScript", "Frontend"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js and Express",
    excerpt:
      "Learn best practices for creating robust, scalable APIs using Node.js, Express, and modern development patterns.",
    content: `
# Building Scalable APIs with Node.js and Express

Creating scalable APIs is crucial for modern web applications. In this guide, we'll explore best practices for building robust, maintainable APIs using Node.js and Express.

## Project Structure

A well-organized project structure is the foundation of a scalable API:

\`\`\`
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
└── config/
\`\`\`

## Error Handling

Implement comprehensive error handling:

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
\`\`\`

## Database Integration

Use proper database patterns:

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Authentication & Authorization

Implement secure authentication:

\`\`\`javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
\`\`\`

## Performance Optimization

1. **Caching**: Implement Redis for caching
2. **Rate Limiting**: Prevent abuse
3. **Compression**: Use gzip compression
4. **Database Indexing**: Optimize queries

## Testing

Write comprehensive tests:

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200);
    
    expect(res.body).toHaveProperty('users');
  });
});
\`\`\`

## Deployment

Use environment-specific configurations and proper logging for production deployments.
    `,
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "API"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
]

const comments = [
  {
    id: 1,
    postId: 1,
    author: "John Doe",
    content:
      "Great article! The automatic batching feature is really impressive. Can't wait to try it in my next project.",
    date: "2024-01-16",
    likes: 5,
  },
  {
    id: 2,
    postId: 1,
    author: "Jane Smith",
    content:
      "Thanks for the detailed explanation of the new hooks. The useId hook will be really useful for accessibility.",
    date: "2024-01-16",
    likes: 3,
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const postId = Number.parseInt(params.id as string)
  const post = blogPosts.find((p) => p.id === postId)
  const postComments = comments.filter((c) => c.postId === postId)

  const [liked, setLiked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && commentAuthor.trim()) {
      // In a real app, this would submit to an API
      console.log("New comment:", { author: commentAuthor, content: newComment })
      setNewComment("")
      setCommentAuthor("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">DevBlog</h1>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Badge className="bg-blue-100 text-blue-800">{post.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-600 border-red-600" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-semibold">{post.category} Article</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{post.content}</div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            Comments ({postComments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                required
              />
              <div></div>
            </div>
            <Textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4"
              rows={4}
              required
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Post Comment
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {postComments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-blue-200 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.id !== postId && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600">
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedPost.author}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
