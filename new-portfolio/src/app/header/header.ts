import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  scrollProgress = signal<number>(0);
  // activeSection = signal<string>('about');
  private observer!: IntersectionObserver;

  readonly navLinks = [
    { href: 'about', label: 'About Me' },
    { href: 'works', label: 'My Works' },
    { href: 'skills', label: 'My Skills' },
    { href: 'connections', label: 'More Info' },
    { href: 'cv', label: 'Curriculum' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(Math.round((scrollTop / docHeight) * 100));
  }
}
