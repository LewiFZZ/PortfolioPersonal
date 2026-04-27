import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  scrollProgress = signal<number>(0);

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(Math.round((scrollTop / docHeight) * 100));
  }
}
