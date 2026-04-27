import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  scrollProgress = signal<number>(0);
  activeSection = signal<string>('about');
  private observer!: IntersectionObserver;

  readonly navLinks = [
    { href: 'about', label: 'About Me' },
    { href: 'works', label: 'My Works' },
    { href: 'cv', label: 'Download CV' },
    { href: 'connections', label: 'Connections' },
    { href: 'contact', label: 'Contact Me' },
  ];

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -60% 0px',
      },
    );

    this.navLinks.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(Math.round((scrollTop / docHeight) * 100));
  }
}
