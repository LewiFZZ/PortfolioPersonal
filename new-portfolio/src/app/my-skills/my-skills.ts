import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-my-skills',
  imports: [CommonModule],
  templateUrl: './my-skills.html',
  styleUrl: './my-skills.css',
})
export class MySkills implements OnInit, OnDestroy {
  skills = signal<Skill[]>([
    {
      name: 'Cybersecurity',
      icon: '🛡️',
      level: 85,
      description:
        'Designing secure infrastructures, performing vulnerability analysis, and managing incident response workflows.',
      technologies: ['Wazuh', 'SIEM', 'NGFW', 'OWASP', 'NIST', 'MITRE ATT&CK', 'IDS/IPS', 'VPN'],
    },
    {
      name: 'Network & Infrastructure',
      icon: '🌐',
      level: 80,
      description:
        'Architecting segmented networks with firewalls, VLANs and DMZ zones for hardened enterprise environments.',
      technologies: ['VLAN', 'DMZ', 'NGFW', 'RADIUS', 'TACACS+', 'Zero Trust', 'Wireshark'],
    },
    {
      name: 'Linux Systems',
      icon: '🐧',
      level: 88,
      description:
        'Over 4 years of daily Linux use across multiple distributions for both professional and personal environments.',
      technologies: ['Debian', 'Ubuntu', 'Arch', 'RedHat', 'Bash', 'Shell Scripting', 'SSH'],
    },
    {
      name: 'Frontend Development',
      icon: '💻',
      level: 75,
      description:
        'Building responsive and interactive interfaces with modern web frameworks and security-conscious practices.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'React'],
    },
    {
      name: 'Backend Development',
      icon: '⚙️',
      level: 85,
      description:
        'Developing server-side applications and REST APIs with a focus on secure coding and input validation.',
      technologies: ['Node.js', 'Express', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
    },
    {
      name: 'Incident Response & Forensics',
      icon: '🔍',
      level: 75,
      description:
        'Handling the full IR lifecycle: detection, containment, eradication, recovery and post-incident analysis.',
      technologies: ['Volatility', 'Autopsy', 'TheHive', 'DFIR-IRIS', 'YARA', 'Velociraptor'],
    },
  ]);

  currentIndex = signal(0);
  cardsPerView = signal(1);
  selectedSkill = signal<Skill | null>(null);
  isModalOpen = signal(false);

  private updateCardsPerView = () => {
    if (typeof window === 'undefined') {
      this.cardsPerView.set(1);
      return;
    }
    this.cardsPerView.set(window.matchMedia('(min-width: 768px)').matches ? 3 : 1);
  };

  ngOnInit() {
    this.updateCardsPerView();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateCardsPerView);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateCardsPerView);
    }
  }

  get slideTransform() {
    return `translateX(-${(this.currentIndex() * 100) / this.cardsPerView()}%)`;
  }

  nextSlide() {
    this.currentIndex.update((index) => (index + 1) % this.skills().length);
  }

  prevSlide() {
    this.currentIndex.update((index) => (index - 1 + this.skills().length) % this.skills().length);
  }

  openModal(skill: Skill) {
    this.selectedSkill.set(skill);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedSkill.set(null);
  }

  trackByFn(index: number, item: Skill): string {
    return item.name;
  }
}
