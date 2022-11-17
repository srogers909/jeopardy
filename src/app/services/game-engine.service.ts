import {Injectable, OnDestroy} from '@angular/core'
import {ICategory, IClue} from "../interfaces"
import {ApiService} from "./api.service"
import {BehaviorSubject, concatMap, Observable, of, tap, take, throwError, forkJoin} from "rxjs"
import _ from 'lodash'
import { AppSettings } from '../constants'
import { StorageService } from './storage.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Injectable({
  providedIn: 'root'
})
export class GameEngineService implements OnDestroy {
  private destroyer$: BehaviorSubject<boolean>

  clueValues: Array<number> = [100,200,300,400,500]
  isLoading: boolean = true
  score: number = 0
  categories: Array<ICategory>
  clues: Array<IClue>
  boardDimensions: Array<IClue>

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.categories = new Array<ICategory>()
    this.destroyer$ = new BehaviorSubject(false)
    this.boardDimensions = new Array<IClue>()
    this.clues = new Array<IClue>()
  }

  ngOnDestroy() {
    this.destroyer$.next(true)
    this.destroyer$.complete()
  }

  /**
   * 
   * @returns 
   */
  setUpBoard(): Observable<Array<ICategory>> {
    return new Observable<any>(obs => {
      this.isLoading = true;
      this.score = 0;
      this.boardDimensions = new Array<IClue>();
      this.categories = [];

      this.apiService.getCategories(AppSettings.CATEGORY_COUNT)
        .pipe(
          concatMap(categories => { this.categories = categories; return of(categories) }),
          concatMap(categories => forkJoin([
            this.getCluesByCategories(categories),
            this.buildClueBoard(categories)
          ])),
          take(1)
        )
        .subscribe({
          next: (t: [Array<ICategory>, [Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>]]) => {            
            obs.next(t);
            obs.complete();
          },
          error: (err) => {
            obs.error(err);
            obs.complete();
          }
        });
    });
  }

  /**
   * 
   * @param clue 
   * @param clueStore 
   * @returns 
   */
  getClueFromClueStore(clue: IClue, clueStore: Array<ICategory>): IClue {
    let foundClue: IClue = clue;
    let category: ICategory = _.find(clueStore, cat => cat.id === clue.category_id);

    if (category && category.clues && category.clues.length > 0) {
      foundClue = _.find(category.clues, (item) => item.value === clue.value);
    }

    return foundClue;
  }

  openClueModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  /**
   * 
   * @param categories 
   * @returns 
   */
  private buildClueBoard(categories: Array<ICategory>): Observable<[Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>]> {
    let board: [Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>] = [[],[],[],[],[]];

    return new Observable<[Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>, Array<IClue>]>(observer => {

      for (let i = 0, len = this.clueValues.length; i < len; i++) {
        for (let j = 0, len = categories.length; j < len; j++) {
          board[i].push({
            category_id: categories[j].id,
            price: '$'+this.clueValues[i],
            value: this.clueValues[i]
          } as IClue);
        }
      }

      observer.next(board);
      observer.complete();
    });
  }

  /**
   * Loops through the retrieved categories and gets an array of IClue objects.
   * @returns Observable<Array<IClue>> an Observable of an Array of IClue objects.
   */
  private getCluesByCategories(categories: Array<ICategory>): Observable<Array<ICategory>> {
    if (!categories || categories.length !== AppSettings.CATEGORY_COUNT)
      return throwError(() => new Error('There is something wrong with the number of categories available.'))

    return new Observable<Array<ICategory>>(observer => {
      forkJoin<Array<ICategory>>([
        this.apiService.getCategoryAndClues(categories[0].id),
        this.apiService.getCategoryAndClues(categories[1].id),
        this.apiService.getCategoryAndClues(categories[2].id),
        this.apiService.getCategoryAndClues(categories[3].id),
        this.apiService.getCategoryAndClues(categories[4].id),
        this.apiService.getCategoryAndClues(categories[5].id)
      ])
      .pipe(        
        concatMap(cats => {
          cats.map(category => {
              if (category.clues?.length) {
                category.clues.map(clue => {
                  clue.price = '$'+clue.value;
                });
              }
          });

          return of(cats);
        }),
        take(1)
      )
      .subscribe(
        {
          next: (val) => {
            observer.next(val)
            observer.complete()
          },
          error: err => {
            observer.error(err)
            observer.complete()
          }
        }
      )
    })
  }
}
