import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';

import { SearchService } from '../services/search.service';
import { BreedInterface, } from '../types/search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public searchList: BreedInterface[] = [];
  public searchStr!: string[];
  public readonly breedInput = new FormControl();
  public readonly selectBreed = new FormControl();
  public page: number = 1;
  public isLoading: boolean = false;
  public itemPage: number = 10;
  public readonly destroy$ = new Subject<boolean>();
  public breedLenght!: number;
  public readonly selectList: number[] = [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10];

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeValue();
    this.getALlCat();
    this.selectValue();
  }

  public initializeValue(): void {
    this.breedInput.valueChanges.pipe(
      map((search: string) => search.trim().split(' ')),
      takeUntil(this.destroy$)
    ).subscribe((value: string[]) => this.searchStr = value);
  };

  private getALlCat(): void {
    this.isLoading = true
    this.searchService.getAllBreed().subscribe(
      (breed) => {
      this.cd.markForCheck();
      this.searchList.push(...breed);
      this.isLoading = false
    });
  };

  private selectValue(): void {
   this.selectBreed.valueChanges.pipe(
     takeUntil(this.destroy$)
   ).subscribe((value) => {
     this.itemPage = value;
   });
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
