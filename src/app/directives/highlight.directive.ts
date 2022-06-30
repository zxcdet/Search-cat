import { Directive, Input, Renderer2, ElementRef } from '@angular/core';import { BreedInterface } from '../types/search.interface';@Directive({  selector: '[appHighlight]'})export class HighlightDirective {  @Input() searchedWords!: string[];  @Input() text!: BreedInterface;  @Input() objectType!: string;  constructor(private el: ElementRef, private renderer: Renderer2) {  }  ngOnChanges(): void {    if (!this.searchedWords || !this.searchedWords.length) {      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text[this.objectType]);      return    }    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.getFormattedText());  }  private getFormattedText(): string {    const regex = new RegExp(`(${ this.searchedWords.join('|') })`, 'gi');    return this.text[this.objectType].replace(regex, `<span class='highlight'>$1</span>`);  }}