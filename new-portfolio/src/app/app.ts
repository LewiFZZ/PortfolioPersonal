import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Header } from './header/header';
import { AboutMe } from './about-me/about-me';
import { Works } from './works/works';
import { MySkills } from './my-skills/my-skills';
import { DownloadCv } from './download-cv/download-cv';
import { Connections } from './connections/connections';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [Header, AboutMe, Works, MySkills, DownloadCv, Connections, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Portfolio');
}
