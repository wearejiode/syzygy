// src/app/components/blog-post/blog-post.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-post" [innerHTML]="postHtml || 'Loading post...'"></div>
  `,
    styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  postHtml: string = '';

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  ngOnInit(): void {
    // const slug = 'portfolio-site'
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log('Slug:', slug);
    if (slug) {
      this.blogService.getPost(slug).subscribe(html => this.postHtml = html);
    }
  }

  // ngOnInit(): void {
  //   const slug = 'portfolio-site';
  //   console.log('Force loading slug:', slug);

  //   this.blogService.getPost(slug).subscribe(html => {
  //     console.log("Post HTML loaded:", html.slice(0, 100));
  //     this.postHtml = html;
  //   });
  // }

}
