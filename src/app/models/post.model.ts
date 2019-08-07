import { DatePipe, formatDate } from '@angular/common';

export class Post {
  title: string;
  author: string;
  photo: string;
  content: string;
  loveIts: number;
  create_at: string;
  constructor(title: string, loveIts: number, author: string, content: string) {
    this.title = title;
    this.loveIts = loveIts;
    this.author = author;
    this.content = content;
    this.create_at = formatDate( new Date(),'dd/MM/yyyy hh:mm:ss', 'fr-FR');
  }
}
