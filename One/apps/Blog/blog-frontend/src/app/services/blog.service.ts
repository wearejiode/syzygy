import { marked } from 'marked';
import frontMatter from 'front-matter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  getPost(slug: string) {
    const url = `assets/posts/${slug}.md`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(md => {
        const content = frontMatter(md).body; // strips frontmatter
        return marked.parse(content) as string;
      }),
      catchError(err => {
        console.error('[BlogService] Error loading post:', err);
        return of('<p>Error loading post.</p>');
      })
    );
  }
}