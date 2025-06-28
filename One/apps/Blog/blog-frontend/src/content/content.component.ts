import { Component } from '@angular/core';
import { HowToSignGitCommitsWithGPGComponent } from "./pages/how-to-sign-git-commits-with-gpg/how-to-sign-git-commits-with-gpg.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HowToSignGitCommitsWithGPGComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
