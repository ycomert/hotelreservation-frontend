import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/']); // Ana sayfaya yönlendir
  }
}
